// utils/seedDatabase.js
const mongoose = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const config = require('./config');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs').promises;
const users = require('../data/users')
const products = require('../data/products');
const categories = require('../data/categories');

const ensureCollections = async () => {
  const collections = await mongoose.connection.db.collections();
  const collectionNames = collections.map(col => col.collectionName);

  // Read schemas from JSON file
  const schemasPath = path.join('spec.json');
  const collectionSchemas = JSON.parse(await fs.readFile(schemasPath, 'utf8'));

  // Create collections if they don't exist
  for (const [collectionName, schema] of Object.entries(collectionSchemas)) {
    if (!collectionNames.includes(collectionName)) {
      console.info(`Creating collection: ${collectionName}`);
      try {
        await mongoose.connection.db.createCollection(collectionName, schema);
        
        // Create indexes
        if (collectionName === 'users') {
          const collection = mongoose.connection.db.collection(collectionName);
          await collection.createIndex({ email: 1 }, { unique: true });
        }
        if (collectionName === 'orders') {
          const collection = mongoose.connection.db.collection(collectionName);
          await collection.createIndex({ number: 1 }, { unique: true });
        }
        
        console.info(`✅ Created collection: ${collectionName}`);
      } catch (error) {
        console.error(`Error creating collection ${collectionName}:`, error);
        throw error;
      }
    }
  }
};

const createInitialUsers = async () => {
  // Precompute hashed passwords and prepare user objects
  const modUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10), // Synchronously hash password for efficiency
  }));

  // Insert all users in one go
  return await User.insertMany(modUsers); // `insertMany` is faster for bulk inserts
};


const seedDatabase = async () => {
  try {
    // First ensure all collections exist with proper schemas
    console.info('Ensuring collections exist...');
    await ensureCollections();
    console.info('✅ Collections verified');

    // // Check if data already exists
    // const existingUsers = await User.countDocuments();
    // if (existingUsers > 0) {
    //   console.info('Database already contains users, skipping seed process');
    //   return;
    // }

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Create users first
    console.info('Creating users...');
    const createdUsers = await createInitialUsers();
    const adminUser = createdUsers[0];
    console.info('✅ Users created successfully');

    // Create categories
    console.info('Creating categories...');
    const finalCategories = await Category.create(categories);
    console.info('✅ Categories created successfully');

    const getProducts = products.map((e)=>{
      delete e.id
      return {...e, "category": finalCategories.find((category)=> e['category'] == category['title'])._id, "createdAt": new Date()}
    })
    // Create products
    console.info('Creating products...');
    const finalProducts = await Product.create(getProducts);
    console.info('✅ Products created successfully');

    // Update user with products
    await User.findByIdAndUpdate(adminUser._id, {
      products: finalProducts.map(product => product._id)
    });

    // Update categories with products
    await Promise.all([
      Category.findByIdAndUpdate(categories[0]._id, {
        products: [finalProducts[0]._id]
      }),
      Category.findByIdAndUpdate(categories[1]._id, {
        products: [finalProducts[1]._id]
      }),
      Category.findByIdAndUpdate(categories[2]._id, {
        products: [finalProducts[2]._id]
      })
    ]);
    console.info('✅ Relations updated successfully');

    // // Create sample order
    // console.info('Creating sample order...');
    // const order = await Order.create({
    //   number: 'ORD-' + Date.now(),
    //   createdAt: new Date(),
    //   customer: adminUser._id,
    //   products: [
    //     {
    //       ...finalProducts[0].toObject(),
    //       quantity: 1
    //     }
    //   ],
    //   value: 699.99,
    //   status: 'PENDING'
    // });

    // // Update user with order
    // await User.findByIdAndUpdate(adminUser._id, {
    //   $push: { orders: order._id }
    // });
    // console.info('✅ Orders created successfully');

    console.info('🌱 Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase;
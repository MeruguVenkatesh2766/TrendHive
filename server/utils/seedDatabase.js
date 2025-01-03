// utils/seedDatabase.js
const mongoose = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const bcrypt = require('bcrypt');
const config = require('./config');
const { USER_ROLE_BASIC } = require('../utils/config');

const ensureCollections = async () => {
  const collections = await mongoose.connection.db.collections();
  const collectionNames = collections.map(col => col.collectionName);

  // Define collection schemas with validation
  const collectionSchemas = {
    categories: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            products: {
              bsonType: "array",
              items: {
                bsonType: "objectId"
              }
            }
          }
        }
      }
    },
    products: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "price", "description", "brand", "countInStock", "createdAt"],
          properties: {
            title: { bsonType: "string" },
            price: { bsonType: "number" },
            description: { bsonType: "string" },
            brand: { bsonType: "string" },
            countInStock: { bsonType: "number" },
            images: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            category: { bsonType: "objectId" },
            owner: { bsonType: "objectId" }
          }
        }
      }
    },
    users: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password", "role", "createdAt"],
          properties: {
            name: { bsonType: "string" },
            email: { 
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            },
            password: { bsonType: "string" },
            role: { bsonType: "string" },
            address: { bsonType: "string" },
            city: { bsonType: "string" },
            country: { bsonType: "string" },
            zipCode: { bsonType: "string" },
            phone: { bsonType: "string" },
            products: {
              bsonType: "array",
              items: { bsonType: "objectId" }
            },
            orders: {
              bsonType: "array",
              items: { bsonType: "objectId" }
            }
          }
        }
      }
    },
    orders: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["number", "createdAt", "value", "status"],
          properties: {
            number: { bsonType: "string" },
            createdAt: { bsonType: "date" },
            customer: { bsonType: "objectId" },
            products: { bsonType: "array" },
            value: { bsonType: "number" },
            status: { bsonType: "string" }
          }
        }
      }
    }
  };

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
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
      role: 'ADMIN',
      address: '123 Admin St',
      city: 'Admin City',
      country: 'Country',
      zipCode: '12345',
      phone: '123-456-7890',
      products: [],
      orders: [],
      createdAt: new Date()
    },
    {
      name: 'Regular User',
      email: 'user@example.com',
      password: passwordHash,
      role: USER_ROLE_BASIC,
      address: '456 User St',
      city: 'User City',
      country: 'Country',
      zipCode: '67890',
      phone: '098-765-4321',
      products: [],
      orders: [],
      createdAt: new Date()
    }
  ];

  return await User.create(users);
};

const seedDatabase = async () => {
  try {
    // First ensure all collections exist with proper schemas
    console.info('Ensuring collections exist...');
    await ensureCollections();
    console.info('✅ Collections verified');

    // Check if data already exists
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.info('Database already contains users, skipping seed process');
      return;
    }

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
    const categories = await Category.create([
      { title: 'Electronics' },
      { title: 'Clothing' },
      { title: 'Books' }
    ]);
    console.info('✅ Categories created successfully');

    // Create products
    console.info('Creating products...');
    const products = await Product.create([
      {
        title: 'Smartphone',
        price: 699.99,
        description: 'Latest smartphone with amazing features',
        brand: 'TechBrand',
        category: categories[0]._id,
        countInStock: 10,
        images: ['smartphone1.jpg', 'smartphone2.jpg'],
        owner: adminUser._id,
        createdAt: new Date()
      },
      {
        title: 'T-Shirt',
        price: 19.99,
        description: 'Comfortable cotton t-shirt',
        brand: 'FashionBrand',
        category: categories[1]._id,
        countInStock: 50,
        images: ['tshirt1.jpg'],
        owner: adminUser._id,
        createdAt: new Date()
      },
      {
        title: 'Programming Guide',
        price: 39.99,
        description: 'Comprehensive programming guide',
        brand: 'TechBooks',
        category: categories[2]._id,
        countInStock: 25,
        images: ['book1.jpg'],
        owner: adminUser._id,
        createdAt: new Date()
      }
    ]);
    console.info('✅ Products created successfully');

    // Update user with products
    await User.findByIdAndUpdate(adminUser._id, {
      products: products.map(product => product._id)
    });

    // Update categories with products
    await Promise.all([
      Category.findByIdAndUpdate(categories[0]._id, {
        products: [products[0]._id]
      }),
      Category.findByIdAndUpdate(categories[1]._id, {
        products: [products[1]._id]
      }),
      Category.findByIdAndUpdate(categories[2]._id, {
        products: [products[2]._id]
      })
    ]);
    console.info('✅ Relations updated successfully');

    // Create sample order
    console.info('Creating sample order...');
    const order = await Order.create({
      number: 'ORD-' + Date.now(),
      createdAt: new Date(),
      customer: adminUser._id,
      products: [
        {
          ...products[0].toObject(),
          quantity: 1
        }
      ],
      value: 699.99,
      status: 'PENDING'
    });

    // Update user with order
    await User.findByIdAndUpdate(adminUser._id, {
      $push: { orders: order._id }
    });
    console.info('✅ Orders created successfully');

    console.info('🌱 Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase;
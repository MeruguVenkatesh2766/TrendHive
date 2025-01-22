const { USER_ROLE_BASIC } = require('../utils/config');

const users= [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin',
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
      password: 'user',
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
  ]

module.exports = users
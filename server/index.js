// main.js
const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const seedDatabase = require("./utils/seedDatabase");
const mongoose = require("mongoose");

class Server {
  constructor() {
    this.server = http.createServer(app);
  }

  async connectDatabase() {
    try {
      await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.info("🍀 Connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      throw error;
    }
  }

  async initializeData() {
    if (process.env.SEED_DATABASE === 'true') {
      try {
        await seedDatabase();
      } catch (error) {
        console.error("Database seeding failed:", error.message);
        // Don't throw error here - seeding failure shouldn't prevent server start
      }
    }
  }

  async start() {
    try {
      await this.connectDatabase();
      await this.initializeData();
      
      this.server.listen(config.PORT, () => {
        console.info(`🚀 Server is running on http://localhost:${config.PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }

  async stop() {
    try {
      await mongoose.connection.close();
      this.server.close();
      console.info("Server stopped gracefully");
    } catch (error) {
      console.error("Error while stopping server:", error);
      process.exit(1);
    }
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.info('SIGTERM received. Starting graceful shutdown...');
  await server.stop();
});

process.on('SIGINT', async () => {
  console.info('SIGINT received. Starting graceful shutdown...');
  await server.stop();
});

// Create and start server
const server = new Server();
server.start();
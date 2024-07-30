const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const {initializeRedisClient }  = require('./config/redisClient');



// Config
dotenv.config({ path: "config/config.env" })

// Connecting to database
connectDatabase();

// Connecting to redis
initializeRedisClient()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
});
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors()); 

// Route Imports
const user = require("./routes/userRoutes");
const book = require("./routes/bookRoutes");
const issue = require("./routes/issueRoutes");

app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", issue);

app.get('/', (req, res)=>{
    res.send("Server is working")
});

// Middleware for Errors
app.use(errorMiddleware)

module.exports = app;
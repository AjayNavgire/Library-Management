const mongooes = require("mongoose");
let  DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/library" 
const connectDatabase = () => {
  
    mongooes
        .connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(
            (data) => {
                console.log(`Mongodb connected with server: ${data.connection.host}`);
            })
}

module.exports = connectDatabase;
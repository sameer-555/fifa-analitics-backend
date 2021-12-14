const mongoose = require("mongoose");
const config = require("./config");
console.log(config)
const conn_str = `mongodb+srv://admin:${config.dbpass}@cluster0.0wkqw.mongodb.net/fifaDatabase?retryWrites=true&w=majority`;

console.log(conn_str)

module.exports = {
    mongoConnection: mongoose.connect(
        conn_str,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, conn) => {
            if (err) {
                console.log("error in connection");
            } else {
                console.log("mongodb is connected");
            }
        }
    )
};
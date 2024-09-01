const mysql = require("mysql2");
const asyncHandler = require("express-async-handler")
const dbConfig = require("../secrets/DBConfig.json");
const connection = mysql.createConnection(dbConfig);

connection.connect( asyncHandler( async ( err ) => {
    console.log("MySQL DB Connected");
}))

module.exports = { connection };
const { connection } = require("../configs/dbConnect");
const asyncHandler = require("express-async-handler");

const getRoot = asyncHandler( async ( req, res ) => {
    connection.query("select * from ToDoList order by time;", asyncHandler( async ( err, result ) => {
        await res.send(result);
    }))
})

const postRoot = asyncHandler( async ( req, res ) => {
    const query = "insert into ToDoList values(?, ?, ?)"
    let today = new Date();
    connection.execute(query, [req.body.name, req.body.done, today.toLocaleString()], (err) => {
        if (err) {
          throw err;
        }
        res.send("Successfully Inserted");
    });
})

const putRoot = asyncHandler( async ( req, res ) => {
    const query = "update ToDoList set done = ? where name = ?;";
    connection.execute(query, [req.body.done, req.body.name], (err) => {
        if(err) {
            throw err;
        }
        res.send("Suceessfully Updated");
    })
})

const deleteRoot = asyncHandler(async (req, res) => {
    const query = "delete from ToDoList where name = ?;";
    connection.execute(query, [req.body.name], (err) => {
        if(err) {
            throw err;
        }
        res.send("Successfully Deleted");
    })
})

module.exports = {getRoot, postRoot, putRoot, deleteRoot};
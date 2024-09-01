const express = require("express")
const { getRoot, postRoot, putRoot, deleteRoot } = require("../controllers/controller");
const Router = express.Router();

Router
    .route("/")
    .get(getRoot)
    .post(postRoot)
    .put(putRoot)
    .delete(deleteRoot)

module.exports = Router;
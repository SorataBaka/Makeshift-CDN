const express = require('express');
const router = new express.Router();

//Handle user creation, deletion, and info retrieval.
router.get("/register", require("./registry/getuserinfo.js"))
router.post("/register", require("./registry/createuser.js"))
router.delete("/register", require("./registry/deleteuser.js"))


module.exports = router
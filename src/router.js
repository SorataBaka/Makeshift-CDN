const express = require('express');
const router = new express.Router();
const updateRouter = new express.Router();
//Handle user creation, deletion, and info retrieval.
router.get("/register", require("./registry/getuserinfo.js"))
router.post("/register", require("./registry/createuser.js"))
router.delete("/register", require("./registry/deleteuser.js"))

<<<<<<< HEAD

=======
router.post("/upload/:filename", require("./upload/upload.js"))
>>>>>>> 5e6e5420af8106ae816478175a5d6b62e3085cd8
module.exports = router
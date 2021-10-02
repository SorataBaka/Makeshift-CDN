const express = require('express');
const multer = require("multer")

const router = new express.Router();
const updateRouter = new express.Router();
const upload = multer({dest: __dirname + "/../data/temp"})

//Handle user creation, deletion, and info retrieval.
router.get("/register", require("./registry/getuserinfo.js"))
router.post("/register", require("./registry/createuser.js"))
router.delete("/register", require("./registry/deleteuser.js"))

router.use("/update", updateRouter)
updateRouter.post("/token", require("./update/updatetoken.js"))

router.all("/upload", require("./upload/baseupload.js"))
router.post("/upload/single", upload.single('content'), require("./upload/uploadsingle.js"))


router.get("/file", require("./file/baseretrieve.js"))
router.get("/file/:id", require("./file/retrieveFileList.js"))
router.get("/file/:id/:filename", require("./file/retrieveFiles.js"))
router.delete("/file/:id/:filename", require("./file/deleteFile.js"))
module.exports = router
const express = require('express');
const router = new express.Router();
const updateRouter = new express.Router();
//Handle user creation, deletion, and info retrieval.
router.get("/register", require("./registry/getuserinfo.js"))
router.post("/register", require("./registry/createuser.js"))
router.delete("/register", require("./registry/deleteuser.js"))

router.use("/update", updateRouter)
updateRouter.post("/token", require("./update/updatetoken.js"))

router.post("/upload/:filename", require("./upload/upload.js"))

module.exports = router
module.exports = async(req, res) => {
    res.status = 400
    return res.json({
        Status: 400,
        Message: "Please provide a parameter",
        Path: "/:id/:filename"
    })
}
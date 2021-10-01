module.exports = async(req, res)=> {
    res.status = 400
    return res.json({
        Status: 400,
        Message: "Please provide an upload route",
        Routes: [
            "upload 1 file = /upload/single",
            "upload multiple files = /upload/multiple"
        ]
    })
}
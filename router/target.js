const express = require("express")
const router = express.Router()
const { DB } = require("../utils/DB")

router.get("/", (req, res) => {
    const { id, key } = req.query
    const collection = DB.collection(id, false)

    IO.emit(id, key)
    collection.insert({ key })
    res.sendStatus(200)
})


module.exports = router
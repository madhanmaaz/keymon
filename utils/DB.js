const { OctaviaDB } = require("octavia-db")
const path = require("path")

const DB = new OctaviaDB({
    databaseName: path.join(process.__dirname, "ssd"),
    databasePassword: "my123",
    logging: true
})

module.exports = { DB }
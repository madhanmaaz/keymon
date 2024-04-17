process.__dirname = __dirname

const express = require("express")
const socketIo = require("socket.io")
const http = require("http")
const path = require("path")
const { startTunnel } = require("./utils/tunnel")

const app = express()
const server = http.createServer(app)
const IO = new socketIo.Server(server)

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.json())
global.IO = IO


app.use("/", require("./router/index"))
app.use("/t", require("./router/target"))

const PORT = process.env.PORT || 3441
server.listen(PORT, async () => {

    console.log(`
██╗  ██╗███████╗██╗   ██╗███╗   ███╗ ██████╗ ███╗   ██╗
██║ ██╔╝██╔════╝╚██╗ ██╔╝████╗ ████║██╔═══██╗████╗  ██║
█████╔╝ █████╗   ╚████╔╝ ██╔████╔██║██║   ██║██╔██╗ ██║
██╔═██╗ ██╔══╝    ╚██╔╝  ██║╚██╔╝██║██║   ██║██║╚██╗██║
██║  ██╗███████╗   ██║   ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                            - Madhanmaaz
                            - https://madhanmaaz.netlify.app                                           
`)
    await startTunnel()
    console.log(`RUNNING ON: http://127.0.0.1:${PORT}`)
})
const { bin: cloudflaredBinary } = require("cloudflared")
const { spawn } = require("child_process")

let cloudflaredInstance = null

async function startTunnel() {
    try {
        if (cloudflaredInstance != null && cloudflaredInstance.killed == false) {
            console.log("KILL CLOUDFLARED TUNNEL")
            cloudflaredInstance.kill()
        }

        console.log("STARTING CLOUDFLARED TUNNEL")
        cloudflaredInstance = spawn(cloudflaredBinary, ["--url", `http://localhost:3441`])

        let waitingForUrl = new Promise((resolve, reject) => {
            cloudflaredInstance.stderr.on("data", data => {
                let logOutput = data.toString()
                const urlRegex = /https:\/\/[^\s]+/
                const match = logOutput.match(urlRegex)

                if (match) {
                    const extractedUrl = match[0];
                    if (extractedUrl.includes(".trycloudflare.com") && extractedUrl.includes("https://")) {
                        resolve(extractedUrl)
                    }
                }
            })
        })

        global.TUNNELURL = await waitingForUrl
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = { startTunnel }
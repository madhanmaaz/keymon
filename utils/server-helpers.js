const { TARGETS } = require("./DB")

module.exports = {
    checkTargetOnline(id) {
        for (const targetId of Object.values(TARGETS)) {
            if (targetId == id) return true
        }
        return false
    }
}
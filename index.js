const HaxBallJS = require("haxball.js");

async function start() {
    console.log("--- [SISTEMA] ARRANCANDO MOTOR ---");
    try {
        const mod = await HaxBallJS;
        const HBInit = (typeof mod === 'function') ? mod : mod.default;

        const room = HBInit({
            roomName: "SALA PRIVADA COL-POR",
            maxPlayers: 10,
            public: false,
            password: "123",
            noPlayer: true,
            token: process.env.HAXBALL_TOKEN,
            // FLAGS AGRESIVOS PARA SERVIDORES LINUX:
            puppeteerArgs: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        });

        room.onRoomLink = (link) => {
            console.log("*****************************************");
            console.log("¡LISTO! ENTRA AQUÍ:");
            console.log(link);
            console.log("*****************************************");
        };

    } catch (error) {
        console.error("--- [ERROR] FALLÓ EL ARRANQUE:", error);
    }
}

start();

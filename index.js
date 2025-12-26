const HaxBallJS = require("haxball.js");

async function start() {
    console.log("--- [SISTEMA] INICIANDO... ---");
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
            puppeteerArgs: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ],
            // ESTO LE DICE A RAILWAY DÓNDE ESTÁ EL NAVEGADOR:
            executablePath: '/usr/bin/chromium-browser'
        });

        room.onRoomLink = (link) => {
            console.log("-----------------------------------------");
            console.log("¡¡¡POR FIN!!! EL LINK ES ESTE:");
            console.log(link);
            console.log("-----------------------------------------");
        };

        // Si hay un error interno de HaxBall, esto lo atrapará
        room.onProxyError = (err) => console.error("Error de Proxy:", err);

    } catch (error) {
        console.error("--- [ERROR] No se pudo crear la sala:", error);
    }
}

start();

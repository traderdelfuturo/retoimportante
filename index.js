const HaxBallJS = require("haxball.js");

async function start() {
    console.log("--- [DEBUG] INICIANDO HOST ---");
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
            // Configuración vital para Railway
            puppeteerArgs: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });

        room.onRoomLink = (link) => {
            console.log("-----------------------------------------");
            console.log("¡¡¡SALA ABIERTA!!! LINK:");
            console.log(link);
            console.log("-----------------------------------------");
        };

        // Si el token es malo o expira, esto debería saltar
        setTimeout(() => {
            console.log("--- [INFO] Si no ves el link aún, el Token puede ser inválido o el servidor está lento. ---");
        }, 15000);

    } catch (error) {
        console.error("--- [ERROR] No se pudo crear la sala:", error);
    }
}

start();

const HaxBallJS = require("haxball.js");

async function start() {
    console.log("--- [DEBUG] SCRIPT INICIADO ---");
    try {
        const mod = await HaxBallJS;
        const HBInit = (typeof mod === 'function') ? mod : mod.default;

        console.log("--- [DEBUG] INTENTANDO ABRIR LA SALA (CON ARGUMENTOS)... ---");

        const room = HBInit({
            roomName: "SALA PRIVADA COL-POR",
            maxPlayers: 10,
            public: false,
            password: "123",
            noPlayer: true,
            token: process.env.HAXBALL_TOKEN,
            // ESTO ES LO QUE FALTA PARA QUE ARRANQUE EN RAILWAY:
            puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        room.onRoomLink = (link) => {
            console.log("-----------------------------------------");
            console.log("¡¡SALA ABIERTA CON ÉXITO!!");
            console.log("LINK PARA JUGAR: " + link);
            console.log("-----------------------------------------");
        };

        room.onPlayerJoin = (p) => {
            console.log("Jugador unido: " + p.name);
            room.setPlayerAdmin(p.id, true);
        };

    } catch (error) {
        console.error("--- [ERROR FATAL] ---", error);
    }
}

start();

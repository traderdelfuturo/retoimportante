const HaxBallJS = require("haxball.js");

console.log("--- [DEBUG] SCRIPT INICIADO ---");
console.log("--- [DEBUG] TOKEN PRESENTE:", process.env.HAXBALL_TOKEN ? "SÍ" : "NO");

async function start() {
    try {
        console.log("--- [DEBUG] INTENTANDO CARGAR LIBRERIA ---");
        
        // Probamos todas las formas de inicializar la librería
        const HBInit = await (HaxBallJS.then ? HaxBallJS : Promise.resolve(HaxBallJS));
        
        console.log("--- [DEBUG] LIBRERIA CARGADA. CREANDO SALA... ---");

        const room = HBInit({
            roomName: "SALA PRIVADA COL-POR",
            maxPlayers: 1,
            public: false,
            password: "123",
            noPlayer: true,
            token: process.env.HAXBALL_TOKEN
        });

        room.onRoomLink = (link) => {
            console.log("-----------------------------------------");
            console.log("LINK DE LA SALA: " + link);
            console.log("-----------------------------------------");
        };

        room.onPlayerJoin = (p) => {
            console.log("Entró: " + p.name);
            room.setPlayerAdmin(p.id, true);
        };

    } catch (error) {
        console.error("--- [ERROR FATAL] ---", error);
    }
}

start();

const HaxBallJS = require("haxball.js");

async function start() {
    console.log("--- [DEBUG] SCRIPT INICIADO ---");
    try {
        // Esperamos a que la librería cargue
        const mod = await HaxBallJS;
        
        // BUSCAMOS LA FUNCIÓN (Aquí estaba el fallo)
        // La buscamos en mod, en mod.default o donde sea
        const HBInit = (typeof mod === 'function') ? mod : mod.default;

        if (typeof HBInit !== 'function') {
            console.error("--- [ERROR] No se encontró la función de HaxBall en el módulo ---");
            return;
        }

        console.log("--- [DEBUG] FUNCIÓN ENCONTRADA. CREANDO SALA... ---");

        const room = HBInit({
            roomName: "SALA PRIVADA COL-POR",
            maxPlayers: 10,
            public: false, // Cámbialo a true si quieres que salga en la lista
            password: "123", 
            noPlayer: true,
            token: process.env.HAXBALL_TOKEN
        });

        room.onRoomLink = (link) => {
            console.log("-----------------------------------------");
            console.log("¡SALA ABIERTA CON ÉXITO!");
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

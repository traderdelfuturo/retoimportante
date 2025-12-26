const HaxBallJS = require("haxball.js");

async function init() {
    // Esta parte detecta si la librería viene como Promesa o como función directa
    let HBInit;
    if (typeof HaxBallJS.then === 'function') {
        HBInit = await HaxBallJS;
    } else if (typeof HaxBallJS === 'function') {
        HBInit = HaxBallJS;
    } else {
        HBInit = await HaxBallJS.default;
    }

    const room = HBInit({
        roomName: "SALA PRIVADA COL-POR",
        maxPlayers: 2,
        public: false,
        password: "123", // Cambia la clave si quieres
        noPlayer: true,
        token: process.env.HAXBALL_TOKEN
    });

    room.onRoomLink = (link) => {
        console.log("-----------------------------------------");
        console.log("SALA ABIERTA! COPIA ESTE LINK:");
        console.log(link);
        console.log("-----------------------------------------");
    };

    room.onPlayerJoin = (p) => room.setPlayerAdmin(p.id, true);
}

init().catch(err => console.error("Error al iniciar:", err));

const HaxBallJS = require("haxball.js");

HaxBallJS.then((HBInit) => {
  const room = HBInit({
    roomName: "COLOMBIA vs PORTUGAL",
    maxPlayers: 3,
    public: false, // Cambia a true si quieres que aparezca en la lista global
    password: "123", // Pon la clave que quieras
    noPlayer: true, // El host no juega, solo administra
    token: process.env.HAXBALL_TOKEN // Esto lo configuramos en Railway
  });

  room.onRoomLink = (link) => {
    console.log("-----------------------------------------");
    console.log("SALA ABIERTA. COPIA ESTE LINK:");
    console.log(link);
    console.log("-----------------------------------------");
  };

  // Esto es para que el primer jugador que entre sea admin
  room.onPlayerJoin = (player) => {
    room.setPlayerAdmin(player.id, true);
  };
});

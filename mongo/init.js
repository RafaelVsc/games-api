// populate db on init

db = db.getSiblingDB("gamesdb");

// create collections if not exist
db.createCollection("developers");
db.createCollection("games");

// insert developer
const squaresoft = db.developers.insertOne({
    name: "Squaresoft",
    country: "Japan"
});

const capcom = db.developers.insertOne({
    name: "Capcom",
    "country": "Japan"
})

// insert game referencing the developer
db.games.insertMany([
    {
        title: "Chrono Trigger",
        platforms: ["Super Nintendo", "Playstation", "PC"],
        releaseYear: 1995,
        durationHours: 40,
        developer: squaresoft.insertedId
    },
    {
        title: "Super Street Fighter II",
        platforms: ["Super Nintendo", "Arcade", "Sega Genesis"],
        releaseYear: 1993,
        durationHours: null,
        developer: capcom.insertedId
    },
    {
        title: "Final Fantasy VII",
        platforms: ["Playstation"],
        releaseYear: 1997,
        durationHours: 80,
        developer: squaresoft.insertedId
    }
]);
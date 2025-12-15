// src/server.js
import express from "express";
import "dotenv/config";
import {
  createPlayer,
  getAllPlayers,
  getPlayer,
  updatePlayerStats,
  getLeaderBoard,
  getPlayerByName
} from "./services/playerService.js";

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

//Middleware
app.use(cors({
origin:NODE_ENV==='production'
?process.env.CLIENT_URL
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home!");
});
app.get("/about", (req, res) => {
  res.status(200).send("My name is Ryan");
});

app.get("/error", (req, res) => {
  throw new Error("error from /error route");
});
app.get("/api/players", (req, res) => {
  // cache the array of players form a function/service
  const players = getAllPlayers();
  // respond with a success key and the players
  res.json({ success: true, players });
})
app.get("/api/players/:id", (req, res) => {
  const player = getPlayer(req.params.id);
  if (player.error) {
    return res.status(player.status).json({ error: player.error });
  }
  res.status(200).json({ success: true, player });
})
//POST routs
app.post("/api/players", (req, res) => {
  try {
    const { name } = req.body;
    const trimmedName = name?.trim()
    if (!trimmedName) {
      return res.status(400).json({
        error: "Name is required"
      });
    }
    // if (!name || !name.trim()) {
    //   return res.status(400).json({
    //     error: "Name is required",
    //   });
    // }
    const player = createPlayer(trimmedName, 32);
    if (player.error) {
      return res.status(player.status).json({ error: player.error });
    }
    res.status(201).json({ success: true, player });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Fall Error Handlers
app.use((req, res) => {
  res.status(404).send("The page you're looking for does not exist");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal Server Error! ERror!",
    msg: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

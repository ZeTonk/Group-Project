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
  origin: NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.get("/", (req, res) => {
  req.json([
    message: "Tic-Tac-Toe API",
    version: "1.0.0",
    status: "running"
  ]);
});

/**
 *POST/api/players
 * Createanewplayer
 */
 app.post("/api/players", (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: "Name is required"
      })
    }
    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Name is required",
      });
    }
    const player = createPlayer(name.trim());
    if (player.error) {
      return res.status(player.status).json({
        success: false,
        error: player.error
      });
    }
    res.status(201).json({
      success: true,
      player
    });
  }
  catch (error) {
    console.error("Error creating plaer:", error);
    res.status(500).json({
      failed: false,
      error: error.message
    });
  }
});
app.get("/api/players", (req, res) => {
  try {
    const player = getAllPlayers();
    res.json({
      success: true,
      players,
      count: players.length
    });
  } catch (error) {
    console.error("Error getting players:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get players"
    });
  }
});
app.get("/api/players/:id", (req, res) => {
  const player = getPlayer(req.params.id);
  if (player.error) {
    return res.status(player.status).json({ error: player.error });
  }
  res.status(200).json({ success: true, player });
})
//POST routs



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

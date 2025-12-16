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

// Healthcheck
app.get("/", (req, res) => {
  req.json({
    message: "Tic-Tac-Toe API",
    version: "1.0.0",
    status: "running"
  });
});

// POST routes
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
    const players = getAllPlayers();
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
});

/**
 * NEW POST/api/players/:id/stats
 * Update player stats after game
 */
app.post("/api/player/:id/stats", (req, res) => {
  try{
    const { result } = req.body;
    if(!result || !['win','loss','tie'].includes(result)){
      returnres.status(400).json({
        success: false,
        error:player.erro
      });
    }

    constplayer = updatePlayerStats(req.params.id, result);

    if (player.error) {
      return res.status(player.status).json({
        success: false,
        error: player.error
      });
    }
    res.json({
      success: true,
      player,
      message: `Player stats updated: ${result}`
    });
  } catch (error) {
    console.error("Error updating stats", error);
    res.status(500).json({
      success:false,
      error:"Failed to update player stats"
    });
  }
});

/**
 * New: GET /api/leaderboard
 * Get top players by wins
 */
app.get("/api/leaderboard", (req, res) => {
  try{
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = getLeaderboard(limit);
    res.json({
      success: true,
      leaderboard,
      count: leaderboard.length
    })
  } catch(error){
    console.error("Error getting leaderboard:", error);
    res.status(500).json({
      success:false,
      error:"Failed to get leaderboard"
    });
  }
});

/**
 * NEW GET /api/players/name/:name
 * Get player by name
 */
app.get("/api/players/name/:name", (req, res) => {
  try {
    const player = getPlayerByName(req.params.name);

    if (player.error) {
      return res.status(player.status).json({
        success: false,
        error: player.error
      });
    }

    res.json({
      success: true,
      player
    });
  } catch (error) {
    console.error("Error getting player by name:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get player"
    })
  }
});





// Fall Error Handlers
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal Server Error! ERror!",
    message: NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`\nServer is listening on ${PORT}`);
  console.log(`CORS enabled for http://localhost:5173`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  POST   /api/players`);
  console.log(`  Get    /api/players`);
  console.log(`  GET    /api/players/:id`);
  console.log(`  GET    /api/players/name/:name`);
  console.log(`  POST   /api/players/:id/stats`);
  console.log(`  GET    /api/leaderboard\n`);
});


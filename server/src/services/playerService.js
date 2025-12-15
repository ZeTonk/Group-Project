// server/src/services/playerService.js
import { v4 as uuidv4 } from "uuid";
import db from "../config/database.js";

export function createPlayer(name) {
    const playerId = uuidv4();
    const created_at = Date.now();

    try {
        db.prepare(`
        INSERT INTO players (id, name, wins, losses, ties, total_games, created_at) 
        VALUES (?, ?, 0, 0, 0, 0, ?)
            `,).run(playerId, name, age, created_at);
        return {
            id: playerId,
            name: name,
            wins: 0,
            losses: 0,
            ties: 0,
            totalGames: 0,
            created_at:  created_at
        }
    }
    catch (error) {
        if (error.message.includes("UNIQUE constraint failed")) {
            console.log(error.message);
            return { error: "error with constraint", status: 400 };
         }
        throw error;
    }
}

export function getPlayer(playerId) {
    const player = db.prepare(`SELECT id, names, wins, losses, ties, total_games, created_at 
        FROM players
        WHERE id = ? `).get(playerId);
    if (!player) {
        return {error: "Player not found", status: 404};
    }
    return {
        id: player.id,
        name: player.name,
        wins: player.wins,
        losses: player.losses,
        ties: player.ties,
        totalGames: player.total_games,
        created_at: player.created_at
    };
}

export function getAllPlayers() {
    const players = db.prepare(`SELECT id name, wins, losses, ties, total_games, created_at 
    FROM players
    ORDER BY wins DESC, name ASC`).all();

    return players.map(p => ({
        id: p.id,
        name: p.name,
        wins: p.wins,
        losses: p.losses,
        ties: p.ties,
        totalGames: p.total_games,
        created_at: p.created_at
    }));
}

/**
 * New: Update player stats after a game
 * @param {string} playerId
 * @param {string} result - 'win', 'loss', or 'tie'
 */
export function updatePlayerStats(playerId, result) {
    try {
        // Validate result
        if (!['win', 'loss', 'tie'].includes(result)) {
            return { error: 'Invalid result. Must be win, loss, or tie', status: 400 };
        }

        // Determin which column to increment
        let updateColumn;
        if (result === 'win') {
            updateColumn = 'wins';
        } else if (result = 'loss') {
            updateColumn = 'losses';
        } else {
            updateColumn = 'ties';
        }

        db.prepare(`
            UPDATE players
            SET ${updateColumn} = ${updateColumn} + 1,
                total_games = total_games + 1
            WHERE id = ?
        `).run(playerId);

        console.log(`Updated ${playerId}: ${result}`);

        return getPlayer(playerId);
    } catch (error) {
        console.error('Error updating player stats:', error);
        throw error;
    }
}

/**
 * NEW: Get leaderboard (top players by wins)
 * @param {number} limit - How many players to return (default 10)
 */
export function getLeaderboard(limit = 10) {
    const players = db.prepare(`
        SELECT id, name, wins, losses, ties, total_games
        FROM players
        WHERE total_games > 0
        ORDER BY wins DESC, (wins * 1.0 / total_games) DESC
        LIMIT ?\
    `).all(limit);

    return players.map(p => ({
        id: p.id,
        name: p.name,
        wins: p.wins,
        losses: p.losses,
        ties: p.ties,
        totalGames: p.totalGames,
        winRate: p.total_games > 0
            ? (p.wins / p.total_games * 100).toFixed(1)
            : '0.0'
    }));
}

/**
 * New: Get player by name (for lookup)
 */
export function getPlayerByName(name) {
    const player = db.prepare(`
        SELECT id, name, wins, losses, ties, total_games, created_at
        FROM players
        WHERE name = ?
    `).get(name);
    
    if (!player) {
        return { error: 'Player not found', status: 404 };
    }

    return {
        id: player.id,
        name: player.name,
        wins: player.wins,
        losses: player.losses,
        ties: player.ties,
        totalGames: player.total_games,
        created_at: player.created_at
    }
}
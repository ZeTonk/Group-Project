// client/src/components/Game/Game.jsx
import { useState, useEffect, useRef } from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";
import PlayerSetup from "../PlayerSetup";
import {
  checkForWin,
  isValidMove,
  applyMove,
  switchPlayer,
  createInitialGameState,
} from "../../utils/gameLogic";

export default function Game() {
  const [gameState, setGameState] = useState(createInitialGameState());
  const[player, setPlayer] = useState(null);
  const hasUpdatedStatsref = useRef(false);
  const { board, currentPlayer, gameOver, winner, winningCombo } = gameState;

  const handleCellClick = (position) => {
    if (gameOver) return;

    // validate move
    const validation = isValidMove(board, position);
    if (!validation.valid) {
      console.log("Invalid move:", validation.reason);
      return;
    }
    // apply move
    const newBoard = applyMove(board, position, currentPlayer);
    // check for win/draw
    const result = checkForWin(newBoard);
    // update state
    setGameState({
      board: newBoard,
      currentPlayer: result.winner
        ? currentPlayer
        : switchPlayer(currentPlayer),
      gameOver: result.winner !== null,
      winner: result.winner,
      winningCombo: result.winningCombo,
    });
  };
  /* Reset the Game */
  const handleReset = () => {
    setGameState(createInitialGameState());
    hasUpdatedStatsRef.current = false;
  };
  useEffect(() =>{
    //early return if conditions not met
  if(!gameover || !player || hasUpdatedStatsref.current){
    return;
  }

  constupdateStats=async()=>{
    hasUpdatedStatsRef.current=true;

    try{
      letresult;
      if(winner === "DRAW"){
        result === 'tie';
      }else if(winner === 'X'){
result===

    "win";        }else{

      result === "loss";}
}
   }

      const responce = await fetch(`http://localhost:3000/api/players/${player.id}/stats`, {

      })     }

    }
  }
  }
  });
  return (
    <>
      <div className="game-container">
        <h1>Tic-Tac-Toe</h1>
        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          gameOver={gameOver}
        />
        <Board
          board={board}
          onCellClick={handleCellClick}
          winningCombo={winningCombo}
        />
        <button className={`reset-button`} onClick={handleReset}>
          New Game
        </button>
      </div>
    </>
  );
}

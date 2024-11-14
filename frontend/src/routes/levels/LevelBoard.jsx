import React from "react";
import { useNavigate } from "react-router-dom";
import "./LevelBoard.scss";

function LevelBoard() {
  const navigate = useNavigate();

  // Function to handle level selection and navigate to Game
  const startGame = (chances) => {
    navigate("/game", { state: { chances } }); // Pass the chosen chances as state
  };

  return (
    <div className="level-board-wrapper">
     <div className="title2"><h2>Select your level</h2></div> 
      <div className="button-container">
        <button onClick={() => startGame(5)}>Easy</button>
        <button onClick={() => startGame(3)}>Medium</button>
        <button onClick={() => startGame(1)}>Hard </button>
      </div>
    </div>
  );
}

export default LevelBoard;

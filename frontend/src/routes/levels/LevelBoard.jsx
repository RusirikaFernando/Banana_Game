import React from "react";
import { useNavigate } from "react-router-dom";
import "./LevelBoard.scss";

function LevelBoard() {
  const navigate = useNavigate();

  const startGame = (chances, level) => {
    navigate("/game", { state: { chances, level } });
  };

  return (
    <div className="level-board-wrapper">
      <div className="title2"><h2>Select your level</h2></div>
      <div className="button-container">
        <button onClick={() => startGame(5, "easy")}>Easy</button>
        <button onClick={() => startGame(3, "medium")}>Medium</button>
        <button onClick={() => startGame(1, "hard")}>Hard</button>
      </div>
    </div>
  );
}

export default LevelBoard;

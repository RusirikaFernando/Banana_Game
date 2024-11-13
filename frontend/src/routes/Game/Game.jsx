import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./game.scss";

function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const [chances, setChances] = useState(location.state?.chances || 5);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [solvedCount, setSolvedCount] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!location.state) {
      navigate("/levelboard");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("https://marcconrad.com/uob/banana/api.php");
      setQuestionData(response.data);
      setUserAnswer("");
      setMessage("");
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === questionData.solution) {
      setSolvedCount(solvedCount + 1);
      setMessage("Correct!");
      setQuestionNumber(questionNumber + 1);
      fetchQuestion();
    } else {
      setChances((prevChances) => {
        if (prevChances - 1 <= 0) {
          setGameOver(true);
          setMessage("Game Over! All chances are used.");
        } else {
          setMessage("Answer is wrong. Try again!");
        }
        return prevChances - 1;
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && userAnswer !== "") {
        checkAnswer();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [userAnswer]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          setGameOver(true);
          setMessage("Game Over! Time is up.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (gameOver) {
      setQuestionData(null);
      setUserAnswer("");
    }
  }, [gameOver]);

  const handleNumberClick = (number) => {
    setUserAnswer(number.toString());
  };

  return (
    <div className="game-wrapper">
      {gameOver ? (
        <div className="game-over">
          <h3>{message}</h3>
          <p>Your Score: {solvedCount}</p>
          <button onClick={() => navigate("/levelboard")}>Play Again</button>
        </div>
      ) : (
        <>
          <div className="left-box">
            <p>Time Left: {timeLeft}s</p>
            <span className="countdown-timer">🎵</span> {/* Music Icon Placeholder */}
          </div>

          <div className="middle-box">
            <div className="upper-part">
              <h2>Find the Banana Value</h2>
              <p>Question: {questionNumber}</p>
            </div>

            {questionData && (
              <div>
                <img src={questionData.question} alt="Banana question" className="question-image" />
              </div>
            )}

            {/* Feedback message */}
            <p className={`message ${message === "Correct!" ? "correct" : "wrong"}`}>
              {message}
            </p>

            <div className="lower-part">
              <div className="number-buttons">
                {[...Array(10).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className="number-button"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="solved-count">Solved Count: {solvedCount}</p>
            </div>
          </div>

          <div className="right-box">
            <p>Remaining Chances: {chances}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Game;

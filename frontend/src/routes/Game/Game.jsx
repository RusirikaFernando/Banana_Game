import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./game.scss";

function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user from AuthContext
  const [chances, setChances] = useState(location.state?.chances || 5);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [solvedCount, setSolvedCount] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0); // New state for score

  // Hardcoded user information - Replace with dynamic context values
  const userId = user?.id || "defaultUserId";  // Use user ID from context
  const username = user?.username || "defaultUsername";  // Use username from context

  // Log the user object (userId and username) to the console
  useEffect(() => {
    if (user) {
      console.log({ userId, username });
    }
  }, [user, userId, username]);

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
          endGame();
          setMessage("Game Over! All chances are used.");
        } else {
          setMessage("Answer is wrong. Try again!");
        }
        return prevChances - 1;
      });
    }
  };

  const endGame = async () => {
    if (gameOver) return; // Prevent multiple calls to endGame
    setGameOver(true);
    setQuestionData(null);

    // Calculate score and set it in the state
    const calculatedScore = calculateScore(location.state?.level, solvedCount);
    setScore(calculatedScore);

    // Create the JSON object to send
    const scoreData = {
      userId: userId,
      username: username,
      score: calculatedScore,
      date: new Date().toISOString()
    };

    // Send score to the server
    try {
      await axios.post("http://localhost:8800/add-score/add-score", scoreData, {
        withCredentials: true, // Allow sending cookies (including httpOnly)
      });
      console.log("Score sent successfully:", scoreData);
    } catch (error) {
      console.error("Error sending score:", error);
    }
  };

  // Score calculation logic
  const calculateScore = (level, solved) => {
    const baseScore = level === "hard" ? 20 : level === "medium" ? 10 : 5;
    return baseScore * solved;
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
        if (prevTime <= 1) {
          clearInterval(timer);
          setMessage("Game Over! Time is up.");
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const handleNumberClick = (number) => {
    setUserAnswer(number.toString());
  };

  return (
    <div className="game-wrapper">
      {gameOver ? (
        <div className="game-over">
          <h3>{message}</h3>
          <p>Your Score: {score}</p> {/* Display the calculated score here */}
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

            <p className={message === "Correct!" ? "correct" : "wrong"}>
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

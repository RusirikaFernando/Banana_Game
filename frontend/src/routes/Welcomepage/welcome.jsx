import { Link } from "react-router-dom";
import "./welcome.scss";

function Welcome() {
  return (
    <div className="Page">
      <div className="wrapperpage">
        <div className="intro">
          <h1>Welcome to Our Game!</h1>
          <p>
            Before you start playing, please read the instructions carefully:
          </p>
          <ul>
            <li>
              This is a fun and interactive quiz game where players answer
              questions to earn points.
            </li>
            <li>
              The objective is to answer as many questions correctly as possible
              within a <strong>60-second</strong> time limit.
            </li>
            <li>You may need to create a user account to play.</li>
            <li>
              You can choose from three difficulty levels based on the number
              of chances:
              <ul>
                <li><strong>Easy:</strong> 5 chances</li>
                <li><strong>Medium:</strong> 3 chances</li>
                <li><strong>Hard:</strong> 1 chance</li>
              </ul>
            </li>
            <li>
              For example, if you select "Medium," you have 60 seconds to answer
              as many questions as possible, but you can only make 3 mistakes.
            </li>
            <li>
              The game ends when your chances run out or the time is up. Good
              luck!
            </li>
          </ul>
        </div>
        <Link to="/login">
          <button className="startButton">Start Game</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;

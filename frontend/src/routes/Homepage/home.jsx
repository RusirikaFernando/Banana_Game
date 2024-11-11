import "./home.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="wrapper1">
        <a href="/levelboard">
          <div className="play">PLAY</div>
        </a>
        <a href="/leaderboard">
          <div className="leaderboard">LEADERBOARD</div>{" "}
        </a>
      </div>
    </div>
  );
}

export default HomePage;

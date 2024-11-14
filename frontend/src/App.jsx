import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout/layout";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Leaderboard1 from "./routes/Leaderboard/Leaderboard1";
import HomePage from "./routes/Homepage/home";
import Profile from "./routes/Profile/profile";
import LevelBoard from "./routes/levels/LevelBoard";
import Game from "./routes/Game/Game";
//import Scoketboard from "./socket/socketboard";

 
 
function App() {
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Layout/>, // Render Layout component at the root path
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        
        {
          path:"/register",
          element:<Register/>
        },
        {
          path: "/leaderboard",
          element: <Leaderboard1 /> 
          //element: <Leaderboard1 data={leaderboardData}/> 
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/levelboard", 
          element: <LevelBoard />
        },
        { path: "/game", element: <Game /> },
       // { path: "/socket", element: <Scoketboard /> },
      ],
    },
  ]);
 
  return <RouterProvider router={router} />;
}
 
export default App;
 
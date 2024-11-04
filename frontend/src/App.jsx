import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout/layout";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import leaderboardData from "./routes/Leaderboard/leaderboard";
import Leaderboard1 from "./routes/Leaderboard/Leaderboard1";
import HomePage from "./routes/Homepage/home";
import Profile from "./routes/Profile/profile";

 
 
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
          element: <Leaderboard1 data={leaderboardData}/> // pass the props
        },
        {
          path: "/profile",
          element: <Profile />
        },
       
      ]
    },
  ]);
 
  return <RouterProvider router={router} />;
}
 
export default App;
 
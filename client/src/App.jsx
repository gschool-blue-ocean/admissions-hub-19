import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import SidebarNav from "./components/SidebarNav/SidebarNav";
// import { io } from "socket.io-client";
import useUserStore from "./store/userStore";
import "./App.css";
import baseurl from "../src/url";

// const socket = io("https://round-wrench-production.up.railway.app/");
// socket.on("connect", () => {
//   console.log(`Websocket connected id:${socket.id}`);
// });

const App = () => {
  // here's where we can retrieve the files with questions in the future
  // Note: App will be used as a wrapper for all pages

    //Loader data is from the index.jsx file
    const [token, userid] = useLoaderData();
    const navigate = useNavigate();
    const setUserId = useUserStore((state) => state.setUserId);
    const [userName, setUserName] = useState("");
  
    useEffect(() => {
      if (!token) navigate("/login");
      if (!userid) {
        navigate("/login");
      } else {
        setUserId(userid);
      }
    });
    
    // Performing a fetch to get the userName onto the dashboard
    useEffect(() => {
      const fetchUserData = async () => {
        fetch(`${baseurl}/user/${userid}`).then(response => response.json()).then(data => {
          // console.log(data.first_name);
          setUserName(data.first_name)}
        )};
      fetchUserData();
    }, []);

  return (
    <main>
      <SidebarNav />
      <section>
        <header>
          <h3 className="m-0 p-4 fs-3">{`${userName}'s`} Dashboard</h3>
        </header>
        {/* // Note: Outlet will be used to render nested routes */}
        <Outlet />
      </section>
    </main>
  );
};

export default App;

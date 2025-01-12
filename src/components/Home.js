import React from "react";
import Navbar from "./Navbar";
import { auth } from "./firebase";
import WeProvide from "./HomeContent/WeProvide";

const Home = () => {
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
        
      
      <WeProvide/>
    </div>
  );
};

export default Home;

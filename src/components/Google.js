import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from "./firebase";

const Google = () => {
  const navigate = useNavigate(); // Initialize navigate

  const googleLogin = async () => {
    try {
      
      const provider = new GoogleAuthProvider();
      
      await signInWithPopup(auth, provider);
      console.log("Google login successful!");
      
      navigate("/home");
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../google.png")} width={"60%"} alt="Google Login" />
      </div>
    </div>
  );
};

export default Google;

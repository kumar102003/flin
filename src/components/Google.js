import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth, db } from "./firebase"; 
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const Google = () => {
  const navigate = useNavigate(); 

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google login successful!");

      const userDocRef = doc(db, "users", user.uid);
      const userExists = await getDoc(userDocRef);

      if (!userExists.exists()) {
        
        await setDoc(userDocRef, {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email,
          createdAt: new Date(),
        });
        console.log("User data saved to Firestore!");
      }

      
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

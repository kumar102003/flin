import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No user data found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      {userDetails ? (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <img
              src={userDetails.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            <h3>Welcome, {userDetails.firstName}!</h3>
            <div className="card p-4">
              <h5>User Information</h5>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>First Name:</strong> {userDetails.firstName}</p>
              <p><strong>Last Name:</strong> {userDetails.lastName}</p>
            </div>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;

import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import your Firebase auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import userImage from '../assest/user.png'

// Navbar component
const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for routing

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have logged out successfully!');
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{
          position: 'sticky',
          top: '0',
          width: '100%',
          zIndex: '9999',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container-fluid">
        <a className="navbar-brand text-primary fs-1 fw-bold text-uppercase letter-spacing" href="/home">
  FLIN
</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-primary" aria-current="page" href="/mydata">Mydata</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-primary" href="/aboutus">About Us</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link disabled text-primary" aria-disabled="true">Disabled</a>
              </li> */}
            </ul>
            <div className="d-flex">
              {user ? (
                <>
                  {/* User's Profile Image, visible if logged in */}
                  <img
                    src={user.photoURL || userImage}
                    alt="User"
                    className="rounded-circle"
                    style={{
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                    onClick={handleProfile} 
                  />
                 
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Login and Signup Buttons, visible if user is not logged in */}
                  <a className="btn btn-outline-primary me-2" href="/login">
                    Login
                  </a>
                  <a className="btn btn-outline-secondary" href="/signup">
                    Signup
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

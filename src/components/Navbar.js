import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import your Firebase auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

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
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
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
          <a className="navbar-brand" href="/home">Navbar</a>
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
                <a className="nav-link active" aria-current="page" href="/mydata">Mydata</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/aboutus">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <div className="d-flex">
              {user ? (
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
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
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FaGithub, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';

function Layout({ user, children }) {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="terminal-layout">
      <nav className="terminal-nav">
        <div className="nav-header">
          <div className="terminal-title">VAULT-TEC TERMINAL</div>
          <button 
            className="mobile-nav-toggle"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {user && (
          <div className={`nav-links ${isNavOpen ? 'nav-open' : ''}`}>
            <div className="nav-content">
              <div className="user-info">
                LOGGED IN AS: {user.username ? user.username : user.email}
              </div>
              <div>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  [DASHBOARD]
                </NavLink>
                <NavLink
                  to="/trade"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  [TRADE]
                </NavLink>
                <NavLink
                  to="/survival"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  [SURVIVAL]
                </NavLink>
              </div>
            </div>
            <button 
              className="nav-link logout" 
              onClick={handleLogout}
            >
              [LOGOUT]
            </button>
          </div>
        )}
      </nav>

      <main className="terminal-main">{children}</main>

      <footer className="terminal-footer">
        <div className="footer-content">
          <div className="footer-text">
            <span>© 2024 | Team Doomsday-Debuggers | all rights reserved</span>
          </div>
          <div className="social-links">
            <a 
              href="https://github.com/your-github-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub />
            </a>
            <a 
              href="https://instagram.com/your-instagram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const handleLogin = ()=>{
    navigate("/login");
  }
  return (
    <nav className={styles.navbar}>
    <div className={styles.navbarContainer}>
      <Link to="/" className={styles.navbarLink}>
        Home
      </Link>
      <Link to={user?'/cart':'/login'} className={styles.navbarLink}>
        Cart
      </Link>
      {user ? (
        <button className={styles.logoutButton} onClick={handleLogout}>
          <LuLogOut />
          Logout
        </button>
      ):(
        <button className={styles.logoutButton} onClick={handleLogin}>
        Login
      </button>
      )}
    </div>
  </nav>
  );
}
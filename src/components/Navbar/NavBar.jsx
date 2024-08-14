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
  const isOrderPage = location.pathname === "/customer-orders";

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <nav className={styles.navbarContainer}>
        <div className={styles.navItem}>
          <Link to="/customer-container">Home</Link>
        </div>
        <div className={styles.navItem}>
          {!isCartPage && (
            <div className={styles.navItem}>
              <Link to="/cart">Cart</Link>
            </div>
          )}
          <div className={styles.navItem}>
            <Link
              to="#"
              style={{ cursor: "pointer" }}
              onClick={toggle}
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.modal} style={{ display: modal ? "flex" : "none" }}>
        <div className={styles.modalHeader}>
          <h4>hii {user?.username}</h4>
          <button onClick={toggle}>X</button>
        </div>
        <div className={styles.modalBody}>
          <div>
            <Link className={styles.linkStyle} to="/customer-profile">
              Manage Profile
            </Link>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Link className={styles.linkStyle} to="/customer-account">
              Customer Account
            </Link>
            <br />
          </div>
          <div className={styles.textEnd}>
            <p className={styles.logoutText}>Logout</p>
            <button
              className={styles.button}
              onClick={() => {
                const confirmation = window.confirm("Are you sure to Logout");
                if (confirmation) {
                  localStorage.removeItem("token");
                  handleLogout();
                  navigate("/");
                  window.location.reload();
                }
              }}
            >
              <LuLogOut className={styles.logoutIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
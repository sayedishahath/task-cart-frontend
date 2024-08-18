import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import { FaLock, FaUser } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { LOGIN } from "../../apis/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import styles from "./Login.module.css";

Array.prototype.findErrors = function(name) {
  let result = "";
  this.forEach((ele) => {
    if (ele.path === name) {
      result += ele.msg;
    }
  });
  return result;
};

export default function LoginForm() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  const [formErrors, setFormErrors] = useState("");
  const [serverErrors, setServerErrors] = useState("");

  const errors = {};

  const validateErrors = () => {
    if (form.username.trim().length === 0) {
      errors.username = "Username is Required";
    }
    if (form.password.trim().length === 0) {
      errors.password = "Password is Required";
    }
  };
  validateErrors();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: form.username,
      password: form.password,
    };

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          LOGIN,
          formData
        );
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);
        console.log(response.data);
        handleLogin(user);
        toast.success("logged in successfully!");
        setFormErrors("");
        setServerErrors("");
        navigate("/");
      } catch (err) {
        console.log(err);
        if (err.response.data.errors) {
          setServerErrors(err.response.data.errors);
        } else {
          setServerErrors(err.response.data);
        }
        console.log(serverErrors);
        setFormErrors("");
      }
    } else {
      setFormErrors(errors);
      setServerErrors("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {serverErrors.error && (
            <span className={styles.error}>{serverErrors.error}</span>
          )}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              placeholder="Enter Email/Number"
              onChange={handleChange}
            />
            <FaUser className={styles.icon} />
            </div>
            {formErrors.username && (
              <span className={styles.error}>{formErrors.username}*</span>
            )}
          </div>
          <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              id="password"
              value={form.password}
              placeholder="Enter Password"
              onChange={handleChange}
            />
            <div onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? (
                <MdVisibilityOff className={styles.icon} />
              ) : (
                <MdVisibility className={styles.icon} />
              )}
            </div>
            </div>
            {serverErrors[0] && (
              <span className={styles.error}>
                {serverErrors.findErrors("password")}*
              </span>
            )}
            {formErrors.password && (
              <span className={styles.error}>{formErrors.password}*</span>
            )}
          </div>
          <input
            className={styles.inputButton}
            type="submit"
            value="Login"
          />
          <div className={styles.registerLink}>
            <label>Don't have an account?</label>
            <Link to="/register">
              <p>Register</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
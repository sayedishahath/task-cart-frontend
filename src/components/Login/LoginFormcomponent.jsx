import { useState } from "react"
import axios from "axios"

import { Link, useNavigate } from "react-router-dom"
import { Alert } from "reactstrap";
import { FaLock, FaUser } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import styles from "./Login.module.css"
Array.prototype.findErrors = function(name) {
    let result = ""
    this.forEach(ele => {
        if(ele.path === name) {
            result += ele.msg
        }
    })
    return result
}

export default function LoginForm() {

    const { handleLogin } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username : "",
        password : ""
    })
    const [isVisible, setISVisible] = useState(false)

    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")

    const errors = {}

    const validateErrors = () => {
        if(form.username.trim().length === 0){
            errors.username = "Username is Required"
        }
        if(form.password.trim().length === 0){
            errors.password = "Password is Required"
        }
    }
    validateErrors()

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }
    // console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            username : form.username,
            password : form.password
        }

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5001/api/users/login", formData)
                const token = response.data.token
                const user = response.data.user
                localStorage.setItem("token", token)
                console.log(response.data)
                handleLogin(user)
                toast.success('logged in successfully!')
                setFormErrors("")
                setServerErrors("")
                navigate('/')
            } catch(err) {
                // alert(err.message)
                console.log(err)
                if(err.response.data.errors) {
                    setServerErrors(err.response.data.errors)
                } else {
                    setServerErrors(err.response.data)
                }
                console.log(serverErrors)
                setFormErrors("")
            }
        } else {
            setFormErrors(errors)
            setServerErrors("")
        }
    }
    // console.log(formErrors)

    return (
        <div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {serverErrors.error && (
                        <Alert color="danger">{serverErrors && serverErrors.error} </Alert>
                    )}
                    <div className="input-box">
                        <input 
                            type="text"
                            name="username"
                            id="username"
                            value={form.username}
                            placeholder="Enter Email/Number" 
                            onChange={handleChange}
                            /> 
                            <FaUser className="icon"/>
                    </div>
                    {formErrors.username && <Alert color="danger">{formErrors.username}</Alert>}
                    <div className="input-box">
                        <input 
                            type={isVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            value={form.password}
                            placeholder="Enter Password" 
                            onChange={handleChange}
                            />
                            <div onClick={() => {setISVisible(!isVisible)}}>
                                {isVisible ? <MdVisibilityOff className="visible-icon"/> : <MdVisibility className="visible-icon"/>}
                            </div>
                            <FaLock className="icon"/>
                    </div>
                    {serverErrors[0] && <Alert color="danger">{serverErrors.findErrors("password")}</Alert>}
                    {formErrors.password && <Alert color="danger">{formErrors.password}</Alert>}
                   
                    <input className="input-button" type="submit" value="Login" />
                    <div className="register-link">
                        <label>Don't have an account?</label>
                        <Link to="/register" style={{ color: '#231f20' }}><p>Register</p></Link>
                    </div>
                </form>
                
            </div>
        </div>
    )
}
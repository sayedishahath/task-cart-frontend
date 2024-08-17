import { useState } from "react"
import axios from "axios"

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { MdMail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import styles from "./Register.module.css"
import toast from "react-hot-toast";
Array.prototype.findErrors = function(name) {
    let result = ""
    this.forEach(ele => {
        if(ele.path === name) {
            result += ele.msg
        }
    })
    return result
    // for(let i = 0; i < this.length; i++) {
    //     let result = ""
    //     if(this[i].path === name) {
    //         result += this[i].msg
    //     }
    //     return result
    // }
}

export default function Register() {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        username : "",
        password : "",
        email : ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isVisible, setISVisible] = useState(false)
    const [isVisibleC, setISVisibleC] = useState(false)

    // console.log(phone)

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
        if(form.password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }
        if(form.email.trim().length === 0){
            errors.email = "Email is Required"
        }
    }
    validateErrors()
    // const [ isRegistered, setIsRegistered ] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }
    // console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.log(form)

        const formData = {
            username : form.username,
            password : form.password,
            email : form.email
        }
        // console.log(formData)

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5001/api/users/register", formData)
                console.log(response.data)
                toast.success("Successfully Registered!")
                setForm({
                    username : "",
                    password : "",
                    email : "",
                })
                // setPhone("")
                setFormErrors("")
                setServerErrors("")
                // setIsRegistered(true)
                navigate("/")
            } catch(err) {
                // alert(err.message)
                console.log(err)
                setFormErrors("")
                setServerErrors(err.response.data.error)
                console.log(serverErrors)
            }
        } else {
            console.log(formErrors)
            setFormErrors(errors)
            setServerErrors("")
        }
    }

    return (
        <div className="login">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    {serverErrors.error && (
                        <Alert color="danger">{serverErrors && serverErrors.error} </Alert>
                    )}
                    <div className="input-box">
                        <input 
                            type="text"
                            name="username"
                            id="username"
                            value={form.username}
                            placeholder="Enter Username" 
                            onChange={handleChange}
                            /> 
                            <FaUser className="icon"/>
                    </div>
                    {serverErrors && serverErrors.findErrors("username") && <Alert color="danger">{serverErrors.findErrors("username")}</Alert>}
                    {formErrors.username && <Alert color="danger">{formErrors.username}</Alert>}
                    <div className="input-box">
                        <input 
                            type={isVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            value={form.password}
                            placeholder="Enter password" 
                            onChange={handleChange}
                            />
                            <div onClick={() => {setISVisible(!isVisible)}}>
                                {isVisible ? <MdVisibilityOff className="visible-icon"/> : <MdVisibility className="visible-icon"/>}
                            </div>
                            <FaLock className="icon"/>
                    </div>
                    {formErrors.password && <Alert color="danger">{formErrors.password}</Alert>}
                    {serverErrors && serverErrors.findErrors("password") && <Alert color="danger">{serverErrors.findErrors("password")}</Alert>}
                    <div className="input-box">
                        <input
                            type={isVisibleC ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            placeholder="Confirm new Password"
                            id="confirmPassword"
                            name="confirmPassword"
                        />
                        <div onClick={() => {setISVisibleC(!isVisibleC)}}>
                                {isVisibleC? <MdVisibilityOff className="visible-icon"/> : <MdVisibility className="visible-icon"/>}
                         </div>
                    </div>
                    {formErrors.confirmPassword && <Alert color="danger">{formErrors.confirmPassword}</Alert>}
                    <div className="input-box">
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            value={form.email}
                            placeholder="Enter Email" 
                            onChange={handleChange}
                            />
                            <MdMail className="icon"/>
                    </div>
                    {formErrors.email && <Alert color="danger">{formErrors.email}</Alert>}
                    {serverErrors && serverErrors.findErrors("email") && <Alert color="danger">{serverErrors.findErrors("email")}</Alert>}
                   
                    <input className="input-button" type="submit" value="Register" />
                    <div className="register-link">
                        <label>Already have an account? Click here to </label>
                        <Link className="link-style" to="/login"><p>Login</p></Link>
                    </div>
                </form>
                
            </div>
        </div>
    )
}
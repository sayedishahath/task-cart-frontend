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
                toast.success("Successfully Registered and Login to Continue!")
                setForm({
                    username : "",
                    password : "",
                    email : "",
                })
                // setPhone("")
                setFormErrors("")
                setServerErrors("")
                // setIsRegistered(true)
                navigate("/login")
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
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    {serverErrors.error && (
                        <span className={styles.error}>{serverErrors && serverErrors.error} </span>
                    )}
                    <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                        <input 
                            type="text"
                            name="username"
                            id="username"
                            value={form.username}
                            placeholder="Enter Username" 
                            onChange={handleChange}
                            /> 
                            <FaUser className={styles.icon}/>
                        </div>
                    </div>
                    {serverErrors && serverErrors.findErrors("username") && <span className={styles.error}>{serverErrors.findErrors("username")}</span>}
                    {formErrors.username && <span className={styles.error}>{formErrors.username}</span>}
                    <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                        <input 
                            type={isVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            value={form.password}
                            placeholder="Enter password" 
                            onChange={handleChange}
                            />
                            <div onClick={() => {setISVisible(!isVisible)}}>
                                {isVisible ? <MdVisibilityOff className={styles.icon}/> : <MdVisibility className={styles.icon}/>}
                            </div>
                            </div>
                    </div>
                    {formErrors.password && <span className={styles.error}>{formErrors.password}</span>}
                    {serverErrors && serverErrors.findErrors("password") && <span className={styles.error}>{serverErrors.findErrors("password")}</span>}
                    <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                        <input
                            type={isVisibleC ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            placeholder="Confirm new Password"
                            id="confirmPassword"
                            name="confirmPassword"
                        />
                        <div onClick={() => {setISVisibleC(!isVisibleC)}}>
                                {isVisibleC? <MdVisibilityOff className={styles.icon}/> : <MdVisibility className={styles.icon}/>}
                         </div>
                         </div>
                    </div>
                    {formErrors.confirmPassword && <span className={styles.error}>{formErrors.confirmPassword}</span>}
                    <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            value={form.email}
                            placeholder="Enter Email" 
                            onChange={handleChange}
                            />
                            <MdMail className={styles.icon}/>
                            </div>
                    </div>
                    {formErrors.email && <span className={styles.error}>{formErrors.email}</span>}
                    {serverErrors && serverErrors.findErrors("email") && <span className={styles.error}>{serverErrors.findErrors("email")}</span>}
                   
                    <input className={styles.inputButton} type="submit" value="Register" />
                    <div className={styles.registerLink}>
                        <label>Already have an account? Click here to </label>
                        <Link  to="/login"><p>Login</p></Link>
                    </div>
                </form>
                
            </div>
        </div>
    )
}
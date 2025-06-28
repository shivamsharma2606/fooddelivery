import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Loginpopup.css';
import { StoreContext } from '../../context/storecontext';
import axios from 'axios';

const Loginpopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("signup");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (currState === "login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Axios error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='login-popup'>
            <div className="login-popup">
                <form onSubmit={onLogin} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currState === "login" ? "Login" : "Sign Up"}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>

                    <div className="login-popup-inputs">
                        {currState === "signup" && (
                            <input
                                name='name'
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                placeholder="Your name"
                                required
                            />
                        )}
                        <input
                            name='email'
                            onChange={onChangeHandler}
                            value={data.email}
                            type="email"
                            placeholder="Your email"
                            required
                        />
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button type='submit'>{currState === "signup" ? "Create account" : "Login"}</button>

                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>

                    {currState === "login" ? (
                        <p>
                            Create a new account? <span onClick={() => setCurrState("signup")}>Click here</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <span onClick={() => setCurrState("login")}>Login here</span>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Loginpopup;

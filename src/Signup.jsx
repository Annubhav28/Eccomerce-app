import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from './Firebase';

const Signup = () => {
  const auth = getAuth();

  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [active, setActive] = useState("Sign Up");

  const handletype = (e) => {
    setActive(e.target.innerText);
  }

  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: data.username
      });
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log(user);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }

 

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4 col-ip-3 col-mp-1"></div>
          <div className="col-4 col-ip-6 col-mp-10">
            <div className="signup-card">
              <div className="register-type">
                <h4 onClick={(e) => handletype(e)} className={active === "Login" ? "light" : "dark"}>Sign Up</h4>
                <h4 onClick={(e) => handletype(e)} className={active === "Sign Up" ? "light" : "dark"}>Login</h4>
              </div>
              {active === "Login" ? null : <input type="text" placeholder='Enter Username' required name='username' onChange={(e) => handleChange(e)} />}
              <input type="email" placeholder='Enter Email' required name='email' onChange={(e) => handleChange(e)} />
              <input type="password" placeholder='Enter Password' required name='password' onChange={(e) => handleChange(e)} />

              {active === "Login" ? <button onClick={handleLogin}>Login</button> : <button onClick={handleSignup}>Sign Up</button>}


            </div>
          </div>
          <div className="col-4 col-ip-3 col-mp-1"></div>
        </div>
      </div>
    </>
  )
}

export default Signup;

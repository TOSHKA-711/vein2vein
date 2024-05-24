import React, { useRef, useState } from "react";
import Alert from '@mui/material/Alert';
import "./style/Login.css";

const Login = () => {
  const [data] = useState({
    email: "admin",
    password: "0000",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === data.email && password === data.password) {
      setShowSuccessAlert(true);
      console.log("Login successful!");
      setTimeout(() => setShowSuccessAlert(false), 2000); 
    } else {
      setShowErrorAlert(true);
      console.log("Invalid email or password. Please try again.");
      setTimeout(() => setShowErrorAlert(false), 2000); 
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };
  const openNewDocument = () => {
    window.open('/sectionSelect', "_self");
  };

  return (
    <div className="login">
      <div className="nav">
        <p className="logo">VEIN 2 VEIN</p>
        <div className="taps">
          <a>Service personnel</a>
          <a>Exit</a>
        </div>
      </div>
      {showSuccessAlert && openNewDocument()}
      {showErrorAlert && (
        <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
          Invalid email or password. Please try again.
        </Alert>
      )}
      <div className="container">
        <input
          type="email"
          placeholder="your email"
          ref={emailRef}
          required
        ></input>
        <input
          type="password"
          placeholder="password"
          ref={passwordRef}
          required
        ></input>
        <button onClick={handleSubmit}> Submit</button>
      </div>
   
    </div>
  );
};

export default Login;

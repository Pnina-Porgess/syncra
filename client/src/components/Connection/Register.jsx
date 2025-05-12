import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import styles from './register.module.css'; 
import CryptoJS from 'crypto-js';
const Register = () => {
  const [NextRegistration, setNextRegistration] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone:''
  });
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleInitialRegister = async (e) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/users?username=${username}`);  
      if (response.data) {
        setError('Username already exists.');
      } else {
        setNextRegistration(false)
        setError('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
    const newUser = {username,hashedPassword: hashedPassword,name:userDetails.fullName,email:userDetails.email,phone:userDetails.phone};
    const response = await axios.post('http://localhost:3000/users/', newUser);
    const user = { username, id: response.data.id,email:userDetails.email,phone:userDetails.phone };
      login(user);
      navigate('/home');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  return (
    <div className={styles.container}>
      <h2>Register</h2>
      {NextRegistration ? (
        <form onSubmit={handleInitialRegister} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Register</button>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.linkContainer}>
            <Link to="/login">Login</Link>
          </div>
        </form>
      ) : (
        <form onSubmit={handleCompleteRegistration} className={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={userDetails.fullName}
            onChange={(e) =>
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                fullName: e.target.value,
              }))
            }
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                email: e.target.value,
              }))
            }
            required
            className={styles.input}
          />
          <input
            type="phone"
            placeholder="Phone"
            value={userDetails.phone}
            onChange={(e) =>
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                phone: e.target.value,
              }))
            }
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Complete Registration</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );  
};

export default Register;

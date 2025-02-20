import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { UserAuth } from "../../types/types.tsx";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

function LoginPage({}: LoginPageProps) {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    const loginPayload = { username, password };

    fetch('http://localhost:200/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
        return response.json();
      })
      .then((data: UserAuth) => {
        console.log('User authenticated:', data);

        localStorage.setItem('authToken', data.token);
        alert('Login successful!');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error during login:', error.message);
        alert(error.message);
      });
  }

  return (
    <div className={styles.root}>
      <form
        className={styles.loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input type="text"
                 id="username"
                 name="username"
                 className={styles.inputField}
                 placeholder="Enter your username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password"
                 id="password"
                 name="password"
                 className={styles.inputField}
                 placeholder="Enter your password"
                 pattern="(?=.*\d).{8,}"
                 title="Password must be at least 8 characters long and contain at least one number"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required />
        </div>
        <button type="submit"
                className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

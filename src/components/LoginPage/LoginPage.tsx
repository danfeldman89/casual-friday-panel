import { useState } from 'react';
import styles from './LoginPage.module.css';
import { UserAuth } from "../../types/types.tsx";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/login.ts";
import { useDispatch } from "react-redux";
import { updateCurrentUserAuth } from "../../store/userSlice.ts";

interface LoginPageProps {}

function LoginPage({}: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin() {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    const loginPayload = { username, password };

    login(loginPayload)
      .then((data: UserAuth) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data));
        alert('Login successful!');
        dispatch(updateCurrentUserAuth(data));
        navigate('/dashboard');
      })
      .catch(error => {
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

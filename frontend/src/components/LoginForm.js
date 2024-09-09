// src/components/LoginForm.js
import React, { useState } from 'react';
import { login, googleLogin } from '../api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const token = response.data.access_token;  // Get the JWT token
      localStorage.setItem('token', token);  // Save token to local storage
      alert('Login successful!');
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();  // Redirect to Google login URL
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      <div>
        <h3>Or login with:</h3>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
};

export default LoginForm;

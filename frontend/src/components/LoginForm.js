// // src/components/LoginForm.js
// import React, { useState } from 'react';
// import { login, googleLogin } from '../api';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login({ email, password });
//       const token = response.data.access_token;  // Get the JWT token
//       localStorage.setItem('token', token);  // Save token to local storage
//       alert('Login successful!');
//     } catch (error) {
//       console.error(error);
//       alert('Invalid credentials');
//     }
//   };

//   const handleGoogleLogin = () => {
//     googleLogin();  // Redirect to Google login URL
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       <div>
//         <h3>Or login with:</h3>
//         <button onClick={handleGoogleLogin}>Login with Google</button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



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

  // Define inline styles
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9'
    },
    header: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '10px',
      transition: 'background-color 0.3s'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    googleButton: {
      padding: '10px',
      backgroundColor: '#db4437',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Login
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Or login with:</h3>
        <button
          onClick={handleGoogleLogin}
          style={styles.googleButton}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

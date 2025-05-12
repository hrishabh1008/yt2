import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Handle sign in logic here
    alert(`Signed in as ${email}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9f9f9'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '350px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube"
          style={{ width: '120px', alignSelf: 'center' }}
        />
        <h2 style={{ textAlign: 'center', margin: 0 }}>Sign in</h2>
        <p style={{ textAlign: 'center', color: '#606060', margin: 0 }}>
          to continue to YouTube
        </p>
        <input
          type="email"
          placeholder="Email or phone"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            background: '#c4302b',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '0.75rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
        <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          <a href="#" style={{ color: '#1a73e8', textDecoration: 'none' }}>
            Forgot email?
          </a>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Not your computer? Use Guest mode to sign in privately.
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="#" style={{ color: '#1a73e8', textDecoration: 'none' }}>
            Create account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';

interface Props {
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<Props> = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (isRegister) {
          setRegistrationSuccess(true);
          setUsername('');
          setPassword('');
          setIsRegister(false);
          setError('');
        } else {
          if (data.token) {
            localStorage.setItem('token', data.token);
            onAuthSuccess();
          }
        }
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%', margin: 'auto' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {registrationSuccess && !isRegister && (
        <p style={{ color: 'green' }}>Registration successful! Please log in.</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => { setIsRegister(!isRegister); setError(''); setRegistrationSuccess(false); }}>
        {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default AuthForm;

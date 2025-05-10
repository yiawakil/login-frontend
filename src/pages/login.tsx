import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { setToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setToken(response.access_token));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br/>
      <button type="submit" disabled={isLoading}>Login</button>
      {error && <p>Login failed</p>}
    </form>
  );
};

export default Login;
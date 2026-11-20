import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => e.preventDefault();

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome</h2>
          <p className="login-subtitle">
            Please enter your details to sign in.
          </p>

          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label className="login-label" htmlFor="username">
                Username
              </label>
              <input
                className="login-input"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="login-input-group">
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                className="login-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                required
              />
            </div>

            <button className="login-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              className="guest-button"
              type="button"
              onClick={() => navigate('/inventory')}
            >
              Continue as Guest
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

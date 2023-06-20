import React, { useState } from 'react';
import LoginPage from './LoginPage';
import ProfilePage from './components/ProfilePage';

const App = () => {
  const [loginToken, setLoginToken] = useState('');

  const handleLogin = (token) => {
    setLoginToken(token);
  };

  const handleLogout = () => {
    setLoginToken('');
  };

  return (
    <div>
      {!loginToken ? (
        <LoginPage handleLogin={handleLogin} />
      ) : (
        <ProfilePage loginToken={loginToken} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;

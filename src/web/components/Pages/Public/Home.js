import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Auth/AuthContext';

const Home = () => (
  <AuthContext.Consumer>
    { ({ isAuthenticated, login }) => (
      <div>
        <h1>This is the home page of Kevin Roy</h1>
        {isAuthenticated() ? (
          <Link to="/profile">View profile</Link>
        ) : (
          <button type="submit" onClick={login}>Login</button>
        )}
      </div>
    )}
  </AuthContext.Consumer>
);

export default Home;

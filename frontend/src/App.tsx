import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import TaskList from './components/TaskList';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TaskList />
        </>
      ) : (
        <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
};

export default App;

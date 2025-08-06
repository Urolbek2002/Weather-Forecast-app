// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('DARK_MODE') === 'true';
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'dark bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 to-white text-gray-900'
      }`}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/details/:date"
            element={<DetailsPage darkMode={darkMode} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

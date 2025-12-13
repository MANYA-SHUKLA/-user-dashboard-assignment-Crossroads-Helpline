import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Layout/Footer';

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <h1>User Management Dashboard</h1>
            <button 
              className="btn btn-secondary"
              onClick={toggleDarkMode}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="container">
        <Dashboard />
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Insights from './pages/Insights/Insights';
import LandingPage from './pages/LandingPage';
import { useThemeStore } from './store/useStore';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle URL space-decoding for video if needed, but standard routing applies

  return (
    <Router>
      <Routes>
        {/* Unwrapped Video Splash Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Main App Component Mapping */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        
        {/* Global Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

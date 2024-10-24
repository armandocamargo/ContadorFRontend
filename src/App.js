import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/contador" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
};

export default App;

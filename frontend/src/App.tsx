import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Carreras = React.lazy(() => import('./pages/Carreras'));
const Modalidades = React.lazy(() => import('./pages/Modalidades'));
const Profile = React.lazy(() => import('./pages/Profile'));

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-[#F4F7FB]">
            <div className="w-12 h-12 border-4 border-[#E30613] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/carreras" element={<Carreras />} />
            <Route path="/modalidades" element={<Modalidades />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </Suspense>
      </Router>
    </ToastProvider>
  );
};

export default App;

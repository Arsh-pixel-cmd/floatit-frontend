import React, { useState } from 'react';
import { useAuth } from './lib/auth';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import InteractiveCanvas from './components/InteractiveCanvas';

export default function App() {
  const { user, loading, isAuthenticated } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAPIModal, setShowAPIModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState('templates');
  const [dashboardView, setDashboardView] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Show loading spinner while auth is checking session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf5ff] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-400 font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !showAPIModal) {
    if (currentPage === 'templates') {
      return <Templates isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'dashboard') {
      return <Dashboard isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} dashboardView={dashboardView} setDashboardView={setDashboardView} />;
    }
    if (currentPage === 'templateCanvas') {
      return <InteractiveCanvas mode="template" setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'newProject') {
      return <InteractiveCanvas mode="new" setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'projects') {
      return <Projects isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} />;
    }
    return <Home inputValue={inputValue} setInputValue={setInputValue} setCurrentPage={setCurrentPage} />;
  }

  return (
    <Onboarding 
      inputValue={inputValue} setInputValue={setInputValue}
      showModal={showModal} setShowModal={setShowModal}
      showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}
      showAPIModal={showAPIModal} setShowAPIModal={setShowAPIModal}
      showPassword={showPassword} setShowPassword={setShowPassword}
      handleCompleteOnboarding={() => {
        setShowModal(false);
        setShowAPIModal(false);
        setCurrentPage('templates');
      }}
    />
  );
}

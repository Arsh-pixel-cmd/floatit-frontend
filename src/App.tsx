import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './lib/auth';
import { AnimatePresence } from 'framer-motion';
import OnboardingTour, { useOnboardingStatus } from './components/OnboardingTour';
import { ROUTES } from './lib/routes';

// Route-level code splitting — each page loads on demand
const LandingPage = lazy(() => import('./components/landing/index'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Engine = lazy(() => import('./Engine'));
const ProfileView = lazy(() => import('./components/landing/ProfileView').then((m: any) => ({ default: m.ProfileView })));

const PageLoader = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-[#050505]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[#A259FF] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Loading Module...</span>
    </div>
  </div>
);

export default function App() {
  const { showOnboarding, completeOnboarding, user } = useOnboardingStatus();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-indigo-500/30 selection:text-white relative">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public route — Landing Page */}
          <Route path={ROUTES.landing} element={<LandingPage />} />
          
          {/* Protected routes — require authentication */}
          <Route path={ROUTES.dashboard} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path={ROUTES.canvas} element={<ProtectedRoute><Engine /></ProtectedRoute>} />
          <Route path={ROUTES.profile} element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        </Routes>
      </Suspense>

      <AnimatePresence>
        {showOnboarding && <OnboardingTour onComplete={completeOnboarding} user={user} />}
      </AnimatePresence>
    </div>
  );
}

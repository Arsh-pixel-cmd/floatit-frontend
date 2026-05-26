import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crosshair, Compass, Plus } from 'lucide-react';
import { ROUTES } from '../../lib/routes';
import { Navbar } from './Navbar';
import { HeroPrompt } from './HeroPrompt';
import { LivePipelinePreview } from './LivePipelinePreview';
import { RegisterView } from './RegisterView';
import { ProfileView } from './ProfileView';
import { DocumentationView } from './DocumentationView';
import { useAuth } from '../../lib/auth';

export default function LandingPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('landing');
  const [landingPrompt, setLandingPrompt] = useState(() => {
    try {
      return window.localStorage.getItem('landing_prompt') || '';
    } catch {
      return '';
    }
  });

  // Get user state directly from Context
  const { user, signOut } = useAuth();

  const persistLandingPrompt = (value: string) => {
    setLandingPrompt(value);
    try {
      window.localStorage.setItem('landing_prompt', value);
    } catch {
      // ignore storage errors in private modes
    }
  };

  const clearLandingPrompt = () => {
    try {
      window.localStorage.removeItem('landing_prompt');
    } catch {
      // ignore
    }
  };

  const handleInit = () => {
    if (user) {
      navigate(ROUTES.dashboard);
    } else {
      setView('register');
    }
  };

  const handleRegister = () => {
    navigate(ROUTES.dashboard); // Go to dashboard directly after register
  };

  const handleLogout = async () => {
    await signOut();
    setView('landing');
  };

  const handleNav = (target: string) => {
    if (target.startsWith('#')) {
      if (view !== 'landing') {
        setView('landing');
        setTimeout(() => {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setView(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full bg-[#181818] text-[#929292] font-onest selection:bg-[#ff6a6a] selection:text-[#171717] overflow-y-auto overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&family=Onest:wght@300;400;500;600&display=swap');

        .font-grozen {
          font-family: 'Onest', 'Cygre', system-ui, -apple-system, sans-serif;
        }
        .font-onest {
          font-family: 'Onest', 'Cygre', system-ui, -apple-system, sans-serif;
        }
        .font-geist {
          font-family: 'Geist Mono', monospace;
        }
        .dot-grid {
          background-image: radial-gradient(rgba(91, 91, 91, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        html { scroll-behavior: smooth; }
      `}} />

      {/* 1. Dot Grid Structural Underlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none z-0 opacity-25"></div>

      {/* 2. The Spectral Blob - The exactly ONE radial gradient deep background layer */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none z-0" style={{
        background: 'radial-gradient(circle, #46B1FF 0%, #A259FF 35%, #FF6A6A 70%, #DEF767 100%)'
      }}></div>

      {/* 3. Main full-width content container */}
      <div className="w-full min-h-screen relative z-10 flex flex-col bg-transparent">
        <Navbar user={user} onNavigate={handleNav} onInit={handleInit} currentView={view} />

        {view === 'landing' && (
          <div className="flex flex-col w-full">

            {/* Centered Hero Section */}
            <section className="pt-32 pb-24 px-6 md:px-10 relative overflow-hidden flex flex-col items-center justify-center min-h-screen w-full">

              {/* Corner crosshairs inside the hero viewport */}
              <div className="absolute top-[120px] left-[20px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
              <div className="absolute top-[120px] right-[20px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

              <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center w-full">

                {/* <div className="inline-flex items-center gap-2 border border-[#2e2e2e] bg-[#171717] px-3 py-1 mb-8 font-geist font-mono text-[10px] uppercase text-[#5b5b5b]">
                  <span>SYSTEM // ACTIVE</span>
                </div> */}

                <h1 className="text-4xl md:text-6xl font-onest font-bold text-white uppercase tracking-[0.04em] mb-6 leading-[1.15] text-center w-full">
                  Design Multi-Agent <br />
                  Pipelines Visually.
                </h1>

                <p className="text-[13px] font-onest text-[#929292] leading-relaxed max-w-xl mb-12 text-center">
                  The premium neuro-orchestration platform. Connect, configure, and execute complex autonomous agent architectures with unprecedented control. Designed for technical drawing precision.
                </p>

                {/* Centered Large Prompt Input Area */}
                <div className="w-full max-w-2xl z-20">
                  <HeroPrompt prompt={landingPrompt} onPromptChange={persistLandingPrompt} onInit={handleInit} />
                </div>

                {/* Central Pipeline Preview */}
                {/* <div className="w-full mt-8 z-10">
                  <LivePipelinePreview />
                </div> */}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#2e2e2e] pt-16 pb-24 bg-[#181818] relative z-20 w-full flex items-center justify-center">
              <div className="w-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-base font-onest font-bold text-white tracking-[0.04em] uppercase">
                    Agentic<span className="text-[#5b5b5b]">Flow</span>
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-[11px] font-onest uppercase tracking-[0.04em] text-[#929292]">
                  <button onClick={handleInit} className="hover:text-white transition-colors duration-100 border border-transparent hover:border-[#DEF767] px-2 py-1">Platform</button>
                  <button onClick={handleInit} className="hover:text-white transition-colors duration-100 border border-transparent hover:border-[#DEF767] px-2 py-1">Enterprise</button>
                  <button onClick={() => handleNav('documentation')} className="hover:text-white transition-colors duration-100 border border-transparent hover:border-[#DEF767] px-2 py-1">Docs</button>
                  <button className="hover:text-white transition-colors duration-100 cursor-not-allowed border border-transparent px-2 py-1">Legal</button>
                </div>
              </div>
            </footer>
          </div>
        )}

        {view === 'register' && <div className="w-full pt-[90px]"><RegisterView onRegister={handleRegister} /></div>}
        {view === 'profile' && <div className="w-full pt-[90px]"><ProfileView user={user} onLogout={handleLogout} /></div>}
        {view === 'documentation' && <div className="w-full pt-[90px]"><DocumentationView onInit={handleInit} /></div>}
      </div>

      {/* 4. Bottom-Right Fixed FABs */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 pointer-events-auto select-none">
        {/* Top FAB: Recenter */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-[40px] h-[40px] rounded-full border border-[#5b5b5b] hover:border-[#DEF767] bg-[#181818] flex items-center justify-center text-[#929292] hover:text-[#DEF767] transition-all duration-100"
          title="Recenter Viewport"
          aria-label="Recenter"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        {/* Bottom FAB: Explore (Triggers docs navigation as Pricing is gone) */}
        <button
          onClick={() => handleNav('documentation')}
          className="w-[40px] h-[40px] rounded-full border border-[#5b5b5b] hover:border-[#DEF767] bg-[#181818] flex items-center justify-center text-[#929292] hover:text-[#DEF767] transition-all duration-100"
          title="Explore Documentation"
          aria-label="Explore"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

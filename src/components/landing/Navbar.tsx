import React, { useState } from 'react';
import { User, Menu, X, Plus } from 'lucide-react';

interface NavbarProps {
  user: any;
  onNavigate: (target: string) => void;
  onInit: () => void;
  currentView?: string;
}

export const Navbar = ({ user, onNavigate, onInit, currentView = 'landing' }: NavbarProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const navItems = [
    { label: 'Platform', onClick: onInit, isActive: false },
    { label: 'Architecture', onClick: () => onNavigate('documentation'), isActive: currentView === 'documentation' },
    { label: 'Docs', onClick: () => onNavigate('documentation'), isActive: currentView === 'documentation' },
  ];

  const handleItemClick = (target: string) => {
    onNavigate(target);
    setIsAccordionOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[90px] bg-[#181818] border-b border-[#2e2e2e] z-50 flex items-center justify-between font-onest px-8 select-none">

        {/* Far Left: Brand Logo & Name */}
        <div
          onClick={() => handleItemClick('landing')}
          className="flex items-center cursor-pointer py-2 px-4 border border-transparent hover:border-[#DEF767] transition-colors duration-100"
        >
          <span className="text-xl font-onest font-bold tracking-[0.04em] text-white uppercase">
            Agentic<span className="text-[#929292]">Flow</span>
          </span>
        </div>

        {/* Centered: Navigation Links (Desktop) */}
        {/* <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`py-2 px-4 text-xs uppercase tracking-[0.04em] font-onest font-medium transition-colors duration-100 border border-transparent hover:border-[#DEF767]
                  ${item.isActive
                    ? 'text-[#ff6a6a]'
                    : 'text-[#929292] hover:text-white'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div> */}

        {/* Far Right: Auth / Action / Mobile Toggle */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={() => handleItemClick('profile')}
              className="w-10 h-10 border border-[#2e2e2e] hover:border-[#ff6a6a] hover:text-[#ff6a6a] flex items-center justify-center text-[#929292] transition-colors duration-100"
              aria-label="User Profile"
            >
              <User className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onInit}
              className="hidden sm:flex items-center justify-center px-6 h-10 bg-[#181818] border border-[#DEF767] text-[#DEF767] hover:bg-[#DEF767] hover:text-[#171717] font-onest text-xs uppercase tracking-[0.04em] transition-colors duration-100"
            >
              Initialize
            </button>
          )}

          {/* Hamburger Accordion Toggle (Mobile) */}
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="md:hidden w-10 h-10 border border-[#2e2e2e] hover:border-[#ff6a6a] hover:text-[#ff6a6a] flex items-center justify-center text-[#929292] transition-colors duration-100"
            aria-label="Toggle Menu"
          >
            {isAccordionOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Accordion Menu (Mobile) */}
      {isAccordionOpen && (
        <div className="fixed top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-[#181818] border-b border-[#2e2e2e] z-40 flex flex-col justify-start select-none font-onest overflow-y-auto">
          <div className="flex flex-col w-full">
            {navItems.map((item) => {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick();
                    setIsAccordionOpen(false);
                  }}
                  className={`w-full h-[90px] px-8 text-left text-base uppercase tracking-[0.04em] border-b border-[#2e2e2e] font-onest font-medium transition-colors duration-100 flex items-center justify-between
                    ${item.isActive
                      ? 'bg-[#ff6a6a] text-[#171717]'
                      : 'text-[#929292] hover:bg-[#ff6a6a] hover:text-[#171717]'
                    }
                  `}
                >
                  <span>{item.label}</span>
                  <Plus className={`w-5 h-5 transition-transform duration-200 ${item.isActive ? 'rotate-45' : ''}`} />
                </button>
              );
            })}
            {!user && (
              <button
                onClick={() => {
                  handleItemClick('register');
                }}
                className="w-full h-[90px] px-8 text-left text-base uppercase tracking-[0.04em] border-b border-[#2e2e2e] font-onest font-medium text-[#DEF767] hover:bg-[#DEF767] hover:text-[#171717] transition-colors duration-100 flex items-center justify-between"
              >
                <span>Initialize Engine</span>
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

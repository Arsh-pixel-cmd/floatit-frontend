const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appJsxPath = path.join(srcDir, 'App.jsx');
const lines = fs.readFileSync(appJsxPath, 'utf8').split('\n');

function getLines(start, end) {
  // 1-indexed to 0-indexed
  return lines.slice(start - 1, end).join('\n');
}

// 1. initialTemplateAgents.js (lines 3-21)
const agentsData = getLines(3, 21);
fs.mkdirSync(path.join(srcDir, 'data'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'data', 'initialTemplateAgents.js'), 'export ' + agentsData + '\n');

// 2. ProjectMenu.jsx (lines 23-185)
const projectMenuCode = getLines(23, 185);
fs.mkdirSync(path.join(srcDir, 'components'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'components', 'ProjectMenu.jsx'), 
`import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, PlusSquare, Trash2, Sun, LogOut, Delete, Bell, Pencil } from 'lucide-react';

export default ${projectMenuCode}
`);

// 3. InteractiveCanvas.jsx (lines 187-400)
const interactiveCanvasCode = getLines(187, 400);
fs.writeFileSync(path.join(srcDir, 'components', 'InteractiveCanvas.jsx'),
`import React, { useState, useRef, useEffect } from 'react';
import { PanelLeft, PanelLeftClose, Home, LayoutDashboard, Folder, LayoutGrid, Library, MousePointer2, Image, Type, Square, MessageSquare, Pencil, Triangle, Spline, Grid3x3, PenSquare } from 'lucide-react';
import { initialTemplateAgents } from '../data/initialTemplateAgents';
import ProjectMenu from './ProjectMenu';

export default ${interactiveCanvasCode}
`);

// 4. Templates.jsx (lines 423-484)
const templatesCode = getLines(423, 484);
fs.mkdirSync(path.join(srcDir, 'pages'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'pages', 'Templates.jsx'),
`import React from 'react';
import { PanelLeft, PanelLeftClose, Home, LayoutDashboard, Folder, LayoutGrid, Library, Search, Plus } from 'lucide-react';
import ProjectMenu from '../components/ProjectMenu';

export default function Templates({ isSidebarOpen, setIsSidebarOpen, setCurrentPage }) {
  return (
${templatesCode}
  );
}
`);

// 5. Dashboard.jsx (lines 490-720)
const dashboardCode = getLines(490, 720);
fs.writeFileSync(path.join(srcDir, 'pages', 'Dashboard.jsx'),
`import React from 'react';
import { PanelLeft, PanelLeftClose, Home, LayoutDashboard, Folder, LayoutGrid, Library, Search, Plus, List, ChevronDown } from 'lucide-react';
import ProjectMenu from '../components/ProjectMenu';

export default function Dashboard({ isSidebarOpen, setIsSidebarOpen, setCurrentPage, dashboardView, setDashboardView }) {
  return (
${dashboardCode}
  );
}
`);

// 6. Projects.jsx (lines 734-818)
const projectsCode = getLines(734, 818);
fs.writeFileSync(path.join(srcDir, 'pages', 'Projects.jsx'),
`import React from 'react';
import { PanelLeft, PanelLeftClose, Home, LayoutDashboard, Folder, LayoutGrid, Library, Search, Plus, List } from 'lucide-react';
import ProjectMenu from '../components/ProjectMenu';

export default function Projects({ isSidebarOpen, setIsSidebarOpen, setCurrentPage }) {
  return (
${projectsCode}
  );
}
`);

// 7. Home.jsx (lines 823-867)
const homeCode = getLines(823, 867);
fs.writeFileSync(path.join(srcDir, 'pages', 'Home.jsx'),
`import React from 'react';
import { Paperclip, ArrowUp, Sparkles, Users2, Lightbulb, Heart } from 'lucide-react';

export default function Home({ inputValue, setInputValue, setCurrentPage }) {
  return (
${homeCode}
  );
}
`);

// 8. Onboarding.jsx (lines 872-983)
const onboardingCode = getLines(872, 983);
fs.writeFileSync(path.join(srcDir, 'pages', 'Onboarding.jsx'),
`import React from 'react';
import { Paperclip, ArrowUp, Sparkles, Users2, Plug, Info, Heart, Lightbulb, User, Mail, Lock, Key, EyeOff, Eye, Lock as LockIcon } from 'lucide-react';

export default function Onboarding({
  inputValue, setInputValue,
  showModal, setShowModal,
  showLoginModal, setShowLoginModal,
  showAPIModal, setShowAPIModal,
  showPassword, setShowPassword,
  setIsLoggedIn, handleCompleteOnboarding
}) {
  return (
${onboardingCode}
  );
}
`);

// 9. Rewrite App.jsx
fs.writeFileSync(appJsxPath, 
`import React, { useState } from 'react';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import InteractiveCanvas from './components/InteractiveCanvas';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAPIModal, setShowAPIModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [dashboardView, setDashboardView] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCompleteOnboarding = () => {
    setShowModal(false);
    setShowAPIModal(false);
    setIsLoggedIn(true);
    setCurrentPage('templates');
  };

  if (isLoggedIn) {
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
      setIsLoggedIn={setIsLoggedIn} handleCompleteOnboarding={handleCompleteOnboarding}
    />
  );
}
`);

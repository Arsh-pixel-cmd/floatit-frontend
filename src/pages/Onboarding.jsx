import React, { useState } from 'react';
import { Paperclip, ArrowUp, Sparkles, Users2, Plug, Info, Heart, Lightbulb, User, Mail, Lock, Key, EyeOff, Eye, Lock as LockIcon, X } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabaseClient';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';

export default function Onboarding({
  inputValue, setInputValue,
  showModal, setShowModal,
  showLoginModal, setShowLoginModal,
  showAPIModal, setShowAPIModal,
  showPassword, setShowPassword,
  handleCompleteOnboarding
}) {
  const { signUp, signIn } = useAuth();
  const [showFindApiKey, setShowFindApiKey] = useState(false);
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // API Key form state
  const [apiKeyValue, setApiKeyValue] = useState('');
  const [apiKeyLoading, setApiKeyLoading] = useState(false);

  const handleSignup = async () => {
    setSignupError('');
    setSignupLoading(true);
    try {
      const result = await signUp({ email: signupEmail, password: signupPassword, name: signupName });
      if (result.error) {
        setSignupError(result.error);
      } else {
        // Signup successful → move to API key modal
        setShowModal(false);
        setShowAPIModal(true);
      }
    } catch (err) {
      setSignupError('An error occurred. Please try again.');
    }
    setSignupLoading(false);
  };

  const handleLogin = async () => {
    setLoginError('');
    setLoginLoading(true);
    try {
      const result = await signIn({ email: loginEmail, password: loginPassword });
      if (result.error) {
        setLoginError(result.error);
      } else {
        // Login successful → auth context updates automatically
        setShowLoginModal(false);
      }
    } catch (err) {
      setLoginError('An error occurred. Please try again.');
    }
    setLoginLoading(false);
  };

  const handleSaveApiKey = async () => {
    if (!apiKeyValue.trim()) {
      handleCompleteOnboarding();
      return;
    }
    setApiKeyLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await fetch(`${API_BASE}/api/keys/save`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ userId: session.user.id, apiKey: apiKeyValue.trim() }),
        });
      }
    } catch (err) {
      console.error('Failed to save API key:', err);
    }
    setApiKeyLoading(false);
    handleCompleteOnboarding();
  };

  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (err) {
      console.error('Google sign-in failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ff] text-gray-900 font-sans relative">
      <header className="h-[60px] bg-white border-b border-gray-200 flex items-center px-10 mb-14">
        <div className="w-full max-w-[1440px] mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold"><span className="text-blue-600">float</span><span className="text-orange-500">it</span></div>
          <div className="flex gap-3">
            <button onClick={() => setShowLoginModal(true)} className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">Login</button>
            <button onClick={() => setShowModal(true)} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Create account</button>
          </div>
        </div>
      </header>

      <main className="max-w-[750px] mx-auto px-4 pb-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-gray-900">Welcome to <span className="text-blue-600">float</span><span className="text-orange-500">it</span></h1>
          <p className="text-gray-500 text-[14px]">Create agentic AI workflows that think, act, and deliver.</p>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 mb-8 w-full mx-auto">
          <h2 className="text-[15px] font-semibold mb-1 text-gray-900">What are we working on?</h2>
          <textarea className="w-full text-[13px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none resize-none mb-2 h-12 mt-1" placeholder='Example: "Help me streamline our customer onboarding experience"' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <div className="flex justify-between items-end mt-2">
            <button className="text-gray-500 hover:text-gray-700 transition"><Paperclip size={18} /></button>
            <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-sm"><ArrowUp size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: Sparkles, title: "Build Agentic AI workflow", desc: "Design workflows powered by AI agents that can reason, decide, and act." },
            { icon: Users2, title: "Collaborate and iterate", desc: "Work with your team, test ideas, and refine workflow faster." },
            { icon: Plug, title: "Connect your tools", desc: "Integrate apps, APIs, and data sources to automate end-to-end processes." },
            { icon: Info, title: "Guided Design Process", desc: "Not sure what to do next? Your AI coach is here to help." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3"><item.icon className="text-blue-600" size={14} /></div>
              <h3 className="font-semibold text-[12px] mb-1.5 leading-tight text-gray-900">{item.title}</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center pb-10">
          <p className="text-[11px] font-medium text-gray-500 mb-4">Try these too get started</p>
          <div className="flex flex-nowrap gap-3 justify-center max-w-[800px] mx-auto whitespace-nowrap">
            {[
              { icon: Heart, text: "Improve user onboard" },
              { icon: Users2, text: "Synthesize research" },
              { icon: Lightbulb, text: "User research plan" },
              { icon: Sparkles, text: "Automate workflow" }
            ].map((s, i) => (
              <div key={i} className="px-4 py-2 flex items-center gap-2 border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-700 bg-white shadow-sm hover:shadow-md cursor-pointer transition">
                <s.icon className="text-blue-600" size={16} /> {s.text}
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white w-[380px] rounded-[24px] p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-left mb-1 text-gray-900">Create account</h2>
            <p className="text-[11px] text-gray-500 text-left mb-5">Start your journey with Float it</p>
            {signupError && <p className="text-red-500 text-[11px] text-center mb-3 bg-red-50 p-2 rounded-lg">{signupError}</p>}
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Name</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf5ff] focus-within:ring-1 focus-within:ring-black transition-all">
                  <Mail className="text-gray-400" size={14} />
                  <input type="text" placeholder="anjali" value={signupName} onChange={(e) => setSignupName(e.target.value)} className="w-full ml-2 text-[12px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Email Address</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf5ff] focus-within:ring-1 focus-within:ring-black transition-all">
                  <Mail className="text-gray-400" size={14} />
                  <input type="email" placeholder="name@company.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full ml-2 text-[12px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Password</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf5ff] focus-within:ring-1 focus-within:ring-black transition-all">
                  <Lock className="text-gray-400" size={14} />
                  <input type="password" placeholder="••••••••" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full ml-2 text-[12px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none tracking-widest" />
                  <a href="#" className="text-[9px] text-gray-500 hover:text-blue-600 transition whitespace-nowrap ml-2">Forgot password?</a>
                </div>
              </div>
            </div>
            <button onClick={handleSignup} disabled={signupLoading} className="w-full bg-[#2945D1] text-white rounded-xl py-2.5 text-[12px] font-semibold hover:bg-blue-700 transition disabled:opacity-50">{signupLoading ? 'Creating...' : 'Sign In'}</button>
            <div className="flex items-center gap-3 my-4"><div className="flex-1 h-px bg-gray-200"></div><span className="text-[9px] text-gray-400 font-medium">OR</span><div className="flex-1 h-px bg-gray-200"></div></div>
            <button onClick={handleGoogleSignIn} className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-2.5 text-[12px] font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"><svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Sign in with Google</button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white w-[380px] rounded-[24px] p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-left mb-1 text-gray-900">Login</h2>
            {loginError && <p className="text-red-500 text-[11px] text-center mb-3 bg-red-50 p-2 rounded-lg">{loginError}</p>}
            <div className="space-y-3 mb-5 mt-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Email Address</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf5ff] focus-within:ring-1 focus-within:ring-black transition-all">
                  <Mail className="text-gray-400" size={14} />
                  <input type="email" placeholder="name@company.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full ml-2 text-[12px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Password</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf5ff] focus-within:ring-1 focus-within:ring-black transition-all">
                  <Lock className="text-gray-400" size={14} />
                  <input type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full ml-2 text-[12px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none tracking-widest" />
                  <a href="#" className="text-[9px] text-gray-500 hover:text-blue-600 transition whitespace-nowrap ml-2">Forgot password?</a>
                </div>
              </div>
            </div>
            <button onClick={handleLogin} disabled={loginLoading} className="w-full bg-[#2945D1] text-white rounded-xl py-2.5 text-[12px] font-semibold hover:bg-blue-700 transition disabled:opacity-50">{loginLoading ? 'Logging in...' : 'Login'}</button>
            <div className="flex items-center gap-3 my-4"><div className="flex-1 h-px bg-gray-200"></div><span className="text-[9px] text-gray-400 font-medium">OR</span><div className="flex-1 h-px bg-gray-200"></div></div>
            <button onClick={handleGoogleSignIn} className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-2.5 text-[12px] font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"><svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Sign in with Google</button>
            <p className="text-center text-[10px] text-gray-500 mt-4">Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowLoginModal(false); setShowModal(true); }} className="text-[#2945D1] font-semibold hover:underline">Sign up</a></p>
          </div>
        </div>
      )}

      {showAPIModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowAPIModal(false)}>
          {!showFindApiKey ? (
            <div className="bg-white w-[380px] rounded-[24px] p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-bold text-gray-900">Configure API Key</h2>
                <button onClick={() => setShowAPIModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition text-gray-500"><X size={16} /></button>
              </div>
              <p className="text-[11px] text-gray-500 mb-5">Connect your LLM provider to enable agentic capabilities.</p>
              <div className="mb-5">
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Enter API Key</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf5ff] focus-within:ring-1 focus-within:ring-black transition-all">
                  <input type={showPassword ? "text" : "password"} placeholder="sk - ..." value={apiKeyValue} onChange={(e) => setApiKeyValue(e.target.value)} className="w-full text-[12px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none" />
                  <button onClick={() => setShowPassword(!showPassword)} className="ml-2">{showPassword ? <EyeOff size={16} className="text-gray-400"/> : <Eye size={16} className="text-gray-400"/>}</button>
                </div>
              </div>
              <button onClick={handleSaveApiKey} disabled={apiKeyLoading} className="w-full bg-[#2945D1] text-white rounded-xl py-2.5 text-[12px] font-semibold hover:bg-blue-700 transition mb-3 disabled:opacity-50">{apiKeyLoading ? 'Saving...' : 'Save & Connect'}</button>
              <button onClick={() => setShowFindApiKey(true)} className="w-full bg-white border border-blue-600 text-blue-600 rounded-xl py-2.5 text-[12px] font-semibold hover:bg-blue-50 transition">Where do I find my API key?</button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 mt-5"><LockIcon size={12} />Your keys are encrypted and never stored on our servers.</div>
            </div>
          ) : (
            <div className="bg-white w-full max-w-[800px] rounded-[24px] p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Connect your API Key</h2>
                  <p className="text-[12px] text-gray-500 mt-1">Float uses your own AI API key to power workflows and AI agents.</p>
                </div>
                <button onClick={() => setShowAPIModal(false)} className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition text-gray-500"><X size={16} /></button>
              </div>
              
              <div className="my-10 relative">
                <div className="absolute top-[15px] left-[10%] right-[10%] h-px bg-gray-200 -z-10"></div>
                <div className="flex justify-between relative z-10">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[13px] font-semibold mb-4">1</div>
                    <div className="text-[11px] font-medium text-center text-blue-600 flex flex-col gap-1">
                      <a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="underline hover:text-blue-700">openrouter.ai</a>
                      <span className="text-gray-500 no-underline">or</span>
                      <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="underline hover:text-blue-700">console.groq.com/keys</a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[13px] font-semibold mb-4">2</div>
                    <div className="text-[11px] font-medium text-center text-gray-700">Sign in to your account</div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[13px] font-semibold mb-4">3</div>
                    <div className="text-[11px] font-medium text-center text-gray-700">Go to API Keys</div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[13px] font-semibold mb-4">4</div>
                    <div className="text-[11px] font-medium text-center text-gray-700">Create API key</div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[13px] font-semibold mb-4">5</div>
                    <div className="text-[11px] font-medium text-center text-gray-700 max-w-[120px]">Copy and paste it in the field mentioned</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-10">
                <LockIcon size={14} /> Your keys are encrypted and never stored on our servers.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

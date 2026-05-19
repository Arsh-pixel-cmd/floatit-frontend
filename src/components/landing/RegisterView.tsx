import React, { useState } from 'react';
import { User, Mail, Building2, UserPlus, Lock, Loader2, Plus } from 'lucide-react';
import { useAuth } from '../../lib/auth';

interface RegisterViewProps {
  onRegister: (user: any) => void;
}

export const RegisterView = ({ onRegister }: RegisterViewProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { user, error } = await signIn({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw new Error(error);
        if (user) {
          onRegister(user);
        }
      } else {
        const { user, error } = await signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          company: formData.company
        });
        if (error) throw new Error(error);
        if (user) {
          onRegister(user);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-32 px-6 bg-[#181818] select-none min-h-screen">
      <div className="w-full max-w-md bg-[#171717] border border-[#2e2e2e] p-8 relative">
        
        {/* Corner technical crosshairs */}
        <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-[#929292]" />
          </div>
        </div>
        
        <h2 className="text-xl font-grozen font-bold text-white mb-2 uppercase tracking-[0.04em]">
          {isLogin ? 'Welcome Back' : 'Create Profile'}
        </h2>
        <p className="text-[13px] font-onest text-[#929292] leading-normal mb-8">
          {isLogin ? 'Sign in to access your orchestrations.' : 'Register to initialize your neuro-orchestration workspace.'}
        </p>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-[#171717] border border-[#ff6a6a] text-[#ff6a6a] text-xs font-mono">
            ERR // {errorMsg.toUpperCase()}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">01 // Full Name</label>
              <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
                <User className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
                <input 
                  type="text" 
                  required={!isLogin} 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                  placeholder="Jane Doe" 
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">
              {isLogin ? '01 // Email Address' : '02 // Email Address'}
            </label>
            <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
              <Mail className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                placeholder="jane@company.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">
              {isLogin ? '02 // Password' : '03 // Password'}
            </label>
            <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
              <Lock className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
              <input 
                type="password" 
                required 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">04 // Company (Optional)</label>
              <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
                <Building2 className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
                <input 
                  type="text" 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                  placeholder="Acme Corp" 
                />
              </div>
            </div>
          )}
          
          <button 
            disabled={loading} 
            type="submit" 
            className="w-full mt-6 bg-[#181818] border border-[#ff6a6a] text-[#ff6a6a] hover:bg-[#ff6a6a] hover:text-[#171717] font-grozen text-xs uppercase tracking-[0.04em] py-3.5 transition-colors duration-100 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? 'Access Workspace' : 'Establish Profile')} 
            {!loading && <Plus className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-[#929292] hover:text-[#ff6a6a] font-grozen text-xs uppercase tracking-[0.04em] transition-colors duration-100"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

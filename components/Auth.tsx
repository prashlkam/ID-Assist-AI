
import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, User, ChevronRight, Fingerprint, Loader2 } from 'lucide-react';

interface AuthProps {
  onLogin: (user: { name: string; role: string }) => void;
}

type AuthMode = 'login' | 'register' | 'mfa';

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('adrian.vance@board.id');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setMode('mfa');
    }, 1500);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: 'Sir Adrian Vance', role: 'Independent Director' });
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-y-auto">
      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px] border border-slate-100 relative z-10">
          
          {/* Left Branding Side */}
          <div className="md:w-1/2 executive-gradient p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
                  ID
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">ID Assist AI</h1>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-4xl font-light leading-tight">
                  Empowering the <span className="font-bold text-blue-400">Boardroom</span> with Intelligence.
                </h2>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">
                  Secure, data-driven decision support for Independent Directors navigating complex regulatory and strategic landscapes.
                </p>
              </div>
            </div>

            <div className="relative z-10 border-t border-slate-800 pt-8 mt-12">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/id-${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="Peer" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Trusted by 500+ Directors</p>
              </div>
            </div>
          </div>

          {/* Right Form Side */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto">
              {mode !== 'mfa' ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">
                      {mode === 'login' ? 'Executive Login' : 'Register Account'}
                    </h3>
                    <p className="text-slate-500 font-medium">
                      {mode === 'login' 
                        ? 'Welcome back. Please authenticate to access your board suite.' 
                        : 'Create your secure profile for ID Assist AI.'}
                    </p>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-5">
                    {mode === 'register' && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                          <input 
                            required
                            type="text" 
                            placeholder="Sir Adrian Vance"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700" 
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Institutional Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          required
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@board.id"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                        {mode === 'login' && (
                          <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</button>
                        )}
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          required
                          type="password" 
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700" 
                        />
                      </div>
                    </div>

                    <button 
                      disabled={loading}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                        <>
                          {mode === 'login' ? 'Continue' : 'Create Account'}
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-slate-500 font-medium">
                      {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                      <button 
                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                        className="text-blue-600 font-bold hover:underline underline-offset-4"
                      >
                        {mode === 'login' ? 'Request Access' : 'Login instead'}
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="animate-in zoom-in-95 duration-500 text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Fingerprint className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Multi-Factor Auth</h3>
                  <p className="text-slate-500 font-medium mb-10">
                    Please enter the 6-digit verification code sent to your registered mobile device.
                  </p>

                  <form onSubmit={handleMfaSubmit} className="space-y-10">
                    <div className="flex justify-between gap-3">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-full h-16 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-2xl font-bold text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                        />
                      ))}
                    </div>

                    <div className="space-y-4">
                      <button 
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                          <>
                            <ShieldCheck className="w-6 h-6" />
                            Verify & Access Dashboard
                          </>
                        )}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-slate-400 font-bold text-sm hover:text-slate-600"
                      >
                        Try different method
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer (Now block positioned at the bottom) */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600 transition-colors">SOC2 Compliance</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Contact Security</a>
        </div>
        <p className="text-slate-300 md:ml-auto">© 2024 ID Assist AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Auth;

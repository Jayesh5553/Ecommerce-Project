import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { showAuthModal, setShowAuthModal, login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!showAuthModal) return null;

  const handleClose = () => {
    setShowAuthModal(false);
    setErrorMsg('');
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp) {
      if (!username.trim() || !password || !email.trim()) {
        setErrorMsg('Please fill in all required fields');
        return;
      }
      setIsLoading(true);
      try {
        const result = await register({
          username: username.trim(),
          email: email.trim(),
          password,
          first_name: firstName.trim(),
        });
        if (!result.success) {
          setErrorMsg(result.error || 'Registration failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!username.trim() || !password) {
        setErrorMsg('Please enter username and password');
        return;
      }
      setIsLoading(true);
      try {
        const result = await login({
          username: username.trim(),
          password,
        });
        if (!result.success) {
          setErrorMsg(result.error || 'Invalid credentials.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-sm shadow-2xl overflow-hidden max-w-2xl w-full flex flex-col md:flex-row relative border border-gray-100">
        
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 text-gray-400 hover:text-gray-800 p-1 rounded-full bg-white/80"
          type="button"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="md:w-2/5 bg-fk-blue p-8 text-white flex flex-col justify-between select-none">
          <div>
            <h3 className="text-2xl font-extrabold mb-3">
              {isSignUp ? 'Looks like you are new here!' : 'Login'}
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed font-medium">
              {isSignUp
                ? 'Sign up with your mobile number or email to get started with ShopKart rewards!'
                : 'Get access to your Orders, Wishlist and personalized Recommendations'}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <ShieldCheck className="w-20 h-20 text-fk-yellow opacity-90 stroke-[1.5]" />
            <span className="text-[11px] text-blue-100 font-semibold mt-2">100% Safe & Secure</span>
          </div>
        </div>

        <div className="md:w-3/5 p-8 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {errorMsg && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200 font-medium">
                {errorMsg}
              </div>
            )}

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={isLoading}
                    className="w-full pl-9 pr-3 py-2 text-xs border-b-2 border-gray-200 focus:border-fk-blue outline-none transition-colors disabled:opacity-50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Username / Mobile</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  disabled={isLoading}
                  className="w-full pl-9 pr-3 py-2 text-xs border-b-2 border-gray-200 focus:border-fk-blue outline-none transition-colors disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    disabled={isLoading}
                    className="w-full pl-9 pr-3 py-2 text-xs border-b-2 border-gray-200 focus:border-fk-blue outline-none transition-colors disabled:opacity-50"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  disabled={isLoading}
                  className="w-full pl-9 pr-3 py-2 text-xs border-b-2 border-gray-200 focus:border-fk-blue outline-none transition-colors disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-500 leading-tight">
              By continuing, you agree to the <a href="#" className="text-fk-blue font-semibold">Terms of Use</a> and <a href="#" className="text-fk-blue font-semibold">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-fk-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase rounded-sm shadow-md transition-transform active:scale-95 tracking-wider flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isLoading ? 'PLEASE WAIT...' : (isSignUp ? 'CONTINUE' : 'LOGIN')}</span>
            </button>
          </form>

    
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <button
              onClick={handleToggleMode}
              disabled={isLoading}
              className="text-xs font-bold text-fk-blue hover:underline disabled:opacity-50"
            >
              {isSignUp ? 'Existing User? Log in' : 'New user? Create an account'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

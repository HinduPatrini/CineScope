import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AuthGate = () => {
  const { login, register } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isSignIn && !name)) return;
    setLoading(true);
    if (isSignIn) {
      await login({ email, password });
    } else {
      await register({ name, email, password });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#e50914]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#e50914]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-dark-200/80 backdrop-blur-md border border-neutral-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Branding header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-brand tracking-tighter hover:scale-105 transition-transform duration-200 select-none">
            CINE<span className="text-white">SCOPE</span>
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-3 font-medium">
            {isSignIn 
              ? 'Sign in to access your custom watchlist and recommendations.' 
              : 'Create an account to begin tracking your favorite movies.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-neutral-900/60 p-1.5 rounded-xl mb-6 border border-neutral-800/80">
          <button
            onClick={() => { setIsSignIn(true); setEmail(''); setPassword(''); setName(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
              isSignIn 
                ? 'bg-brand text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignIn(false); setEmail(''); setPassword(''); setName(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
              !isSignIn 
                ? 'bg-brand text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isSignIn && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121212]/95 border border-brand/60 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition duration-200"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121212]/95 border border-brand/60 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition duration-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121212]/95 border border-brand/60 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white font-bold py-3.5 px-4 rounded-xl hover:bg-brand/90 transition-all duration-200 shadow-xl shadow-brand/10 active:scale-[0.98] disabled:opacity-50 mt-2 text-sm"
          >
            {loading 
              ? (isSignIn ? 'Signing In...' : 'Registering...') 
              : (isSignIn ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {/* Bottom helpful message */}
        <div className="mt-8 text-center text-xs text-neutral-500 font-medium">
          {isSignIn ? (
            <>
              New to CineScope?{' '}
              <button
                type="button"
                onClick={() => { setIsSignIn(false); setEmail(''); setPassword(''); setName(''); }}
                className="text-white hover:text-brand font-semibold underline transition-colors"
              >
                Sign up now.
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsSignIn(true); setEmail(''); setPassword(''); setName(''); }}
                className="text-white hover:text-brand font-semibold underline transition-colors"
              >
                Sign in instead.
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthGate;

import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated credentials to include 'admin'/'admin'
    if (username === 'admin' && (password === 'home' || password === 'admin123' || password === 'admin')) {
      onLoginSuccess();
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
       {/* Background decorative elements - lighter for white theme */}
       <div className="absolute top-0 left-0 w-full h-full bg-white z-0"></div>
       <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
       <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-xl animate-fade-in-up">
        <button 
            onClick={onBack}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
        >
            ✕
        </button>
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-[var(--color-medium)]/10 rounded-full mb-4 text-[var(--color-darkest)]">
            <UserIcon className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[var(--color-darkest)]">Admin Portal</h2>
          <p className="text-slate-500 text-sm mt-2">Gestiona la experiencia HOME</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-medium)] focus:border-transparent text-slate-800 outline-none transition-all"
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-medium)] focus:border-transparent text-slate-800 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[var(--color-darkest)] hover:bg-[var(--color-dark)] text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-200 transform hover:scale-[1.02] duration-200"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
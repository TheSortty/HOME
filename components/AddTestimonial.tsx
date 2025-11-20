import React, { useState } from 'react';
import PhotoIcon from './icons/PhotoIcon';
import { TestimonialRole } from '../types';

interface AddTestimonialProps {
  isVisible: boolean;
  onClose: () => void;
}

const ROLES_OPTIONS: TestimonialRole[] = ['Participante', 'Senior', 'Staff'];

const AddTestimonial: React.FC<AddTestimonialProps> = ({ isVisible, onClose }) => {
  const [name, setName] = useState('');
  const [cycle, setCycle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<TestimonialRole[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (!isVisible) return null;

  const handleRoleChange = (role: TestimonialRole) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role) 
        : [...prev, role]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, cycle, roles: selectedRoles, message });
    setSubmitted(true);
    setTimeout(() => {
        onClose();
        // Reset form after closing animation
        setTimeout(() => {
            setName('');
            setCycle('');
            setMessage('');
            setSelectedRoles([]);
            setSubmitted(false);
        }, 300)
    }, 3000);
  };

  const inputStyles = "w-full bg-[var(--color-darkest)]/50 border-2 border-[var(--color-light)]/20 rounded-lg p-4 text-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-lightest)] transition-all duration-300";

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--color-dark)]/50 backdrop-blur-xl border border-[var(--color-light)]/20 rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Cerrar modal"
          data-interactive="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-12">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
            Comparte tu Viaje
            </h2>
            <p className="max-w-2xl mx-auto text-xl lg:text-2xl text-slate-200 leading-relaxed">
            Tu historia puede ser el faro que guíe a otros de regreso a casa.
            </p>
        </div>

        {submitted ? (
          <div className="text-center bg-[var(--color-dark)]/30 border-2 border-[var(--color-lightest)] rounded-lg p-8 text-2xl text-[var(--color-lightest)]">
            <p>¡Gracias por compartir tu voz! Tu testimonio ha sido recibido.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-lg text-slate-300 mb-2">Tu Nombre</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputStyles} placeholder="Ej: Ana García" required />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="cycle" className="block text-lg text-slate-300 mb-2">Tu Camada</label>
              <input type="text" id="cycle" value={cycle} onChange={(e) => setCycle(e.target.value)} className={inputStyles} placeholder="Ej: Ciclo 2023, PL 27" required />
            </div>

            <div className="md:col-span-2">
                 <label className="block text-lg text-slate-300 mb-3">Tu Rol (puedes elegir varios)</label>
                 <div className="flex flex-wrap gap-4">
                    {ROLES_OPTIONS.map((role) => (
                        <div key={role} className="flex items-center">
                            <input 
                                type="checkbox" 
                                id={`role-${role}`} 
                                name="role" 
                                value={role}
                                checked={selectedRoles.includes(role)}
                                onChange={() => handleRoleChange(role)}
                                className="hidden peer"
                            />
                            <label htmlFor={`role-${role}`} className="px-5 py-2 text-lg border-2 border-[var(--color-light)]/20 rounded-full cursor-pointer transition-colors peer-checked:bg-[var(--color-lightest)] peer-checked:text-[var(--color-darkest)] peer-checked:border-[var(--color-lightest)] hover:border-[var(--color-light)]" data-interactive="true">
                                {role}
                            </label>
                        </div>
                    ))}
                 </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg text-slate-300 mb-2">Tu Experiencia</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputStyles} h-40`} placeholder="Comparte tu historia..." required></textarea>
            </div>
            <div className="md:col-span-2">
                <label className="block text-lg text-slate-300 mb-2">Sube una foto (Opcional)</label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-[var(--color-light)]/30 border-dashed rounded-lg cursor-pointer bg-[var(--color-darkest)]/50 hover:bg-[var(--color-dark)]/30 transition-colors" data-interactive="true">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <PhotoIcon className="w-10 h-10 mb-3 text-slate-400"/>
                            <p className="mb-2 text-lg text-slate-400"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                            <p className="text-sm text-slate-500">PNG, JPG (MAX. 5MB) - Próximamente</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" disabled />
                    </label>
                </div> 
            </div>
            <div className="md:col-span-2 text-center mt-6">
              <button type="submit" className="bg-[var(--color-medium)] text-white font-bold py-4 px-12 rounded-full text-xl hover:bg-[var(--color-light)] transition-all duration-300 transform hover:scale-105 shadow-lg" data-interactive="true">
                Enviar Mi Voz
              </button>
            </div>
          </form>
        )}

      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddTestimonial;
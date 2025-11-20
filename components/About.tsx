
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-800 mb-6">
          Más que un curso, una transformación.
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed mb-12">
          HOME no es un destino, es un camino de regreso a ti. Un espacio seguro para soltar lo que ya no sirve, conectar con tu verdad y construir desde un lugar de autenticidad. Te acompañamos en cada paso, en grupo, pero en un viaje profundamente personal.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-100/50 p-8 rounded-xl border border-slate-200/80 backdrop-blur-sm">
                <h3 className="font-serif text-2xl font-semibold text-sky-600 mb-3">Verte</h3>
                <p className="text-slate-600">Un espacio para la introspección, para mirarte sin juicios y reconocer tu punto de partida.</p>
            </div>
            <div className="bg-slate-100/50 p-8 rounded-xl border border-slate-200/80 backdrop-blur-sm">
                <h3 className="font-serif text-2xl font-semibold text-sky-600 mb-3">Romperte</h3>
                <p className="text-slate-600">Con valentía, confrontarás tus límites y creencias para abrir espacio a lo nuevo.</p>
            </div>
            <div className="bg-slate-100/50 p-8 rounded-xl border border-slate-200/80 backdrop-blur-sm">
                <h3 className="font-serif text-2xl font-semibold text-sky-600 mb-3">Renacer</h3>
                <p className="text-slate-600">Desde la vulnerabilidad, construirás una versión más fuerte y alineada de ti mismo.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
   

import React from 'react';
import StarIcon from './icons/StarIcon';

const Location: React.FC = () => {
  return (
    <section 
      id="location" 
      className="relative py-24 md:py-40 parallax-bg"
      style={{backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')"}}
    >
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Un lugar para encontrarte.
            </h2>
            <p className="text-xl text-slate-200 leading-loose mb-8">
              Nuestros encuentros se realizan en un espacio pensado para la calma y la introspección, aunque el verdadero lugar que explorarás será tu interior.
            </p>
            <div className="inline-block bg-white p-6 rounded-xl shadow-lg border">
              <p className="font-bold text-slate-800 text-xl">Sede Central HOME</p>
              <p className="text-slate-500">Bolívar 65, Buenos Aires</p>
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <span className="font-bold text-yellow-500 mr-2 text-lg">4.8</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-400" />)}
                </div>
                <span className="text-slate-500 ml-2">(Reseñas verificadas)</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl shadow-2xl overflow-hidden h-96 md:h-[600px] bg-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0167471663666!2d-58.3762363567464!3d-34.60853435694969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf768f9013%3A0xb0285525a162552e!2sBol%C3%ADvar%2065%2C%20C1066%20CABA!5e0!3m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de HOME Experience"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
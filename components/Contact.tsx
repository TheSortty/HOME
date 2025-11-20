
import React from 'react';
import SparkleIcon from './icons/SparkleIcon';

const Contact: React.FC = () => {
  return (
    <section 
      id="contact" 
      className="py-24 md:py-40"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left relative">
              <SparkleIcon className="absolute -top-12 left-0 h-10 w-10 text-[var(--color-light)]/30 transform -rotate-12 hidden md:block" />
              <h2 className="font-serif text-6xl md:text-8xl font-bold text-white mb-6">
                Tu Punto de Partida
              </h2>
              <p className="text-2xl lg:text-3xl text-slate-200 leading-relaxed mb-10">
                El verdadero lugar que explorarás será tu interior, pero este es nuestro punto de encuentro. Si tienes preguntas, estamos aquí para ayudarte a dar el primer paso.
              </p>
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[var(--color-lightest)] mb-2">Sede Central</h3>
                <p className="text-slate-300">Av. de Mayo 689</p>
                <p className="text-slate-300">Buenos Aires, Argentina</p>
              </div>
              <a href="mailto:hola@home.com" className="inline-block bg-[var(--color-medium)] text-white font-bold py-5 px-14 rounded-full text-2xl hover:bg-[var(--color-light)] transition-all duration-300 transform hover:scale-105 shadow-lg" data-interactive="true">
                  Enviar un Email
              </a>
            </div>
            <div className="rounded-xl shadow-2xl overflow-hidden h-96 md:h-[500px] border-2 border-[var(--color-light)]/20 bg-white" data-interactive="true">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0167471663666!2d-58.376194!3d-34.608532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf768f9013%3A0xb0285525a162552e!2sAv.+de+Mayo+689%2C+C1084+Cdad.+Aut%C3%B3noma+de+Buenos+Aires!5e0!3m2!1ses!2sar"
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

export default Contact;
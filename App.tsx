import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import WhatWeDo from './components/WhatWeDo';
import Testimonials from './components/Testimonials';
import Packages from './components/Packages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EasterEgg from './components/EasterEgg';
import EasterEggConfio from './components/EasterEggConfio';
import CustomCursor from './components/CustomCursor';
import AddTestimonial from './components/AddTestimonial';
import TestimonialModal from './components/TestimonialModal';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { Testimonial } from './types';

type ViewState = 'landing' | 'login' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showConfioEasterEgg, setShowConfioEasterEgg] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);

  const handleTestimonialClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const handleCloseModal = () => {
    setSelectedTestimonial(null);
  };

  // Admin Authentication Handlers
  const handleLoginClick = () => setCurrentView('login');
  const handleLoginSuccess = () => setCurrentView('dashboard');
  const handleBackToHome = () => setCurrentView('landing');
  const handleLogout = () => setCurrentView('landing');

  // Helper to determine if we are in an admin-related view
  const isAdminView = currentView === 'login' || currentView === 'dashboard';

  if (currentView === 'login') {
    return (
      <>
        <CustomCursor isAdmin={true} />
        <Login onLoginSuccess={handleLoginSuccess} onBack={handleBackToHome} />
      </>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <>
        <CustomCursor isAdmin={true} />
        <AdminDashboard onLogout={handleLogout} />
      </>
    );
  }

  return (
    <div 
      className="relative font-sans text-[var(--color-text-light)] antialiased parallax-bg"
      style={{backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')"}}
    >
      <CustomCursor isAdmin={false} />
      <div className="absolute inset-0 bg-[var(--color-darkest)]/80"></div>
      <div className="relative z-10">
        <Header onLoginClick={handleLoginClick} />
        <main>
          <Hero />
          <WhoWeAre onConfioClick={() => setShowConfioEasterEgg(true)} />
          <WhatWeDo />
          <Testimonials onTestimonialClick={handleTestimonialClick} onAddTestimonialClick={() => setShowAddTestimonialModal(true)} />
          <Packages />
          <Contact />
        </main>
        <Footer onEasterEggClick={() => setShowEasterEgg(true)} />
        <EasterEgg isVisible={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
        <EasterEggConfio isVisible={showConfioEasterEgg} onClose={() => setShowConfioEasterEgg(false)} />
        <TestimonialModal testimonial={selectedTestimonial} onClose={handleCloseModal} />
        <AddTestimonial isVisible={showAddTestimonialModal} onClose={() => setShowAddTestimonialModal(false)} />
      </div>
    </div>
  );
};

export default App;
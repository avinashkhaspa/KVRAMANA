import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Menu, X, ChevronRight, Star, Mail, Calendar } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xpqjypkv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-herbal-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="font-serif text-2xl font-bold text-herbal-800">Dr. K.V. Ramana</span>
              <span className="ml-2 text-xs font-semibold bg-herbal-100 text-herbal-700 px-2 py-1 rounded-full tracking-wider">M.D[Hom]</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Services', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-stone-600 hover:text-herbal-600 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-herbal-600 text-white px-5 py-2 rounded-full hover:bg-herbal-700 transition-colors shadow-md hover:shadow-lg"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-stone-600 hover:text-herbal-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'About', 'Services', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-stone-600 hover:text-herbal-600 hover:bg-herbal-50 rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-herbal-600 font-semibold tracking-wider uppercase text-sm">Sri Ramana Homeo Clinic</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold text-herbal-900 leading-tight">
              Natural Care for <br/>
              <span className="italic text-herbal-600">Better Living</span>
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-lg">
              Experience the gentle power of homeopathy with Dr. K.V. Ramana. 
              Specializing in chronic ailments, allergies, and lifestyle disorders.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-herbal-600 text-white px-8 py-3.5 rounded-full hover:bg-herbal-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Book Consultation <ChevronRight size={18} className="ml-2" />
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-white text-herbal-800 border border-herbal-200 px-8 py-3.5 rounded-full hover:bg-herbal-50 transition-all flex items-center justify-center"
              >
                Our Treatments
              </button>
            </div>
            <div className="mt-10 flex items-center gap-8 text-stone-500 text-sm">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-current" size={16} />
                <span>Experienced Specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-herbal-500"></div>
                <span>MD (Homeo)</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-herbal-200 rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
               <img 
                 src="/doctor.jpg" 
                 alt="Dr. K.V. Ramana" 
                 className="w-full h-auto object-cover"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                 <p className="font-serif text-xl">Dr. K.V. Ramana</p>
                 <p className="text-sm opacity-90">MD (Homeo)</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-herbal-900 mb-6">About Dr. K.V. Ramana</motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-herbal-500 mx-auto mb-8 rounded-full"></motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-stone-600 leading-relaxed mb-8">
              Dr. K.V. Ramana, MD (Homeo), is a dedicated homeopathic practitioner committed to providing holistic healthcare. 
              At Sri Ramana Homeo Clinic, we focus on treating the individual as a whole, addressing the root cause of the disease rather than just the symptoms.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-stone-600 leading-relaxed">
              With extensive experience in treating chronic and acute conditions, Dr. Ramana ensures that every patient receives personalized care tailored to their specific needs.
            </motion.p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Education", desc: "M.D. in Homeopathy, with deep knowledge of constitutional medicine." },
              { title: "Philosophy", desc: "Holistic healing that is safe, effective, and without side effects." },
              { title: "Availability", desc: "Available daily for consultations to ensure continuous care for patients." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-herbal-50 p-8 rounded-xl border border-herbal-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-herbal-800 mb-3">{item.title}</h3>
                <p className="text-stone-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-herbal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-herbal-900 mb-4">Our Treatments</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Specialized homeopathic treatments for a wide range of health conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Gastric Problems", "Hair Falling", "Bronchial Asthma",
              "Prostate Problems", "Piles & Fistula", "B.P. & Diabetes",
              "Skin Problems", "Kidney Stones", "Infertility"
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-herbal-100 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-herbal-100 flex items-center justify-center text-herbal-600 group-hover:bg-herbal-600 group-hover:text-white transition-colors">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                <span className="font-medium text-lg text-stone-700">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-herbal-900 text-center mb-16">Patient Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "S. Rao",
                text: "I was suffering from chronic sinusitis for years. Dr. Ramana's treatment worked wonders where antibiotics failed. Highly recommended!",
                tag: "Sinusitis Treatment"
              },
              {
                name: "Priya M.",
                text: "Dr. Ramana is very patient and listens to every detail. My daughter's skin allergy has completely cleared up thanks to his medicines.",
                tag: "Pediatric Skin Care"
              }
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-warm-white p-8 rounded-2xl border border-herbal-100 relative"
              >
                <div className="text-herbal-300 absolute top-6 right-8 text-6xl font-serif opacity-20">"</div>
                <p className="text-stone-600 italic mb-6 relative z-10">{t.text}</p>
                <div>
                  <h4 className="font-bold text-herbal-900">{t.name}</h4>
                  <span className="text-xs font-semibold text-herbal-500 uppercase tracking-wide">{t.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-herbal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Clinic</h2>
              <p className="text-herbal-200 mb-8 max-w-md">
                Sri Ramana Homeo Clinic & Sri Balaji Homeo Hall
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-herbal-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Address</h4>
                    <p className="text-herbal-100">Jeeyar Complex, Shop No. 29,<br/>Vizianagaram</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-herbal-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-herbal-100">+91 95154 15906</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-herbal-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Clinic Hours</h4>
                    <p className="text-herbal-100">Mon - Sat: 10:00 AM - 2:00 PM, 5:00 PM - 9:00 PM</p>
                    <p className="text-herbal-100">Sunday: 10:00 AM - 2:00 PM (Evening Holiday)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-stone-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-herbal-900 mb-6">Book an Appointment</h3>
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h4 className="font-bold text-lg mb-1">Request Sent!</h4>
                  <p className="text-sm">Thank you for booking. We will contact you shortly to confirm your appointment.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-4 text-sm text-green-700 font-medium hover:underline"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Full Name</label>
                    <input required name="name" type="text" className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-herbal-500 focus:ring-2 focus:ring-herbal-200 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1">Phone Number</label>
                      <input required name="phone" type="tel" className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-herbal-500 focus:ring-2 focus:ring-herbal-200 outline-none transition-all" placeholder="+91..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1">Preferred Date</label>
                      <div className="relative">
                        <input required name="date" type="date" className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-herbal-500 focus:ring-2 focus:ring-herbal-200 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Reason for Visit</label>
                    <textarea required name="message" rows={3} className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-herbal-500 focus:ring-2 focus:ring-herbal-200 outline-none transition-all" placeholder="Briefly describe your symptoms..."></textarea>
                  </div>
                  
                  {formStatus === 'error' && (
                    <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
                      Something went wrong. Please try again or call us directly.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-herbal-600 text-white font-bold py-3 rounded-lg hover:bg-herbal-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Request Appointment'}
                  </button>
                  <p className="text-xs text-center text-stone-400 mt-2">
                    We will confirm your appointment via phone call.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-herbal-950 text-herbal-300 py-8 border-t border-herbal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-serif text-xl font-bold text-white">Dr. K.V. Ramana</span>
            <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

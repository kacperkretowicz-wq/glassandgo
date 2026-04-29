import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ShieldCheck, X, Smartphone, Check, Droplets, EyeOff, Maximize, Award } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAddonSelected, setIsAddonSelected] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('Classic (99 PLN)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Zmiana fontów na nowoczesne, bezszeryfowe kroje: Outfit (nagłówki) i Inter (tekst)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (pkg = 'Classic (99 PLN)') => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsAddonSelected(false);
      setIsSubmitted(false);
      setIsSubmitting(false);
    }, 300);
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget);
  
  const data = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      device: formData.get('Urządzenie'),
      package: selectedPackage,
      phone: formData.get('Telefon'),
      address: formData.get('Adres'),
      date: formData.get('Dzień'),
      time: formData.get('Godzina'),
      addon: isAddonSelected ? "TAK (+59 PLN)" : "NIE"
    }
  };

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      setIsSubmitted(true);
    } else {
      const errorText = await response.text();
      alert(`Błąd EmailJS: ${errorText}`);
    }
  } catch (error) {
    console.error(error);
    alert("Błąd połączenia. Sprawdź swój internet i spróbuj ponownie.");
  } finally {
    setIsSubmitting(false);
  }
};
}

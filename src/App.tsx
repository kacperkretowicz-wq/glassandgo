import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ShieldCheck, ChevronRight, X, Smartphone, Check, Droplets, EyeOff, Maximize, Award } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Pobranie danych z formularza
    const formData = new FormData(e.target);
    
    // ==========================================
    // KONFIGURACJA EMAILJS
    // ==========================================
    const SERVICE_ID = "service_f5ml9gh";   
    const TEMPLATE_ID = "template_1w6an8f"; 
    const PUBLIC_KEY = "xO7V8fK_HTEd7vcL4";   
    
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
      // Bezpośrednie wysłanie do API EmailJS
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
        alert(`Błąd EmailJS: Prawdopodobnie podałeś złe klucze. Sprawdź konsolę.`);
        console.error("Błąd EmailJS:", errorText);
      }
    } catch (error) {
      console.error(error);
      alert("Błąd połączenia. Sprawdź swój internet i spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-['Inter',sans-serif] selection:bg-[#0A0A0A] selection:text-white overflow-x-hidden">
      
      {/* NOWOCZESNY NAVBAR */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0A0A0A] rounded-md flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <span className="font-['Outfit',sans-serif] text-xl font-bold tracking-tight">GLASS & GO</span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#korzysci" className="hover:text-[#0A0A0A] transition-colors">Korzyści</a>
            <a href="#technologia" className="hover:text-[#0A0A0A] transition-colors">Technologia</a>
            <a href="#cennik" className="hover:text-[#0A0A0A] transition-colors">Cennik</a>
            <a href="#jak-to-dziala" className="hover:text-[#0A0A0A] transition-colors">Jak to działa</a>
            <a href="#kontakt" className="hover:text-[#0A0A0A] transition-colors">Kontakt</a>
          </nav>

          <button 
            onClick={() => openModal()}
            className="bg-[#0A0A0A] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg shadow-black/10"
          >
            Zamów dojazd
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION - BEZPOŚREDNI KOMUNIKAT */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-semibold text-gray-800 mb-6">
                <MapPin className="w-3.5 h-3.5" /> Działamy na terenie Wrocławia
              </div>
              
              <h1 className="font-['Outfit',sans-serif] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight mb-6">
                Rozbita szybka? <br />
                <span className="text-gray-400">My przyjeżdżamy.</span>
              </h1>
              
              <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                Ty pracujesz lub odpoczywasz, my zabezpieczamy Twój ekran w 10 minut. Gdziekolwiek jesteś.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => openModal()}
                  className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors shadow-xl shadow-black/15"
                >
                  Zamów usługę
                </button>
                <a 
                  href="#cennik"
                  className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-[#0A0A0A] px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Zobacz pakiety
                </a>
              </div>

              <div className="mt-12 flex items-center gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Brak przedpłat
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Szkła 9H
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white rounded-[2rem] transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://i.imgur.com/TC4bXc8.jpg" 
                alt="Czerwony iPhone 16 Pro z potrójnym aparatem" 
                className="w-full h-auto aspect-[4/5] object-cover rounded-[2rem] shadow-2xl shadow-black/10"
              />
            </div>

          </div>
        </section>

        {/* LOGO BAR (TRUST SIGNALS) */}
        <section className="border-y border-gray-100 bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Wspieramy najpopularniejsze modele</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale font-['Outfit',sans-serif] font-bold text-xl md:text-2xl text-gray-800">
              <span>Apple iPhone</span>
              <span>Samsung Galaxy</span>
              <span>Google Pixel</span>
              <span>Xiaomi</span>
              <span>Huawei</span>
              <span>Motorola</span>
            </div>
          </div>
        </section>

        {/* BENEFITS / KORZYŚCI */}
        <section id="korzysci" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit',sans-serif] text-4xl md:text-5xl font-bold mb-4">Serwis, który dostosowuje się do Ciebie.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Koniec z szukaniem punktów naprawczych i traceniem czasu w kolejkach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#0A0A0A]" />
              </div>
              <h3 className="font-['Outfit',sans-serif] text-2xl font-bold mb-3">Oszczędność czasu</h3>
              <p className="text-gray-600 leading-relaxed">
                Przyjeżdżamy do biura podczas Twojego spotkania lub do domu, gdy relaksujesz się na kanapie. Montaż trwa dosłownie kilka minut.
              </p>
            </div>

            <div className="bg-[#0A0A0A] text-white rounded-3xl p-10 shadow-xl transform md:-translate-y-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-['Outfit',sans-serif] text-2xl font-bold mb-3">Jakość Premium</h3>
              <p className="text-gray-300 leading-relaxed">
                Używamy wyłącznie hartowanych szkieł 9H z zaawansowaną powłoką oleofobową. Zero pęcherzyków powietrza, perfekcyjne spasowanie.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-[#0A0A0A]" />
              </div>
              <h3 className="font-['Outfit',sans-serif] text-2xl font-bold mb-3">Zasięg we Wrocławiu</h3>
              <p className="text-gray-600 leading-relaxed">
                Obsługujemy całe miasto. Niezależnie czy jesteś na Rynku, Krzykach, Biskupinie czy Psim Polu – dojazd masz w cenie usługi.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY / CHARAKTERYSTYKA SZKIEŁ */}
        <section id="technologia" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-['Outfit',sans-serif] text-4xl md:text-5xl font-bold mb-6">Anatomia ochrony.</h2>
              <p className="text-gray-500 text-lg mb-10">Stosujemy wyłącznie bezkompromisowe materiały. Zobacz, z jakich warstw składa się szkło, które instalujemy na Twoim urządzeniu.</p>
              
              <div className="space-y-8">
                {/* Gwarancja - Wyróżniona */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center shrink-0 border border-gray-800 shadow-md">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit',sans-serif] font-bold text-xl mb-1 text-gray-900">Bezwarunkowa Gwarancja</h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">Udzielamy 3-miesięcznej gwarancji na powstawanie pęcherzyków powietrza oraz odklejanie się krawędzi. W przypadku wystąpienia któregokolwiek z tych problemów, bezwarunkowo wymieniamy szkło na nowe w ramach darmowej poprawki.</p>
                  </div>
                </div>

                {/* Cechy */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                    <ShieldCheck className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit',sans-serif] font-bold text-xl mb-1">Twardość 9H i Anti-Shatter</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Pancerna odporność. Specjalna folia laminująca (anti-shatter) sprawia, że w przypadku stłuczenia szkło nie rozpada się na ostre kawałki, chroniąc dłonie i oryginalny ekran.</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                    <Droplets className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit',sans-serif] font-bold text-xl mb-1">Powłoka Oleofobowa Premium</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Warstwa odpychająca tłuszcz najwyższej jakości. Wytrzymuje minimum 1000–2000 cykli przetarcia palcem, gwarantując gładki poślizg i brak uciążliwych smug.</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                    <Maximize className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit',sans-serif] font-bold text-xl mb-1">0,3 mm Edge-to-Edge</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Zaledwie 0,3 mm grubości. Precyzyjne wycięcia typu edge-to-edge i zaokrąglone krawędzie sprawiają, że ochrona staje się praktycznie niewidoczna po instalacji.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                    <EyeOff className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit',sans-serif] font-bold text-xl mb-1">Opcje Privacy i Matte</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">W pakiecie Privacy wbudowana warstwa całkowicie zaciemnia ekran przed wzrokiem osób obok (niezależnie od kąta). Pakiet Matte z powłoką antyrefleksyjną idealnie sprawdza się w mocnym świetle.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wizualizacja Warstw 3D (Odwrócona logika: złączone -> rozdzielone po najechaniu) */}
            <div className="w-full lg:w-1/2 flex justify-center mt-16 lg:mt-0">
              <div className="relative w-full max-w-lg h-[500px] md:h-[700px] bg-gray-50/50 rounded-[2.5rem] overflow-visible flex items-center justify-center perspective-[2000px] group border border-gray-100 shadow-inner cursor-crosshair">
                
                {/* Kontener utrzymujący stały kąt 3D */}
                <div className="relative w-[160px] h-[320px] sm:w-[220px] sm:h-[440px] transform scale-90 sm:scale-100 rotate-[30deg] rotate-x-[45deg] rotate-y-[-15deg] transition-transform duration-1000 ease-out group-hover:scale-100 sm:group-hover:scale-105">
                  
                  {/* Baza telefonu */}
                  <div className="absolute inset-0 bg-[#111] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-[4px] sm:border-[6px] border-gray-800 flex flex-col items-center pt-3 sm:pt-4 overflow-hidden z-10 transition-shadow duration-1000 group-hover:shadow-[0_40px_60px_rgba(0,0,0,0.3)]">
                    {/* Atrapa głośnika / Dynamic Island */}
                    <div className="w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full mb-auto z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50"></div>
                    {/* Ekran */}
                    <div className="absolute top-2 bottom-2 left-2 right-2 bg-black rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-gray-800">
                       <div className="w-full h-full bg-gradient-to-b from-blue-900/40 to-black"></div>
                    </div>
                  </div>

                  {/* 1. Folia laminująca (Anti-shatter) */}
                  <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] flex items-end justify-center pb-8 sm:pb-12 transition-all duration-1000 ease-out z-20 
                                  bg-transparent border-transparent shadow-none transform translate-y-0 translate-x-0
                                  group-hover:bg-blue-400/20 group-hover:backdrop-blur-[2px] group-hover:border-2 group-hover:border-blue-400/50 group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] 
                                  group-hover:-translate-y-12 group-hover:translate-x-8 sm:group-hover:-translate-y-20 sm:group-hover:translate-x-12">
                    <span className="text-[10px] sm:text-xs font-bold text-blue-700 uppercase tracking-widest bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg transition-opacity duration-700 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      1. Anti-shatter
                    </span>
                  </div>

                  {/* 2. Szkło 9H Edge-to-edge */}
                  <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center transition-all duration-1000 ease-out z-30 
                                  bg-transparent border-transparent shadow-none transform translate-y-0 translate-x-0
                                  group-hover:bg-white/30 group-hover:backdrop-blur-md group-hover:border-2 group-hover:border-white/90 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] 
                                  group-hover:-translate-y-24 group-hover:translate-x-16 sm:group-hover:-translate-y-40 sm:group-hover:translate-x-24">
                    <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-widest bg-white shadow-xl px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-opacity duration-700 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      2. Szkło 9H (0.3mm)
                    </span>
                  </div>

                  {/* 3. Powłoka Oleofobowa / Funkcyjna */}
                  <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] flex items-start justify-center pt-8 sm:pt-12 transition-all duration-1000 ease-out z-40 
                                  bg-transparent border-transparent shadow-none transform translate-y-0 translate-x-0
                                  group-hover:bg-purple-400/20 group-hover:backdrop-blur-[2px] group-hover:border-2 group-hover:border-purple-400/50 group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)] 
                                  group-hover:-translate-y-36 group-hover:translate-x-24 sm:group-hover:-translate-y-60 sm:group-hover:translate-x-36">
                    <span className="text-[10px] sm:text-xs font-bold text-purple-700 uppercase tracking-widest bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg transition-opacity duration-700 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      3. Oleofobowa
                    </span>
                  </div>

                </div>

                <div className="absolute bottom-6 left-0 w-full flex items-center justify-center gap-3 text-sm text-gray-500 font-medium tracking-wide">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] animate-pulse"></span>
                  Najedź myszką, aby zobaczyć warstwy
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FULL WIDTH LIFESTYLE BANNER */}
        <section className="w-full h-[500px] relative">
          <img 
            src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2000&auto=format&fit=crop" 
            alt="Praca w kawiarni" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h2 className="font-['Outfit',sans-serif] text-4xl md:text-6xl font-bold mb-6">Nie przerywaj swojego dnia.</h2>
              <p className="text-lg md:text-xl font-light">My zajmiemy się ekranem, Ty swoimi sprawami.</p>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="cennik" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit',sans-serif] text-4xl md:text-5xl font-bold mb-4">Przejrzyste pakiety.</h2>
            <p className="text-gray-500 text-lg">Cena zawiera: wybrane szkło, profesjonalny montaż oraz dojazd pod wskazany adres.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pakiet 1 */}
            <div className="border border-gray-200 rounded-[2rem] p-8 flex flex-col bg-white">
              <h3 className="font-['Outfit',sans-serif] text-2xl font-bold mb-2">Classic</h3>
              <p className="text-gray-500 text-sm mb-8 h-10">Idealna przejrzystość i bazowa ochrona przed zarysowaniami.</p>
              <div className="flex items-end gap-2 mb-8">
                <span className="font-['Outfit',sans-serif] text-5xl font-bold">99</span>
                <span className="text-gray-500 font-medium mb-1">PLN</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Szkło hartowane 6D</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Twardość 9H</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Dojazd w cenie</li>
                <li className="flex items-start gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A] shrink-0" /> <span>Gwarancja na pęcherzyki i odklejanie - 3 miesiące</span></li>
              </ul>
              <button onClick={() => openModal('Classic (99 PLN)')} className="w-full py-4 rounded-xl font-bold text-[#0A0A0A] bg-gray-100 hover:bg-gray-200 transition-colors">Wybieram</button>
            </div>

            {/* Pakiet 2 - Wyróżniony */}
            <div className="border-2 border-[#0A0A0A] rounded-[2rem] p-8 flex flex-col bg-white relative shadow-2xl shadow-black/5 transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                Najpopularniejszy
              </div>
              <h3 className="font-['Outfit',sans-serif] text-2xl font-bold mb-2">Privacy Shield</h3>
              <p className="text-gray-500 text-sm mb-8 h-10">Ochrona ekranu oraz Twojej prywatności w miejscach publicznych.</p>
              <div className="flex items-end gap-2 mb-8">
                <span className="font-['Outfit',sans-serif] text-5xl font-bold">119</span>
                <span className="text-gray-500 font-medium mb-1">PLN</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Filtr prywatyzujący 360°</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Szkło hartowane 9H</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Dojazd w cenie</li>
                <li className="flex items-start gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A] shrink-0" /> <span>Gwarancja na pęcherzyki i odklejanie -  3 miesiące</span></li>
              </ul>
              <button onClick={() => openModal('Privacy Shield (119 PLN)')} className="w-full py-4 rounded-xl font-bold text-white bg-[#0A0A0A] hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">Wybieram</button>
            </div>

            {/* Pakiet 3 */}
            <div className="border border-gray-200 rounded-[2rem] p-8 flex flex-col bg-white">
              <h3 className="font-['Outfit',sans-serif] text-2xl font-bold mb-2">Matte Pro</h3>
              <p className="text-gray-500 text-sm mb-8 h-10">Brak odblasków słonecznych i mniej odcisków palców.</p>
              <div className="flex items-end gap-2 mb-8">
                <span className="font-['Outfit',sans-serif] text-5xl font-bold">109</span>
                <span className="text-gray-500 font-medium mb-1">PLN</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Powłoka antyrefleksyjna</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Szkło hartowane 9H</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A]" /> Dojazd w cenie</li>
                <li className="flex items-start gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#0A0A0A] shrink-0" /> <span>Gwarancja na pęcherzyki i odklejanie - 3 miesiące</span></li>
              </ul>
              <button onClick={() => openModal('Matte Pro (109 PLN)')} className="w-full py-4 rounded-xl font-bold text-[#0A0A0A] bg-gray-100 hover:bg-gray-200 transition-colors">Wybieram</button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="jak-to-dziala" className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-['Outfit',sans-serif] text-4xl md:text-5xl font-bold mb-16 text-center">3 proste kroki.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Linia łącząca (tylko desktop) */}
              <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#0A0A0A] flex items-center justify-center font-['Outfit',sans-serif] text-2xl font-bold text-[#0A0A0A] mb-6 shadow-md">1</div>
                <h4 className="text-xl font-bold mb-3">Zgłoś potrzebę</h4>
                <p className="text-gray-500 leading-relaxed">Wybierasz model telefonu, rodzaj szkła i podajesz preferowany adres we Wrocławiu.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#0A0A0A] flex items-center justify-center font-['Outfit',sans-serif] text-2xl font-bold text-[#0A0A0A] mb-6 shadow-md">2</div>
                <h4 className="text-xl font-bold mb-3">Potwierdzamy termin</h4>
                <p className="text-gray-500 leading-relaxed">Oddzwaniamy w ciągu kilku minut, aby ustalić dokładną godzinę przyjazdu naszego technika.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center font-['Outfit',sans-serif] text-2xl font-bold text-white mb-6 shadow-md shadow-black/20">3</div>
                <h4 className="text-xl font-bold mb-3">Szybki montaż</h4>
                <p className="text-gray-500 leading-relaxed">Przyjeżdżamy na miejsce i w 5 minut aplikujemy idealnie spasowane szkło na Twój ekran.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="kontakt" className="bg-[#0A0A0A] text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-[#0A0A0A]" />
              </div>
              <span className="font-['Outfit',sans-serif] text-xl font-bold tracking-tight">GLASS & GO</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Profesjonalny mobilny serwis wymiany szkieł ochronnych. Działamy na terenie całego Wrocławia, oszczędzając Twój czas.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-['Outfit',sans-serif] text-lg">Nawigacja</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#korzysci" className="hover:text-white transition-colors">Korzyści</a></li>
              <li><a href="#cennik" className="hover:text-white transition-colors">Cennik</a></li>
              <li><a href="#jak-to-dziala" className="hover:text-white transition-colors">Jak to działa</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-['Outfit',sans-serif] text-lg">Kontakt</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="tel:+48500000000" className="hover:text-white transition-colors font-medium text-white">+48 571 798 397</a></li>
              <li><a href="mailto:kontakt@glassandgo.pl" className="hover:text-white transition-colors">kontakt@glassandgo.pl</a></li>
              <li className="pt-2">Wrocław, Polska</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Glass & Go. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Regulamin</a>
            <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
          </div>
        </div>
      </footer>

      {/* MODAL / FORMULARZ ZAMÓWIENIA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white w-full max-w-xl rounded-[2rem] p-6 sm:p-8 md:p-10 relative shadow-2xl z-10 animate-scale-in max-h-[95vh] overflow-y-auto scrollbar-hide">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-[#0A0A0A] bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {isSubmitted ? (
              <div className="text-center py-8 animate-scale-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-['Outfit',sans-serif] text-3xl font-bold mb-4 text-[#0A0A0A]">Zgłoszenie wysłane!</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Dziękujemy. Nasz ekspert skontaktuje się z Tobą w ciągu kilku minut na podany numer, w celu potwierdzenia wizyty.
                </p>
                <button 
                  onClick={closeModal} 
                  className="w-full bg-[#0A0A0A] text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/15"
                >
                  Zamknij okno
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-['Outfit',sans-serif] text-3xl font-bold mb-2 text-[#0A0A0A]">Zamów dojazd</h3>
                <p className="text-gray-500 text-sm mb-8">Wypełnij formularz. Oddzwonimy w ciągu kilku minut, aby potwierdzić szczegóły i czas dojazdu.</p>
                
                <form 
                  className="space-y-5" 
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Model urządzenia</label>
                    <input 
                      type="text" 
                      name="Urządzenie"
                      required
                      placeholder="np. iPhone 15 Pro" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Wybierz pakiet</label>
                    <select 
                      name="Wybrany_pakiet"
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Classic (99 PLN)">Classic (99 PLN)</option>
                      <option value="Privacy Shield (119 PLN)">Privacy Shield (119 PLN)</option>
                      <option value="Matte Pro (109 PLN)">Matte Pro (109 PLN)</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Numer telefonu</label>
                      <input 
                        type="tel" 
                        name="Telefon"
                        required
                        placeholder="Twój numer" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Adres dojazdu</label>
                      <input 
                        type="text" 
                        name="Adres"
                        required
                        placeholder="np. Krzyki, ul. Powstańców..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferowany dzień</label>
                      <input 
                        type="date"
                        name="Dzień"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferowana godzina</label>
                      <select 
                        defaultValue=""
                        name="Godzina"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Wybierz godzinę</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                        <option value="22:00">22:00</option>
                      </select>
                    </div>
                  </div>

                  {/* UPSELL: Akcesoria PREMIUM */}
                  <div 
                    className={`mt-4 p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${isAddonSelected ? 'border-[#0A0A0A] bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    onClick={() => setIsAddonSelected(!isAddonSelected)}
                  >
                    <div className="absolute top-0 right-0 bg-[#0A0A0A] text-white text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                      Polecane
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isAddonSelected ? 'border-[#0A0A0A] bg-[#0A0A0A]' : 'border-gray-300 bg-white'}`}>
                        <Check className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-white transition-opacity ${isAddonSelected ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                      <div className="flex-1 pr-6 sm:pr-12">
                        <h4 className="font-bold text-[#0A0A0A] mb-1 text-sm sm:text-base">Pakiet Kompleksowy <span className="text-gray-500 font-normal text-xs sm:text-sm ml-1">(+59 PLN)</span></h4>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">Dodaj dedykowane, transparentne etui ochronne oraz najwyższej jakości szkło hartowane na wyspę aparatów.</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-6 bg-[#0A0A0A] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-black/15 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : null}
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-4">
                    Płatność odbywa się dopiero po wykonaniu usługi (Przelew / BLIK).
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}

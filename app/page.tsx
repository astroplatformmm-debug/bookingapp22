// app/page.tsx
import Link from 'next/link';
import { Star, PhoneCall, ChevronRight, CheckCircle2, Users, Award, Zap, Flame } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#0a0a0f', color: 'white'}}>

      {/* URGENCY BAR */}
      <div style={{background: 'linear-gradient(to right, #d97706, #ea580c, #d97706)'}} className="text-white text-center py-2.5 text-sm font-semibold">
        <Flame className="w-4 h-4 inline mr-1.5" />
        सीमित स्लॉट बचे हैं — आज ही बुक करें और अपना भविष्य जानें!
        <Flame className="w-4 h-4 inline ml-1.5" />
      </div>

      {/* NAV */}
      <nav className="px-6 py-4 flex justify-between items-center" style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold" style={{background: 'linear-gradient(to bottom right, #fbbf24, #ea580c)'}}>ॐ</div>
          <div>
            <div className="font-bold text-white text-sm">OMKKAAR</div>
            <div className="text-xs" style={{color: '#fbbf24'}}>Astroworld</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+917069110573" className="hidden sm:flex items-center gap-1.5 text-sm transition-colors" style={{color: 'rgba(255,255,255,0.6)'}}>
            <PhoneCall className="w-3.5 h-3.5" />
            +91 70691 10573
          </a>
          <Link href="/book" className="font-bold px-5 py-2 rounded-full text-sm text-black" style={{backgroundColor: '#f59e0b'}}>
            अभी बुक करें
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-16 pb-20 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm mb-8" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <span style={{color: 'rgba(255,255,255,0.7)'}}>12,000+ लोगों ने अपना भविष्य जाना ⭐⭐⭐⭐⭐</span>
          </div>

          <h1 className="text-4xl font-black mb-6 leading-tight" style={{fontSize: 'clamp(2rem, 5vw, 3.5rem)'}}>
            क्या आपकी कुंडली में
            <br />
            <span style={{background: 'linear-gradient(to right, #fbbf24, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              छुपा है आपका भाग्य?
            </span>
          </h1>

          <p className="text-lg mb-4 max-w-xl mx-auto leading-relaxed" style={{color: 'rgba(255,255,255,0.6)'}}>
            25+ वर्षों के अनुभव के साथ <span className="text-white font-semibold">Pt. Mukesh Ravindra Gupta</span> आपकी कुंडली देखकर बताएंगे — प्रेम, करियर, विवाह और भविष्य का सच।
          </p>

          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="flex items-center gap-3">
              <span className="line-through text-xl" style={{color: 'rgba(255,255,255,0.3)'}}>₹999</span>
              <span className="font-black text-3xl px-4 py-1 rounded-lg text-black" style={{backgroundColor: '#f59e0b'}}>₹199</span>
              <span className="text-sm px-3 py-1 rounded-full font-semibold" style={{background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80'}}>80% OFF</span>
            </div>
            <Link href="/book" className="font-black text-xl px-10 py-5 rounded-2xl text-black flex items-center gap-3" style={{background: 'linear-gradient(to right, #f59e0b, #ea580c)', boxShadow: '0 10px 30px rgba(245,158,11,0.3)'}}>
              अपनी कुंडली अभी बुक करें
              <ChevronRight className="w-6 h-6" />
            </Link>
            <p className="text-sm flex items-center gap-2" style={{color: 'rgba(255,255,255,0.4)'}}>
              <CheckCircle2 className="w-4 h-4" style={{color: '#4ade80'}} />
              100% Secure Payment · Razorpay Protected
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section style={{borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)'}}>
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 gap-6" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
          {[
            { icon: <Users className="w-5 h-5" />, num: '12,000+', label: 'संतुष्ट ग्राहक' },
            { icon: <Award className="w-5 h-5" />, num: '25+ वर्ष', label: 'अनुभव' },
            { icon: <Star className="w-5 h-5" style={{fill: '#fbbf24', color: '#fbbf24'}} />, num: '4.9/5', label: 'औसत रेटिंग' },
            { icon: <Zap className="w-5 h-5" />, num: '24 घंटे', label: 'में रिपोर्ट' },
          ].map((s) => (
            <div key={s.num} className="text-center">
              <div className="flex justify-center mb-2" style={{color: '#fbbf24'}}>{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.num}</div>
              <div className="text-xs mt-0.5" style={{color: 'rgba(255,255,255,0.4)'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ASTROLOGER */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid gap-12 items-center" style={{gridTemplateColumns: '1fr 1fr'}}>
          <div className="flex justify-center">
            <img
              src="/mukesh.jpeg"
              alt="Pt. Mukesh Ravindra Gupta"
              className="rounded-3xl object-cover object-top"
              style={{width: '280px', height: '320px', border: '2px solid rgba(245,158,11,0.3)', boxShadow: '0 20px 60px rgba(245,158,11,0.1)'}}
            />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{color: '#fbbf24'}}>आपके ज्योतिषाचार्य</span>
            <h2 className="text-3xl font-black mt-2 mb-1 text-white">Pt. Mukesh Ravindra Gupta</h2>
            <p className="text-sm mb-5" style={{color: 'rgba(255,255,255,0.4)'}}>Certified Vedic Astrologer · Vadodara, Gujarat</p>
            <div className="space-y-3">
              {[
                'ISO 9001-2015 Certified Professional',
                'Trademark Certified Astrologer',
                '25+ वर्षों का वैदिक ज्योतिष अनुभव',
                'करियर, विवाह, व्यापार में विशेषज्ञता',
                '12,000+ सफल कुंडली परामर्श',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm" style={{color: 'rgba(255,255,255,0.7)'}}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{color: '#fbbf24'}} />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/book" className="inline-flex items-center gap-2 mt-8 font-semibold px-6 py-3 rounded-xl text-sm text-white" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
              Pt. Gupta से अभी बात करें <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-6 py-20" style={{background: 'linear-gradient(to bottom, rgba(245,158,11,0.05), transparent)'}}>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{color: '#fbbf24'}}>सिर्फ ₹199 में मिलेगा</span>
          <h2 className="text-3xl font-black mt-2 text-white">आपको क्या मिलेगा?</h2>
        </div>
        <div className="max-w-3xl mx-auto grid gap-4" style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
          {[
            { icon: '📋', title: 'विस्तृत कुंडली रिपोर्ट', desc: '20+ पेज की PDF रिपोर्ट — सभी 12 भावों का विश्लेषण' },
            { icon: '🎯', title: 'व्यक्तिगत परामर्श', desc: 'Pt. Gupta के साथ 1-on-1 सत्र — आपके सवालों के जवाब' },
            { icon: '⚡', title: '24 घंटे में डिलीवरी', desc: 'बुकिंग के 24 घंटे के भीतर रिपोर्ट और परामर्श' },
            { icon: '🔮', title: 'उपाय और समाधान', desc: 'ग्रह दोष, करियर, विवाह के लिए व्यावहारिक उपाय' },
            { icon: '💑', title: 'प्रेम और विवाह', desc: 'सही साथी, विवाह का शुभ समय और संबंध विश्लेषण' },
            { icon: '💰', title: 'धन और करियर', desc: 'व्यापार, नौकरी और आर्थिक स्थिति का भविष्य' },
          ].map((item) => (
            <div key={item.title} className="p-5 flex gap-4 rounded-2xl" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'}}>
              <div className="text-3xl flex-shrink-0">{item.icon}</div>
              <div>
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-xs leading-relaxed" style={{color: 'rgba(255,255,255,0.5)'}}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{color: '#fbbf24'}}>ग्राहकों की राय</span>
          <h2 className="text-3xl font-black mt-2 text-white">12,000+ लोगों ने बदली अपनी ज़िंदगी</h2>
        </div>
        <div className="grid gap-5" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
          {[
            { name: 'Priya Sharma', city: 'Ahmedabad', text: 'Pt. Gupta जी ने मेरी कुंडली देखकर सटीक भविष्यवाणी की। विवाह का जो समय बताया वो बिल्कुल सही निकला।' },
            { name: 'Rahul Patel', city: 'Surat', text: 'करियर में बहुत परेशानी थी। Pt. Gupta के उपाय करने के बाद नई नौकरी मिली। 100% genuine astrologer हैं।' },
            { name: 'Meera Joshi', city: 'Vadodara', text: 'बेटे की शादी नहीं हो रही थी। कुंडली मिलान और उपाय के बाद 3 महीने में शादी हो गई।' },
          ].map((t) => (
            <div key={t.name} className="p-6 rounded-2xl" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'}}>
              <div className="flex mb-3">{'⭐'.repeat(5)}</div>
              <p className="text-sm leading-relaxed mb-4" style={{color: 'rgba(255,255,255,0.6)'}}>"{t.text}"</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>{t.city}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-10 pb-32">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-white">अक्सर पूछे जाने वाले सवाल</h2>
        </div>
        <div className="space-y-3">
          {[
            { q: 'क्या ₹199 में सब कुछ मिलेगा?', a: 'हां — ₹199 में विस्तृत कुंडली रिपोर्ट और व्यक्तिगत परामर्श दोनों शामिल हैं।' },
            { q: 'कितने समय में रिपोर्ट मिलेगी?', a: 'बुकिंग के 24 घंटे के भीतर आपकी रिपोर्ट और परामर्श की व्यवस्था होगी।' },
            { q: 'Online consultation कैसे होगी?', a: 'बुकिंग के बाद आपको WhatsApp/Phone पर Pt. Gupta से जोड़ा जाएगा।' },
            { q: 'Payment secure है?', a: 'हां — Razorpay के माध्यम से 100% secure payment। UPI, Card, NetBanking सब accepted।' },
          ].map((faq) => (
            <div key={faq.q} className="p-5 rounded-xl" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'}}>
              <div className="font-semibold text-sm mb-2 text-white">{faq.q}</div>
              <div className="text-sm" style={{color: 'rgba(255,255,255,0.5)'}}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4" style={{background: 'linear-gradient(to top, #000, rgba(0,0,0,0.95), transparent)'}}>
        <div className="max-w-sm mx-auto">
          <Link href="/book" className="flex items-center justify-between px-6 py-4 rounded-2xl text-black font-black" style={{background: 'linear-gradient(to right, #f59e0b, #ea580c)', boxShadow: '0 10px 40px rgba(245,158,11,0.4)'}}>
            <div>
              <div className="text-base">कुंडली बुक करें</div>
              <div className="text-xs font-normal opacity-70">सिर्फ ₹199 · Limited Slots</div>
            </div>
            <div className="text-2xl font-black">₹199 →</div>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="px-6 py-8 text-center" style={{borderTop: '1px solid rgba(255,255,255,0.05)'}}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{background: 'linear-gradient(to bottom right, #fbbf24, #ea580c)'}}>ॐ</div>
          <span className="font-bold text-white">OMKKAAR Astroworld</span>
        </div>
        <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>22/FF, Emperor Building, Fatehgunj, Vadodara - 390002</p>
        <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.3)'}}>© 2026 Omkkaar Astroworld · All rights reserved</p>
      </footer>
    </div>
  );
}

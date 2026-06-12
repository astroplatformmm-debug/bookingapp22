// app/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a0f; color: white; font-family: Inter, system-ui, sans-serif; }
        .urgency { background: linear-gradient(to right, #d97706, #ea580c); color: white; text-align: center; padding: 10px; font-size: 14px; font-weight: 600; }
        .nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(to bottom right, #fbbf24, #ea580c); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; }
        .logo-name { font-weight: 700; font-size: 14px; }
        .logo-sub { color: #fbbf24; font-size: 12px; }
        .btn-book { background: #f59e0b; color: black; font-weight: 700; padding: 8px 20px; border-radius: 999px; font-size: 14px; text-decoration: none; }
        .btn-book:hover { background: #fbbf24; }
        .hero { padding: 64px 24px 80px; text-align: center; }
        .hero-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 999px; padding: 8px 16px; font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 32px; }
        .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.2; margin-bottom: 24px; font-family: Georgia, serif; }
        .hero-gradient { background: linear-gradient(to right, #fbbf24, #fb923c, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { font-size: 18px; color: rgba(255,255,255,0.6); max-width: 560px; margin: 0 auto 40px; line-height: 1.6; }
        .price-row { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px; }
        .price-old { text-decoration: line-through; color: rgba(255,255,255,0.3); font-size: 20px; }
        .price-new { background: #f59e0b; color: black; font-size: 32px; font-weight: 900; padding: 4px 16px; border-radius: 8px; }
        .price-badge { background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); color: #4ade80; font-size: 14px; padding: 4px 12px; border-radius: 999px; font-weight: 600; }
        .btn-cta { display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(to right, #f59e0b, #ea580c); color: black; font-weight: 900; font-size: 20px; padding: 20px 40px; border-radius: 16px; text-decoration: none; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(245,158,11,0.3); }
        .secure { color: rgba(255,255,255,0.4); font-size: 14px; }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding: 40px 24px; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); max-width: 900px; margin: 0 auto; }
        .stat { text-align: center; }
        .stat-num { font-size: 24px; font-weight: 900; color: white; }
        .stat-label { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; }
        .astro { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; max-width: 900px; margin: 0 auto; padding: 80px 24px; }
        .astro img { width: 280px; height: 320px; border-radius: 24px; object-fit: cover; object-position: top; border: 2px solid rgba(245,158,11,0.3); }
        .astro-tag { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #fbbf24; }
        .astro h2 { font-size: 30px; font-weight: 900; color: white; margin: 8px 0 4px; font-family: Georgia, serif; }
        .astro-sub { font-size: 14px; color: rgba(255,255,255,0.4); margin-bottom: 20px; }
        .check-item { display: flex; align-items: center; gap: 12px; font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 12px; }
        .check-icon { color: #fbbf24; font-size: 16px; }
        .btn-outline { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; font-weight: 600; padding: 12px 24px; border-radius: 12px; font-size: 14px; text-decoration: none; margin-top: 24px; }
        .features { padding: 80px 24px; background: linear-gradient(to bottom, rgba(245,158,11,0.05), transparent); }
        .features-title { text-align: center; margin-bottom: 48px; }
        .features-tag { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #fbbf24; }
        .features h2 { font-size: 30px; font-weight: 900; color: white; margin-top: 8px; font-family: Georgia, serif; }
        .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 750px; margin: 0 auto; }
        .feature-card { display: flex; gap: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; }
        .feature-icon { font-size: 30px; flex-shrink: 0; }
        .feature-title { font-weight: 700; color: white; font-size: 14px; margin-bottom: 4px; }
        .feature-desc { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.5; }
        .testimonials { max-width: 900px; margin: 0 auto; padding: 80px 24px; }
        .testimonials-title { text-align: center; margin-bottom: 48px; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .testimonial { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; }
        .testimonial-stars { font-size: 16px; margin-bottom: 12px; }
        .testimonial-text { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 16px; }
        .testimonial-name { font-weight: 600; color: white; font-size: 14px; }
        .testimonial-city { font-size: 12px; color: rgba(255,255,255,0.3); }
        .faq { max-width: 600px; margin: 0 auto; padding: 40px 24px 160px; }
        .faq h2 { font-size: 24px; font-weight: 900; color: white; text-align: center; margin-bottom: 40px; font-family: Georgia, serif; }
        .faq-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 12px; }
        .faq-q { font-weight: 600; color: white; font-size: 14px; margin-bottom: 8px; }
        .faq-a { font-size: 14px; color: rgba(255,255,255,0.5); }
        .sticky-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; padding: 16px; background: linear-gradient(to top, #000, rgba(0,0,0,0.95), transparent); }
        .sticky-inner { max-width: 400px; margin: 0 auto; }
        .sticky-btn { display: flex; align-items: center; justify-content: space-between; background: linear-gradient(to right, #f59e0b, #ea580c); color: black; font-weight: 900; padding: 16px 24px; border-radius: 16px; text-decoration: none; box-shadow: 0 10px 40px rgba(245,158,11,0.4); }
        .sticky-left-title { font-size: 16px; }
        .sticky-left-sub { font-size: 12px; font-weight: 400; opacity: 0.7; }
        .sticky-price { font-size: 24px; font-weight: 900; }
        .footer { border-top: 1px solid rgba(255,255,255,0.05); padding: 32px 24px; text-align: center; }
        .footer-logo { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px; }
        .footer-icon { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(to bottom right, #fbbf24, #ea580c); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
        .footer-name { font-weight: 700; color: white; }
        .footer-addr { font-size: 12px; color: rgba(255,255,255,0.3); }
        @media (max-width: 640px) {
          .stats { grid-template-columns: repeat(2, 1fr); }
          .astro { grid-template-columns: 1fr; }
          .astro img { width: 200px; height: 240px; margin: 0 auto; display: block; }
          .features-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="urgency">🔥 सीमित स्लॉट बचे हैं — आज ही बुक करें और अपना भविष्य जानें! 🔥</div>

      <nav className="nav">
        <div className="logo">
          <div className="logo-icon">ॐ</div>
          <div>
            <div className="logo-name">OMKKAAR</div>
            <div className="logo-sub">Astroworld</div>
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <a href="tel:+917069110573" style={{color:'rgba(255,255,255,0.6)', fontSize:'14px', textDecoration:'none', display:'flex', alignItems:'center', gap:'6px'}}>
            📞 +91 70691 10573
          </a>
          <Link href="/book" className="btn-book">अभी बुक करें</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-pill">12,000+ लोगों ने अपना भविष्य जाना ⭐⭐⭐⭐⭐</div>
        <h1>
          क्या आपकी कुंडली में<br />
          <span className="hero-gradient">छुपा है आपका भाग्य?</span>
        </h1>
        <p>25+ वर्षों के अनुभव के साथ <strong style={{color:'white'}}>Pt. Mukesh Ravindra Gupta</strong> आपकी कुंडली देखकर बताएंगे — प्रेम, करियर, विवाह और भविष्य का सच।</p>
        <div className="price-row">
          <span className="price-old">₹999</span>
          <span className="price-new">₹199</span>
          <span className="price-badge">80% OFF</span>
        </div>
        <div><Link href="/book" className="btn-cta">अपनी कुंडली अभी बुक करें →</Link></div>
        <div className="secure">✅ 100% Secure Payment · Razorpay Protected</div>
      </section>

      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div className="stats">
          {[['12,000+','संतुष्ट ग्राहक'],['25+ वर्ष','अनुभव'],['4.9/5','औसत रेटिंग'],['24 घंटे','में रिपोर्ट']].map(([num,label])=>(
            <div key={num} className="stat"><div className="stat-num">{num}</div><div className="stat-label">{label}</div></div>
          ))}
        </div>
      </div>

      <section className="astro">
        <div style={{display:'flex', justifyContent:'center'}}>
          <img src="/mukesh.jpeg" alt="Pt. Mukesh Ravindra Gupta" style={{width:'280px',height:'320px',borderRadius:'24px',objectFit:'cover',objectPosition:'top',border:'2px solid rgba(245,158,11,0.3)'}} />
        </div>
        <div>
          <div className="astro-tag">आपके ज्योतिषाचार्य</div>
          <h2>Pt. Mukesh Ravindra Gupta</h2>
          <div className="astro-sub">Certified Vedic Astrologer · Vadodara, Gujarat</div>
          {['ISO 9001-2015 Certified Professional','Trademark Certified Astrologer','25+ वर्षों का वैदिक ज्योतिष अनुभव','करियर, विवाह, व्यापार में विशेषज्ञता','12,000+ सफल कुंडली परामर्श'].map(item=>(
            <div key={item} className="check-item"><span className="check-icon">✓</span>{item}</div>
          ))}
          <Link href="/book" className="btn-outline">Pt. Gupta से अभी बात करें →</Link>
        </div>
      </section>

      <section className="features">
        <div className="features-title">
          <div className="features-tag">सिर्फ ₹199 में मिलेगा</div>
          <h2>आपको क्या मिलेगा?</h2>
        </div>
        <div className="features-grid">
          {[
            ['📋','विस्तृत कुंडली रिपोर्ट','20+ पेज की PDF रिपोर्ट — सभी 12 भावों का विश्लेषण'],
            ['🎯','व्यक्तिगत परामर्श','Pt. Gupta के साथ 1-on-1 सत्र — आपके सवालों के जवाब'],
            ['⚡','24 घंटे में डिलीवरी','बुकिंग के 24 घंटे के भीतर रिपोर्ट और परामर्श'],
            ['🔮','उपाय और समाधान','ग्रह दोष, करियर, विवाह के लिए व्यावहारिक उपाय'],
            ['💑','प्रेम और विवाह','सही साथी, विवाह का शुभ समय और संबंध विश्लेषण'],
            ['💰','धन और करियर','व्यापार, नौकरी और आर्थिक स्थिति का भविष्य'],
          ].map(([icon,title,desc])=>(
            <div key={title} className="feature-card">
              <div className="feature-icon">{icon}</div>
              <div><div className="feature-title">{title}</div><div className="feature-desc">{desc}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonials-title">
          <div className="features-tag">ग्राहकों की राय</div>
          <h2 style={{fontSize:'30px',fontWeight:900,color:'white',marginTop:'8px',fontFamily:'Georgia,serif'}}>12,000+ लोगों ने बदली अपनी ज़िंदगी</h2>
        </div>
        <div className="testimonials-grid">
          {[
            ['Priya Sharma','Ahmedabad','Pt. Gupta जी ने मेरी कुंडली देखकर सटीक भविष्यवाणी की। विवाह का जो समय बताया वो बिल्कुल सही निकला।'],
            ['Rahul Patel','Surat','करियर में बहुत परेशानी थी। Pt. Gupta के उपाय करने के बाद नई नौकरी मिली। 100% genuine astrologer हैं।'],
            ['Meera Joshi','Vadodara','बेटे की शादी नहीं हो रही थी। कुंडली मिलान और उपाय के बाद 3 महीने में शादी हो गई।'],
          ].map(([name,city,text])=>(
            <div key={name} className="testimonial">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <div className="testimonial-text">"{text}"</div>
              <div className="testimonial-name">{name}</div>
              <div className="testimonial-city">{city}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq">
        <h2>अक्सर पूछे जाने वाले सवाल</h2>
        {[
          ['क्या ₹199 में सब कुछ मिलेगा?','हां — ₹199 में विस्तृत कुंडली रिपोर्ट और व्यक्तिगत परामर्श दोनों शामिल हैं।'],
          ['कितने समय में रिपोर्ट मिलेगी?','बुकिंग के 24 घंटे के भीतर आपकी रिपोर्ट और परामर्श की व्यवस्था होगी।'],
          ['Online consultation कैसे होगी?','बुकिंग के बाद आपको WhatsApp/Phone पर Pt. Gupta से जोड़ा जाएगा।'],
          ['Payment secure है?','हां — Razorpay के माध्यम से 100% secure payment। UPI, Card, NetBanking सब accepted।'],
        ].map(([q,a])=>(
          <div key={q} className="faq-item">
            <div className="faq-q">{q}</div>
            <div className="faq-a">{a}</div>
          </div>
        ))}
      </section>

      <div className="sticky-cta">
        <div className="sticky-inner">
          <Link href="/book" className="sticky-btn">
            <div>
              <div className="sticky-left-title">कुंडली बुक करें</div>
              <div className="sticky-left-sub">सिर्फ ₹199 · Limited Slots</div>
            </div>
            <div className="sticky-price">₹199 →</div>
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">
          <div className="footer-icon">ॐ</div>
          <span className="footer-name">OMKKAAR Astroworld</span>
        </div>
        <div className="footer-addr">22/FF, Emperor Building, Fatehgunj, Vadodara - 390002</div>
        <div className="footer-addr" style={{marginTop:'4px'}}>© 2026 Omkkaar Astroworld · All rights reserved</div>
      </footer>
    </>
  );
}

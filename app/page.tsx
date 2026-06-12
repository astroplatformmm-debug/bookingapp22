// app/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Inter,system-ui,sans-serif;background:#fffdf8;color:#1a1208}
        a{text-decoration:none}
        .urgency{background:#c2410c;color:#fff;text-align:center;padding:10px 16px;font-size:13px;font-weight:600;letter-spacing:0.02em}
        .nav{display:flex;justify-content:space-between;align-items:center;padding:14px 32px;background:#fff;border-bottom:1px solid #f0e8d0;position:sticky;top:0;z-index:99}
        .logo-wrap{display:flex;align-items:center;gap:10px}
        .logo-badge{width:38px;height:38px;border-radius:50%;background:#c2410c;color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900}
        .logo-text{font-weight:800;font-size:15px;color:#1a1208;letter-spacing:-0.02em}
        .logo-sub{font-size:11px;color:#78461a;font-weight:500}
        .nav-actions{display:flex;align-items:center;gap:12px}
        .nav-phone{font-size:13px;color:#78461a;font-weight:500}
        .btn-nav{background:#c2410c;color:#fff;padding:9px 20px;border-radius:8px;font-weight:700;font-size:13px}
        .hero{display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:88vh;align-items:center;max-width:1100px;margin:0 auto;padding:60px 32px}
        .hero-left{padding-right:48px}
        .hero-badge{display:inline-flex;align-items:center;gap:6px;background:#fef3c7;border:1px solid #fcd34d;color:#92400e;font-size:12px;font-weight:700;padding:6px 14px;border-radius:999px;margin-bottom:24px;letter-spacing:0.04em;text-transform:uppercase}
        .hero h1{font-size:clamp(2rem,3.5vw,3rem);font-weight:900;line-height:1.15;color:#1a1208;font-family:Georgia,serif;margin-bottom:20px}
        .hero h1 em{font-style:normal;color:#c2410c}
        .hero-sub{font-size:16px;color:#5a3a1a;line-height:1.7;margin-bottom:32px}
        .price-block{display:flex;align-items:center;gap:12px;margin-bottom:24px}
        .p-old{font-size:18px;color:#a0856a;text-decoration:line-through}
        .p-new{font-size:42px;font-weight:900;color:#c2410c;line-height:1}
        .p-off{background:#dcfce7;border:1px solid #86efac;color:#14532d;font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;text-transform:uppercase}
        .btn-cta{display:inline-flex;align-items:center;gap:10px;background:#c2410c;color:#fff;font-weight:800;font-size:17px;padding:18px 36px;border-radius:10px;width:100%;justify-content:center;margin-bottom:14px}
        .btn-cta:hover{background:#b91c1c}
        .btn-cta-sub{color:#78561a;font-size:13px;text-align:center;display:block}
        .trust-row{display:flex;gap:20px;margin-top:28px;flex-wrap:wrap}
        .trust-item{display:flex;align-items:center;gap:6px;font-size:12px;color:#78461a;font-weight:600}
        .hero-right{position:relative}
        .photo-wrap{position:relative;width:100%}
        .photo-wrap img{width:100%;height:520px;object-fit:cover;object-position:top;border-radius:16px;display:block}
        .photo-card{position:absolute;bottom:24px;left:-24px;background:#fff;border-radius:12px;padding:14px 18px;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #f0e8d0}
        .photo-card-name{font-weight:800;font-size:14px;color:#1a1208}
        .photo-card-sub{font-size:12px;color:#78461a;margin-top:2px}
        .photo-stars{font-size:13px;margin-top:6px}
        .photo-badge{position:absolute;top:20px;right:-16px;background:#c2410c;color:#fff;border-radius:10px;padding:10px 14px;text-align:center}
        .photo-badge-num{font-size:22px;font-weight:900;line-height:1}
        .photo-badge-txt{font-size:10px;font-weight:600;opacity:0.9}
        .stats{background:#fff;border-top:1px solid #f0e8d0;border-bottom:1px solid #f0e8d0}
        .stats-inner{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;padding:28px 32px}
        .stat{text-align:center;border-right:1px solid #f0e8d0;padding:0 24px}
        .stat:last-child{border-right:none}
        .stat-num{font-size:26px;font-weight:900;color:#c2410c;font-family:Georgia,serif}
        .stat-label{font-size:12px;color:#78461a;margin-top:2px;font-weight:500}
        .section{padding:72px 32px;max-width:1000px;margin:0 auto}
        .sec-tag{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#c2410c;margin-bottom:8px}
        .sec-h2{font-size:clamp(1.5rem,2.5vw,2rem);font-weight:900;color:#1a1208;font-family:Georgia,serif;margin-bottom:12px}
        .sec-sub{font-size:15px;color:#5a3a1a;line-height:1.6;margin-bottom:40px}
        .what-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .what-card{background:#fff;border:1px solid #f0e8d0;border-radius:12px;padding:22px;transition:border-color 0.2s}
        .what-card:hover{border-color:#fcd34d}
        .what-icon{font-size:26px;margin-bottom:10px}
        .what-title{font-weight:700;font-size:14px;color:#1a1208;margin-bottom:4px}
        .what-desc{font-size:13px;color:#78461a;line-height:1.5}
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .tcard{background:#fff;border:1px solid #f0e8d0;border-radius:12px;padding:24px}
        .tcard-stars{font-size:14px;margin-bottom:10px}
        .tcard-text{font-size:14px;color:#5a3a1a;line-height:1.6;font-style:italic;margin-bottom:14px}
        .tcard-name{font-weight:700;font-size:13px;color:#1a1208}
        .tcard-city{font-size:12px;color:#a0856a}
        .faq-list{max-width:680px}
        .faq-item{border:1px solid #f0e8d0;border-radius:10px;padding:18px 22px;margin-bottom:10px;background:#fff}
        .faq-q{font-weight:700;font-size:14px;color:#1a1208;margin-bottom:6px}
        .faq-a{font-size:13px;color:#78461a;line-height:1.6}
        .cta-banner{background:#c2410c;padding:60px 32px;text-align:center}
        .cta-banner h2{font-size:2rem;font-weight:900;color:#fff;font-family:Georgia,serif;margin-bottom:8px}
        .cta-banner p{color:rgba(255,255,255,0.8);font-size:15px;margin-bottom:28px}
        .btn-white{background:#fff;color:#c2410c;font-weight:800;font-size:16px;padding:16px 40px;border-radius:10px;display:inline-block}
        .btn-white:hover{background:#fef3c7}
        .footer{background:#1a1208;padding:32px;text-align:center}
        .footer-logo{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px}
        .footer-badge{width:30px;height:30px;border-radius:50%;background:#c2410c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px}
        .footer-name{font-weight:700;color:#fff;font-size:15px}
        .footer-addr{font-size:12px;color:#a0856a;margin-top:4px}
        .sticky{position:fixed;bottom:0;left:0;right:0;z-index:100;background:#fff;border-top:2px solid #f0e8d0;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;max-width:500px;margin:0 auto;left:50%;transform:translateX(-50%);border-radius:16px 16px 0 0;box-shadow:0 -4px 20px rgba(0,0,0,0.1)}
        .sticky-txt{font-size:13px;color:#78461a;font-weight:600}
        .sticky-price{font-size:22px;font-weight:900;color:#c2410c}
        .sticky-btn{background:#c2410c;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px}
        .pb{padding-bottom:80px}
        @media(max-width:768px){
          .hero{grid-template-columns:1fr;padding:32px 16px;min-height:auto;gap:32px}
          .hero-left{padding-right:0}
          .hero-right{order:-1}
          .photo-wrap img{height:320px}
          .photo-card{left:12px;bottom:12px}
          .photo-badge{top:12px;right:8px}
          .stats-inner{grid-template-columns:repeat(2,1fr);gap:16px}
          .stat{border-right:none;border-bottom:1px solid #f0e8d0;padding-bottom:16px}
          .what-grid{grid-template-columns:1fr}
          .testimonials-grid{grid-template-columns:1fr}
          .section{padding:40px 16px}
          .nav{padding:12px 16px}
        }
      `}</style>

      <div className="urgency">🔥 LIMITED OFFER — सिर्फ ₹199 में Kundali Consultation · आज ही बुक करें!</div>

      <nav className="nav">
        <div className="logo-wrap">
          <div className="logo-badge">ॐ</div>
          <div>
            <div className="logo-text">OMKKAAR</div>
            <div className="logo-sub">Astroworld · Est. 2000</div>
          </div>
        </div>
        <div className="nav-actions">
          <a href="tel:+917069110573" className="nav-phone">📞 +91 70691 10573</a>
          <Link href="/book" className="btn-nav">अभी बुक करें →</Link>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <div className="hero-badge">⭐ 12,000+ Families Consulted</div>
          <h1>अपनी कुंडली में<br /><em>छुपा भाग्य</em><br />जानें आज ही</h1>
          <p className="hero-sub">
            India के trusted Vedic astrologer <strong>Pt. Mukesh Ravindra Gupta</strong> के साथ। 25+ साल का अनुभव, ISO certified, 12,000+ satisfied clients।
          </p>
          <div className="price-block">
            <span className="p-old">₹999</span>
            <span className="p-new">₹199</span>
            <span className="p-off">80% off</span>
          </div>
          <Link href="/book" className="btn-cta">
            अभी कुंडली बुक करें →
          </Link>
          <span className="btn-cta-sub">✅ Razorpay Secured · UPI / Card / NetBanking</span>
          <div className="trust-row">
            <span className="trust-item">🔒 100% Secure</span>
            <span className="trust-item">⚡ 24hr Delivery</span>
            <span className="trust-item">🎯 100% Accurate</span>
            <span className="trust-item">📞 Personal Call</span>
          </div>
        </div>
        <div className="hero-right">
          <div className="photo-wrap">
            <img src="/mukesh.png" alt="Pt. Mukesh Ravindra Gupta" />
            <div className="photo-card">
              <div className="photo-card-name">Pt. Mukesh Ravindra Gupta</div>
              <div className="photo-card-sub">ISO Certified Vedic Astrologer</div>
              <div className="photo-stars">⭐⭐⭐⭐⭐ 4.9/5</div>
            </div>
            <div className="photo-badge">
              <div className="photo-badge-num">25+</div>
              <div className="photo-badge-txt">Years Exp.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stats-inner">
          {[['12,000+','Consultations Done'],['4.9 / 5','Customer Rating'],['25+ Years','Experience'],['100%','Secure Payment']].map(([n,l])=>(
            <div key={n} className="stat">
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="sec-tag">सिर्फ ₹199 में मिलेगा</div>
        <div className="sec-h2">आपको क्या मिलेगा?</div>
        <div className="what-grid">
          {[
            ['📋','Detailed Kundali Report','20+ page PDF — सभी 12 भावों का विश्लेषण'],
            ['📞','Personal Consultation','Pt. Gupta के साथ direct phone/WhatsApp call'],
            ['⚡','24hr Delivery','बुकिंग के 24 घंटे में report और consultation'],
            ['🔮','Remedies & Solutions','ग्रह दोष, करियर, विवाह के practical उपाय'],
            ['💑','Love & Marriage','सही साथी और विवाह का शुभ मुहूर्त'],
            ['💰','Career & Wealth','Business, job aur financial future analysis'],
          ].map(([icon,title,desc])=>(
            <div key={title} className="what-card">
              <div className="what-icon">{icon}</div>
              <div className="what-title">{title}</div>
              <div className="what-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{paddingTop:0}}>
        <div className="sec-tag">Real Reviews</div>
        <div className="sec-h2">12,000+ लोगों ने बदली अपनी ज़िंदगी</div>
        <div className="testimonials-grid">
          {[
            ['Priya S.','Ahmedabad','Pt. Gupta जी की predictions बिल्कुल सही निकली। विवाह का समय बताया और exact वही हुआ। Life-changing experience था।'],
            ['Rahul P.','Surat','Career में 2 साल से problem थी। Consultation के बाद उपाय किए और 3 months में dream job मिली। 100% genuine!'],
            ['Meera J.','Vadodara','बेटे की शादी रुकी हुई थी। Kundali मिलान और remedy के बाद 3 months में shaadi ho gayi। Bahut aabhari hoon।'],
          ].map(([name,city,text])=>(
            <div key={name} className="tcard">
              <div className="tcard-stars">⭐⭐⭐⭐⭐</div>
              <div className="tcard-text">"{text}"</div>
              <div className="tcard-name">{name}</div>
              <div className="tcard-city">{city}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section pb" style={{paddingTop:0}}>
        <div className="sec-tag">FAQs</div>
        <div className="sec-h2">Common Questions</div>
        <div className="faq-list">
          {[
            ['₹199 में exactly क्या मिलेगा?','Complete Kundali report (PDF) + personal phone/WhatsApp consultation with Pt. Gupta. कोई hidden charge नहीं।'],
            ['कितने समय में response मिलेगा?','Booking के 24 घंटे के अंदर Pt. Gupta personally connect करेंगे।'],
            ['Online consultation कैसे होगी?','Payment के बाद आपको WhatsApp पर contact किया जाएगा। Phone call या video call — जो comfortable हो।'],
            ['Payment safe है?','हाँ — Razorpay से 100% secure। UPI, Debit/Credit Card, Net Banking — सब accepted।'],
          ].map(([q,a])=>(
            <div key={q} className="faq-item">
              <div className="faq-q">❓ {q}</div>
              <div className="faq-a">{a}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-banner">
        <h2>आपके Stars आपका इंतज़ार कर रहे हैं</h2>
        <p>सिर्फ ₹199 में जानें अपना भविष्य — Limited slots available</p>
        <Link href="/book" className="btn-white">अभी बुक करें — ₹199 →</Link>
      </div>

      <footer className="footer">
        <div className="footer-logo">
          <div className="footer-badge">ॐ</div>
          <span className="footer-name">OMKKAAR Astroworld</span>
        </div>
        <div className="footer-addr">22/FF, Emperor Building, Fatehgunj, Vadodara - 390002</div>
        <div className="footer-addr">© 2026 Omkkaar Astroworld · All rights reserved</div>
      </footer>

      <div className="sticky">
        <div>
          <div className="sticky-txt">Kundali Consultation</div>
          <div className="sticky-price">₹199 <span style={{fontSize:'13px',color:'#a0856a',textDecoration:'line-through',fontWeight:400}}>₹999</span></div>
        </div>
        <Link href="/book" className="sticky-btn">Book Now →</Link>
      </div>
    </>
  );
}

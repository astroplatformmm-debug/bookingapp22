// app/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Inter,system-ui,sans-serif;background:#fffdf8;color:#1a1208}
        a{text-decoration:none}
        .urgency{background:#c2410c;color:#fff;text-align:center;padding:10px 16px;font-size:13px;font-weight:600}
        .nav{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;background:#fff;border-bottom:1px solid #f0e8d0;position:sticky;top:0;z-index:99}
        .logo-wrap{display:flex;align-items:center;gap:10px}
        .logo-badge{width:36px;height:36px;border-radius:50%;background:#c2410c;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;flex-shrink:0}
        .logo-text{font-weight:800;font-size:14px;color:#1a1208}
        .logo-sub{font-size:10px;color:#78461a}
        .nav-phone{font-size:12px;color:#78461a;font-weight:500;display:none}
        .btn-nav{background:#c2410c;color:#fff;padding:8px 16px;border-radius:8px;font-weight:700;font-size:13px;white-space:nowrap}

        .hero{max-width:480px;margin:0 auto;padding:24px 16px 16px}
        .hero-badge{display:inline-flex;align-items:center;gap:6px;background:#fef3c7;border:1px solid #fcd34d;color:#92400e;font-size:11px;font-weight:700;padding:5px 12px;border-radius:999px;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.04em}
        
        .photo-section{position:relative;margin-bottom:20px}
        .photo-section img{width:100%;height:340px;object-fit:cover;object-position:top center;border-radius:16px;display:block}
        .photo-card{position:absolute;bottom:14px;left:12px;background:#fff;border-radius:10px;padding:10px 14px;box-shadow:0 4px 20px rgba(0,0,0,0.15);border:1px solid #f0e8d0}
        .photo-card-name{font-weight:800;font-size:13px;color:#1a1208}
        .photo-card-sub{font-size:11px;color:#78461a;margin-top:1px}
        .photo-stars{font-size:12px;margin-top:4px}
        .photo-badge{position:absolute;top:12px;right:12px;background:#c2410c;color:#fff;border-radius:10px;padding:8px 12px;text-align:center}
        .photo-badge-num{font-size:20px;font-weight:900;line-height:1}
        .photo-badge-txt{font-size:9px;font-weight:600;opacity:0.9}

        .hero h1{font-size:2rem;font-weight:900;line-height:1.2;color:#1a1208;font-family:Georgia,serif;margin-bottom:12px}
        .hero h1 em{font-style:normal;color:#c2410c}
        .hero-sub{font-size:14px;color:#5a3a1a;line-height:1.6;margin-bottom:20px}
        
        .price-block{display:flex;align-items:center;gap:10px;margin-bottom:16px}
        .p-old{font-size:16px;color:#a0856a;text-decoration:line-through}
        .p-new{font-size:38px;font-weight:900;color:#c2410c;line-height:1}
        .p-off{background:#dcfce7;border:1px solid #86efac;color:#14532d;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;text-transform:uppercase}
        
        .btn-cta{display:flex;align-items:center;justify-content:center;gap:8px;background:#c2410c;color:#fff;font-weight:800;font-size:16px;padding:16px;border-radius:10px;width:100%;margin-bottom:10px}
        .btn-cta-sub{color:#78561a;font-size:12px;text-align:center;display:block;margin-bottom:16px}
        
        .trust-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:24px}
        .trust-item{display:flex;align-items:center;gap:6px;font-size:12px;color:#78461a;font-weight:600;background:#fff;border:1px solid #f0e8d0;border-radius:8px;padding:8px 10px}

        .stats{background:#fff;border-top:1px solid #f0e8d0;border-bottom:1px solid #f0e8d0}
        .stats-inner{display:grid;grid-template-columns:repeat(2,1fr);max-width:480px;margin:0 auto;padding:20px 16px;gap:0}
        .stat{text-align:center;padding:12px 8px;border-right:1px solid #f0e8d0;border-bottom:1px solid #f0e8d0}
        .stat:nth-child(2n){border-right:none}
        .stat:nth-child(3),.stat:nth-child(4){border-bottom:none}
        .stat-num{font-size:22px;font-weight:900;color:#c2410c;font-family:Georgia,serif}
        .stat-label{font-size:11px;color:#78461a;margin-top:2px;font-weight:500}

        .section{padding:40px 16px;max-width:480px;margin:0 auto}
        .sec-tag{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#c2410c;margin-bottom:6px}
        .sec-h2{font-size:1.5rem;font-weight:900;color:#1a1208;font-family:Georgia,serif;margin-bottom:8px}
        
        .what-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .what-card{background:#fff;border:1px solid #f0e8d0;border-radius:12px;padding:16px}
        .what-icon{font-size:22px;margin-bottom:6px}
        .what-title{font-weight:700;font-size:12px;color:#1a1208;margin-bottom:3px}
        .what-desc{font-size:11px;color:#78461a;line-height:1.4}

        .tcard{background:#fff;border:1px solid #f0e8d0;border-radius:12px;padding:18px;margin-bottom:10px}
        .tcard-stars{font-size:13px;margin-bottom:8px}
        .tcard-text{font-size:13px;color:#5a3a1a;line-height:1.6;font-style:italic;margin-bottom:10px}
        .tcard-name{font-weight:700;font-size:12px;color:#1a1208}
        .tcard-city{font-size:11px;color:#a0856a}

        .faq-item{border:1px solid #f0e8d0;border-radius:10px;padding:16px;margin-bottom:8px;background:#fff}
        .faq-q{font-weight:700;font-size:13px;color:#1a1208;margin-bottom:5px}
        .faq-a{font-size:12px;color:#78461a;line-height:1.6}

        .cta-banner{background:#c2410c;padding:40px 16px;text-align:center}
        .cta-banner h2{font-size:1.5rem;font-weight:900;color:#fff;font-family:Georgia,serif;margin-bottom:6px}
        .cta-banner p{color:rgba(255,255,255,0.85);font-size:13px;margin-bottom:20px}
        .btn-white{background:#fff;color:#c2410c;font-weight:800;font-size:15px;padding:14px 32px;border-radius:10px;display:inline-block}

        .footer{background:#1a1208;padding:24px 16px;text-align:center}
        .footer-logo{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px}
        .footer-badge{width:28px;height:28px;border-radius:50%;background:#c2410c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px}
        .footer-name{font-weight:700;color:#fff;font-size:14px}
        .footer-addr{font-size:11px;color:#a0856a;margin-top:3px}

        .sticky{position:fixed;bottom:0;left:0;right:0;z-index:100;background:#fff;border-top:2px solid #f0e8d0;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 -4px 20px rgba(0,0,0,0.08)}
        .sticky-txt{font-size:11px;color:#78461a;font-weight:600}
        .sticky-price{font-size:20px;font-weight:900;color:#c2410c;line-height:1}
        .sticky-btn{background:#c2410c;color:#fff;font-weight:700;font-size:14px;padding:12px 20px;border-radius:8px}
        .pb{padding-bottom:80px}

        @media(min-width:768px){
          .nav{padding:14px 32px}
          .nav-phone{display:flex;align-items:center;gap:4px}
          .hero{max-width:1100px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding:60px 32px}
          .photo-section{margin-bottom:0}
          .photo-section img{height:520px}
          .hero h1{font-size:3rem}
          .stats-inner{grid-template-columns:repeat(4,1fr);max-width:900px;padding:28px 32px}
          .stat{border-bottom:none}
          .stat:nth-child(4){border-right:none}
          .stat:nth-child(2){border-right:1px solid #f0e8d0}
          .stat:nth-child(3){border-right:1px solid #f0e8d0}
          .section{max-width:1000px;padding:60px 32px}
          .what-grid{grid-template-columns:repeat(3,1fr)}
          .cta-banner{padding:60px 32px}
          .cta-banner h2{font-size:2rem}
          .footer{padding:32px}
        }
      `}</style>

      <div className="urgency">🔥 LIMITED OFFER — सिर्फ ₹199 में Kundali Consultation · आज ही बुक करें!</div>

      <nav className="nav">
        <div className="logo-wrap">
          <div className="logo-badge">ॐ</div>
          <div>
            <div className="logo-text">OMKKAAR Astroworld</div>
            <div className="logo-sub">Est. 2000 · Vadodara</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <a href="tel:+917069110573" className="nav-phone">📞 +91 70691 10573</a>
          <Link href="/book" className="btn-nav">बुक करें →</Link>
        </div>
      </nav>

      <div className="hero">
        <div>
          <div className="hero-badge">⭐ 12,000+ Families Consulted</div>
          
          <div className="photo-section">
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

          <h1>अपनी कुंडली में<br /><em>छुपा भाग्य</em><br />जानें आज ही</h1>
          <p className="hero-sub">India के trusted Vedic astrologer <strong>Pt. Mukesh Ravindra Gupta</strong> के साथ। 25+ साल का अनुभव, ISO certified, 12,000+ satisfied clients।</p>
          
          <div className="price-block">
            <span className="p-old">₹999</span>
            <span className="p-new">₹199</span>
            <span className="p-off">80% off</span>
          </div>
          <Link href="/book" className="btn-cta">अभी कुंडली बुक करें →</Link>
          <span className="btn-cta-sub">✅ Razorpay Secured · UPI / Card / NetBanking</span>
          <div className="trust-row">
            <span className="trust-item">🔒 100% Secure</span>
            <span className="trust-item">⚡ 24hr Delivery</span>
            <span className="trust-item">🎯 100% Accurate</span>
            <span className="trust-item">📞 Personal Call</span>
          </div>
        </div>

        <div style={{display:'none'}} className="desktop-photo">
          <div className="photo-section">
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
          {[['12,000+','Consultations'],['4.9/5','Rating'],['25+ Years','Experience'],['100%','Secure Payment']].map(([n,l])=>(
            <div key={n} className="stat">
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="sec-tag">सिर्फ ₹199 में</div>
        <div className="sec-h2">आपको क्या मिलेगा?</div>
        <div className="what-grid">
          {[
            ['📋','Kundali Report','20+ page detailed PDF analysis'],
            ['📞','Personal Call','Direct WhatsApp/phone with Pt. Gupta'],
            ['⚡','24hr Delivery','Report within 24 hours'],
            ['🔮','Remedies','Practical उपाय for your problems'],
            ['💑','Marriage','सही साथी aur शुभ मुहूर्त'],
            ['💰','Career','Business aur financial future'],
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
        <div className="sec-h2">12,000+ satisfied clients</div>
        {[
          ['Priya S.','Ahmedabad','Pt. Gupta जी की predictions बिल्कुल सही निकली। विवाह का समय बताया और exact वही हुआ। Life-changing!'],
          ['Rahul P.','Surat','Career में 2 साल से problem थी। Consultation के बाद 3 months में dream job मिली। 100% genuine!'],
          ['Meera J.','Vadodara','बेटे की शादी रुकी थी। Remedy के बाद 3 months में शादी हो गई। बहुत आभारी हूं।'],
        ].map(([name,city,text])=>(
          <div key={name} className="tcard">
            <div className="tcard-stars">⭐⭐⭐⭐⭐</div>
            <div className="tcard-text">"{text}"</div>
            <div className="tcard-name">{name}</div>
            <div className="tcard-city">{city}</div>
          </div>
        ))}
      </div>

      <div className="section pb" style={{paddingTop:0}}>
        <div className="sec-tag">FAQs</div>
        <div className="sec-h2">Common Questions</div>
        {[
          ['₹199 में exactly क्या मिलेगा?','Complete Kundali PDF report + personal phone/WhatsApp consultation। कोई hidden charge नहीं।'],
          ['कितने time में response मिलेगा?','Booking के 24 घंटे में Pt. Gupta personally contact करेंगे।'],
          ['Online consultation कैसे होगी?','Payment के बाद WhatsApp पर contact होगा। Phone या video call।'],
          ['Payment safe है?','हाँ — Razorpay से 100% secure। UPI, Card, Net Banking सब accepted।'],
        ].map(([q,a])=>(
          <div key={q} className="faq-item">
            <div className="faq-q">❓ {q}</div>
            <div className="faq-a">{a}</div>
          </div>
        ))}
      </div>

      <div className="cta-banner">
        <h2>आपके Stars आपका इंतज़ार कर रहे हैं</h2>
        <p>सिर्फ ₹199 में जानें अपना भविष्य — Limited slots!</p>
        <Link href="/book" className="btn-white">अभी बुक करें — ₹199 →</Link>
      </div>

      <footer className="footer">
        <div className="footer-logo">
          <div className="footer-badge">ॐ</div>
          <span className="footer-name">OMKKAAR Astroworld</span>
        </div>
        <div className="footer-addr">22/FF, Emperor Building, Fatehgunj, Vadodara - 390002</div>
        <div className="footer-addr">© 2026 Omkkaar Astroworld</div>
      </footer>

      <div className="sticky">
        <div>
          <div className="sticky-txt">Kundali Consultation</div>
          <div className="sticky-price">₹199 <span style={{fontSize:'12px',color:'#a0856a',textDecoration:'line-through',fontWeight:400}}>₹999</span></div>
        </div>
        <Link href="/book" className="sticky-btn">Book Now →</Link>
      </div>
    </>
  );
}

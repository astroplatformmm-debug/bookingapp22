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
        .btn-nav{background:#c2410c;color:#fff;padding:8px 16px;border-radius:8px;font-weight:700;font-size:13px;white-space:nowrap}
        .nav-phone{font-size:13px;color:#78461a;font-weight:500}

        .hero-wrap{display:grid;grid-template-columns:1fr 1fr;min-height:90vh;max-width:1200px;margin:0 auto;padding:48px 32px;gap:48px;align-items:center}
        .hero-right img{width:100%;height:580px;object-fit:cover;object-position:top;border-radius:20px;display:block}
        .photo-wrap{position:relative}
        .photo-card{position:absolute;bottom:20px;left:16px;background:#fff;border-radius:12px;padding:12px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #f0e8d0}
        .photo-card-name{font-weight:800;font-size:14px;color:#1a1208}
        .photo-card-sub{font-size:12px;color:#78461a;margin-top:2px}
        .photo-stars{font-size:13px;margin-top:4px}
        .photo-badge{position:absolute;top:16px;right:16px;background:#c2410c;color:#fff;border-radius:10px;padding:10px 14px;text-align:center}
        .photo-badge-num{font-size:22px;font-weight:900;line-height:1}
        .photo-badge-txt{font-size:9px;font-weight:600;opacity:0.9}

        .hero-badge{display:inline-flex;align-items:center;gap:6px;background:#fef3c7;border:1px solid #fcd34d;color:#92400e;font-size:11px;font-weight:700;padding:5px 12px;border-radius:999px;margin-bottom:20px;text-transform:uppercase;letter-spacing:0.04em}
        .hero-left h1{font-size:clamp(1.6rem,2.8vw,2.6rem);font-weight:900;line-height:1.2;color:#1a1208;font-family:Georgia,serif;margin-bottom:16px}
        .hero-left h1 em{font-style:normal;color:#c2410c}
        .hero-sub{font-size:15px;color:#5a3a1a;line-height:1.7;margin-bottom:24px}
        .price-block{display:flex;align-items:center;gap:12px;margin-bottom:20px}
        .p-old{font-size:18px;color:#a0856a;text-decoration:line-through}
        .p-new{font-size:42px;font-weight:900;color:#c2410c;line-height:1}
        .p-off{background:#dcfce7;border:1px solid #86efac;color:#14532d;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;text-transform:uppercase}
        .btn-cta{display:flex;align-items:center;justify-content:center;gap:8px;background:#c2410c;color:#fff;font-weight:800;font-size:17px;padding:18px;border-radius:10px;width:100%;margin-bottom:10px}
        .btn-cta:hover{background:#b91c1c}
        .btn-cta-sub{color:#78561a;font-size:12px;text-align:center;display:block;margin-bottom:20px}
        .trust-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .trust-item{display:flex;align-items:center;gap:6px;font-size:12px;color:#78461a;font-weight:600;background:#fff;border:1px solid #f0e8d0;border-radius:8px;padding:8px 10px}

        .stats{background:#fff;border-top:1px solid #f0e8d0;border-bottom:1px solid #f0e8d0}
        .stats-inner{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;padding:28px 32px}
        .stat{text-align:center;border-right:1px solid #f0e8d0;padding:0 20px}
        .stat:last-child{border-right:none}
        .stat-num{font-size:24px;font-weight:900;color:#c2410c;font-family:Georgia,serif}
        .stat-label{font-size:12px;color:#78461a;margin-top:2px;font-weight:500}

        .section{padding:60px 32px;max-width:1000px;margin:0 auto}
        .sec-tag{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#c2410c;margin-bottom:6px}
        .sec-h2{font-size:clamp(1.4rem,2.5vw,2rem);font-weight:900;color:#1a1208;font-family:Georgia,serif;margin-bottom:32px}
        .what-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .what-card{background:#fff;border:1px solid #f0e8d0;border-radius:12px;padding:22px}
        .what-icon{font-size:24px;margin-bottom:10px}
        .what-title{font-weight:700;font-size:14px;color:#1a1208;margin-bottom:6px}
        .what-desc{font-size:13px;color:#78461a;line-height:1.6}

        .tcard{background:#fff;border:1px solid #f0e8d0;border-radius:12px;padding:22px}
        .tcard-stars{font-size:14px;margin-bottom:8px}
        .tcard-text{font-size:13px;color:#5a3a1a;line-height:1.6;font-style:italic;margin-bottom:12px}
        .tcard-name{font-weight:700;font-size:13px;color:#1a1208}
        .tcard-city{font-size:11px;color:#a0856a}
        .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}

        .faq-item{border:1px solid #f0e8d0;border-radius:10px;padding:18px;margin-bottom:10px;background:#fff}
        .faq-q{font-weight:700;font-size:13px;color:#1a1208;margin-bottom:5px}
        .faq-a{font-size:12px;color:#78461a;line-height:1.6}

        .cta-banner{background:#c2410c;padding:60px 32px;text-align:center}
        .cta-banner h2{font-size:2rem;font-weight:900;color:#fff;font-family:Georgia,serif;margin-bottom:8px}
        .cta-banner p{color:rgba(255,255,255,0.85);font-size:15px;margin-bottom:24px}
        .btn-white{background:#fff;color:#c2410c;font-weight:800;font-size:16px;padding:16px 40px;border-radius:10px;display:inline-block}
        .btn-white:hover{background:#fef3c7}

        .footer{background:#1a1208;padding:32px;text-align:center}
        .footer-logo{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px}
        .footer-badge{width:28px;height:28px;border-radius:50%;background:#c2410c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px}
        .footer-name{font-weight:700;color:#fff}
        .footer-addr{font-size:11px;color:#a0856a;margin-top:4px}

        .sticky{position:fixed;bottom:0;left:0;right:0;z-index:100;background:#fff;border-top:2px solid #f0e8d0;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 -4px 20px rgba(0,0,0,0.08)}
        .sticky-txt{font-size:12px;color:#78461a;font-weight:600}
        .sticky-price{font-size:20px;font-weight:900;color:#c2410c}
        .sticky-btn{background:#c2410c;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px}
        .pb{padding-bottom:80px}

        @media(max-width:768px){
          .hero-wrap{grid-template-columns:1fr;padding:24px 16px;min-height:auto;gap:24px}
          .hero-right{order:-1}
          .hero-right img{height:340px}
          .stats-inner{grid-template-columns:repeat(2,1fr);padding:20px 16px;gap:0}
          .stat{border-right:none;padding:12px 8px;border-bottom:1px solid #f0e8d0}
          .stat:nth-child(odd){border-right:1px solid #f0e8d0}
          .stat:nth-child(3),.stat:nth-child(4){border-bottom:none}
          .section{padding:36px 16px}
          .what-grid{grid-template-columns:1fr 1fr}
          .tgrid{grid-template-columns:1fr}
          .video-grid{grid-template-columns:1fr!important}
          .nav-phone{display:none}
          .cta-banner{padding:40px 16px}
          .cta-banner h2{font-size:1.5rem}
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
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <a href="tel:+917069110573" className="nav-phone">📞 +91 70691 10573</a>
          <Link href="/book" className="btn-nav">बुक करें →</Link>
        </div>
      </nav>

      <div className="hero-wrap">
        <div className="hero-left">
          <div className="hero-badge">⭐ 12,000+ Families Consulted</div>
          <h1>Career, Marriage Aur Finance Ka<br /><em>Kundali Vishleshan</em><br />Sirf ₹199 Mein</h1>
          <p className="hero-sub">
            India के trusted Vedic astrologer <strong>Pt. Mukesh Ravindra Gupta</strong> के साथ। 25+ साल का अनुभव, ISO certified — Personal WhatsApp/Phone call with Pt. Gupta।
          </p>
          <div className="price-block">
            <span className="p-old">₹999</span>
            <span className="p-new">₹199</span>
            <span className="p-off">80% off</span>
          </div>
          <Link href="/book" className="btn-cta">Claim ₹199 Offer Now →</Link>
          <span className="btn-cta-sub">✅ Razorpay Secured · UPI / Card / NetBanking</span>
          <div className="trust-row">
            <span className="trust-item">🔒 100% Secure</span>
            <span className="trust-item">⚡ Max 24hr Delivery</span>
            <span className="trust-item">📞 WhatsApp / Phone</span>
            <span className="trust-item">🎯 ISO Certified</span>
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
          {[['12,000+','Consultations'],['4.9/5','Rating'],['25+ Years','Experience'],['100%','Secure Payment']].map(([n,l])=>(
            <div key={n} className="stat">
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="sec-tag">Real Customer Reviews</div>
        <div className="sec-h2">देखिए क्या कहते हैं हमारे clients</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'48px'}}>
          <div style={{borderRadius:'16px',overflow:'hidden',border:'1px solid #f0e8d0',background:'#000'}}>
            <video controls playsInline preload="metadata" style={{width:'100%',display:'block',maxHeight:'340px'}}>
              <source src="/testimonial1.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{borderRadius:'16px',overflow:'hidden',border:'1px solid #f0e8d0',background:'#000'}}>
            <video controls playsInline preload="metadata" style={{width:'100%',display:'block',maxHeight:'340px'}}>
              <source src="/testimonial2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="sec-tag">सिर्फ ₹199 में मिलेगा</div>
        <div className="sec-h2">आपको क्या मिलेगा?</div>
        <div className="what-grid">
          {[
            ['📋','Basic Kundali Report','Career, Marriage, Finance aur Remedies ko cover karta detailed kundali analysis'],
            ['📞','Direct Consultation','Apni Kundali discuss karein aur apne sawaalon ke jawab paayein — WhatsApp ya Phone par'],
            ['⚡','Max 24hr Delivery','Booking ke maximum 24 ghante mein aapko report milegi'],
            ['🔮','Personalized Remedies','Aapki Kundali ke anusar personalized remedies — generic nahi'],
            ['💑','Career & Marriage','Career growth, financial opportunities aur sahi rishte ki samajh'],
            ['🌟','Grah Vishleshan','Aapke janam kundali ke grahon ka detailed prabhav aur samadhan'],
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

        <div className="tgrid">
          {[
            ['Priya S.','Ahmedabad','Pt. Gupta ji ne meri kundali dekh ke career ke baare mein jo bataya, 6 mahine mein sab sach ho gaya. Bahut shukriya!'],
            ['Rahul P.','Surat','Shaadi mein rukawat thi. Personalized remedy ke baad 4 mahine mein rishta pakka hua. 100% genuine astrologer!'],
            ['Meera J.','Vadodara','Finance mein bahut problem thi. Pt. Gupta ke upay se business mein growth aayi. WhatsApp pe bahut acchi guidance mili.'],
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
        {[
          ['₹199 mein exactly kya milega?','Kundali ka detailed analysis (PDF) + personal WhatsApp/phone call with Pt. Gupta. Koi hidden charge nahi.'],
          ['Kya video call hoga?','Nahi — sirf WhatsApp ya phone call. Aap jab chahein call karke pooch sakte hain.'],
          ['Kitne time mein response milega?','Maximum 24 ghante mein Pt. Gupta personally contact karenge.'],
          ['Payment safe hai?','Haan — Razorpay se 100% secure. UPI, Card, Net Banking sab accepted.'],
        ].map(([q,a])=>(
          <div key={q} className="faq-item">
            <div className="faq-q">❓ {q}</div>
            <div className="faq-a">{a}</div>
          </div>
        ))}
      </div>

      <div className="cta-banner">
        <h2>Apna Bhavishya Jaanein Aaj Hi</h2>
        <p>Career, Marriage aur Finance — sirf ₹199 mein · Limited slots available</p>
        <Link href="/book" className="btn-white">Claim ₹199 Offer Now →</Link>
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
          <div className="sticky-price">₹199 <span style={{fontSize:'12px',color:'#a0856a',textDecoration:'line-through',fontWeight:400}}>₹999</span></div>
        </div>
        <Link href="/book" className="sticky-btn">Claim Offer →</Link>
      </div>
    </>
  );
}

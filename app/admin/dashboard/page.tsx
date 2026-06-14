'use client';
// app/admin/dashboard/page.tsx

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Calendar, Users, IndianRupee, TrendingUp, LogOut, Search,
  CheckCircle2, XCircle, Clock, RefreshCw, Sparkles, Plus,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { BookingType } from '../../../types';
import { formatPrice, formatDate, formatTime, cn } from '../../../lib/utils';

interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  todayBookings: number;
  monthBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  monthRevenue: number;
}

type FilterStatus = 'ALL' | 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'slots'>('bookings');

  const fetchStats = useCallback(async () => {
    const res = await fetch('/api/admin/stats');
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setStats(data);
  }, [router]);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), status: filterStatus, search });
    const res = await fetch(`/api/admin/bookings?${params}`);
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setBookings(data.bookings);
    setTotal(data.total);
    setTotalPages(data.totalPages);
    setLoading(false);
  }, [page, filterStatus, search, router]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleStatusChange = async (bookingId: string, status: 'CONFIRMED' | 'CANCELLED') => {
    const res = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) { toast.success(`Booking ${status.toLowerCase()}`); fetchBookings(); fetchStats(); }
    else toast.error('Failed to update booking');
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const statusBadge = (status: string) => {
    if (status === 'CONFIRMED') return <span style={{background:'#dcfce7',color:'#166534',fontSize:'11px',fontWeight:700,padding:'3px 8px',borderRadius:'999px'}}>Confirmed</span>;
    if (status === 'PENDING') return <span style={{background:'#fef3c7',color:'#92400e',fontSize:'11px',fontWeight:700,padding:'3px 8px',borderRadius:'999px'}}>Pending</span>;
    return <span style={{background:'#fee2e2',color:'#991b1b',fontSize:'11px',fontWeight:700,padding:'3px 8px',borderRadius:'999px'}}>Cancelled</span>;
  };

  return (
    <div style={{minHeight:'100vh',background:'#f9fafb'}}>
      <header style={{background:'linear-gradient(135deg,#080e24,#2f4694)',padding:'14px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <Sparkles style={{width:'16px',height:'16px',color:'#E8A020'}} />
          <span style={{color:'#fff',fontFamily:'Georgia,serif',fontWeight:700}}>OMKKAAR Admin</span>
        </div>
        <button onClick={handleLogout} style={{display:'flex',alignItems:'center',gap:'6px',color:'rgba(255,255,255,0.6)',background:'none',border:'none',cursor:'pointer',fontSize:'14px'}}>
          <LogOut style={{width:'14px',height:'14px'}} /> Logout
        </button>
      </header>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'24px'}}>

        {/* Stats */}
        {stats && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'24px'}}>
            {[
              { icon: <Calendar style={{width:'18px',height:'18px',color:'#2f4694'}} />, label:'This Month', value:stats.monthBookings, sub:'bookings' },
              { icon: <Users style={{width:'18px',height:'18px',color:'#16a34a'}} />, label:'Today', value:stats.todayBookings, sub:'confirmed' },
              { icon: <IndianRupee style={{width:'18px',height:'18px',color:'#d97706'}} />, label:'Month Revenue', value:formatPrice(stats.monthRevenue), sub:'collected' },
              { icon: <TrendingUp style={{width:'18px',height:'18px',color:'#7c3aed'}} />, label:'Total Revenue', value:formatPrice(stats.totalRevenue), sub:'all time' },
            ].map(s => (
              <div key={s.label} style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>{s.icon}<span style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',color:'#6b7280'}}>{s.label}</span></div>
                <div style={{fontFamily:'Georgia,serif',fontSize:'24px',fontWeight:700,color:'#111'}}>{s.value}</div>
                <div style={{fontSize:'11px',color:'#9ca3af',marginTop:'2px'}}>{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          {[['bookings',`Bookings (${total})`],['slots','Manage Slots']].map(([tab,label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as 'bookings'|'slots')}
              style={{padding:'10px 20px',borderRadius:'10px',fontWeight:700,fontSize:'13px',cursor:'pointer',border:'1px solid',
                background: activeTab===tab ? '#2f4694' : '#fff',
                color: activeTab===tab ? '#fff' : '#374151',
                borderColor: activeTab===tab ? '#2f4694' : '#e5e7eb',
              }}>
              {tab === 'slots' && <Plus style={{width:'14px',height:'14px',display:'inline',marginRight:'4px',verticalAlign:'middle'}} />}
              {label}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <>
            <div style={{display:'flex',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
              <div style={{position:'relative',flex:1,minWidth:'200px'}}>
                <Search style={{width:'14px',height:'14px',position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#9ca3af'}} />
                <input style={{width:'100%',paddingLeft:'36px',paddingRight:'16px',paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',border:'1px solid #e5e7eb',fontSize:'13px',outline:'none'}}
                  placeholder="Search name, email, phone..." value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }} />
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                {(['ALL','CONFIRMED','PENDING','CANCELLED'] as FilterStatus[]).map(s => (
                  <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
                    style={{padding:'8px 14px',borderRadius:'10px',fontSize:'11px',fontWeight:700,cursor:'pointer',border:'1px solid',
                      background: filterStatus===s ? '#2f4694' : '#fff',
                      color: filterStatus===s ? '#fff' : '#374151',
                      borderColor: filterStatus===s ? '#2f4694' : '#e5e7eb',
                    }}>{s}</button>
                ))}
                <button onClick={fetchBookings} style={{padding:'8px',borderRadius:'10px',border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer'}}>
                  <RefreshCw style={{width:'14px',height:'14px',color:'#6b7280'}} />
                </button>
              </div>
            </div>

            <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',overflow:'hidden'}}>
              {loading ? (
                <div style={{padding:'60px',textAlign:'center',color:'#9ca3af'}}>
                  <RefreshCw style={{width:'24px',height:'24px',margin:'0 auto 8px',display:'block'}} />
                  Loading...
                </div>
              ) : bookings.length === 0 ? (
                <div style={{padding:'60px',textAlign:'center',color:'#9ca3af'}}>
                  <Calendar style={{width:'36px',height:'36px',margin:'0 auto 12px',display:'block',opacity:0.4}} />
                  No bookings found
                </div>
              ) : (
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',fontSize:'13px',borderCollapse:'collapse'}}>
                    <thead>
                      <tr style={{background:'#f9fafb',borderBottom:'1px solid #e5e7eb'}}>
                        {['Customer','Service','Date & Time','Amount','Status','Actions'].map(h => (
                          <th key={h} style={{padding:'12px 16px',textAlign:'left',fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',color:'#6b7280'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} style={{borderBottom:'1px solid #f3f4f6'}}>
                          <td style={{padding:'12px 16px'}}>
                            <div style={{fontWeight:600,color:'#111'}}>{b.customerName}</div>
                            <div style={{fontSize:'12px',color:'#6b7280'}}>{b.customerEmail}</div>
                            <div style={{fontSize:'12px',color:'#6b7280'}}>{b.customerPhone}</div>
                          </td>
                          <td style={{padding:'12px 16px',color:'#374151'}}>{b.service?.name}</td>
                          <td style={{padding:'12px 16px'}}>
                            <div style={{color:'#374151'}}>{b.slot && formatDate(b.slot.date + 'T00:00:00')}</div>
                            <div style={{fontSize:'12px',color:'#6b7280',display:'flex',alignItems:'center',gap:'4px'}}>
                              <Clock style={{width:'11px',height:'11px'}} />
                              {b.slot && formatTime(b.slot.startTime)}
                            </div>
                          </td>
                          <td style={{padding:'12px 16px',fontWeight:700,color:'#d97706'}}>{formatPrice(b.amountPaid)}</td>
                          <td style={{padding:'12px 16px'}}>{statusBadge(b.status)}</td>
                          <td style={{padding:'12px 16px'}}>
                            <div style={{display:'flex',gap:'4px'}}>
                              {b.status !== 'CONFIRMED' && (
                                <button onClick={() => handleStatusChange(b.id,'CONFIRMED')}
                                  style={{padding:'6px',borderRadius:'8px',border:'none',background:'none',cursor:'pointer',color:'#16a34a'}} title="Confirm">
                                  <CheckCircle2 style={{width:'16px',height:'16px'}} />
                                </button>
                              )}
                              {b.status !== 'CANCELLED' && (
                                <button onClick={() => { if(confirm('Cancel?')) handleStatusChange(b.id,'CANCELLED'); }}
                                  style={{padding:'6px',borderRadius:'8px',border:'none',background:'none',cursor:'pointer',color:'#dc2626'}} title="Cancel">
                                  <XCircle style={{width:'16px',height:'16px'}} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {totalPages > 1 && (
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderTop:'1px solid #f3f4f6'}}>
                  <span style={{fontSize:'12px',color:'#6b7280'}}>Page {page} of {totalPages} ({total} total)</span>
                  <div style={{display:'flex',gap:'6px'}}>
                    <button onClick={() => setPage(p=>p-1)} disabled={page===1}
                      style={{padding:'6px',borderRadius:'8px',border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',opacity:page===1?0.4:1}}>
                      <ChevronLeft style={{width:'14px',height:'14px'}} />
                    </button>
                    <button onClick={() => setPage(p=>p+1)} disabled={page>=totalPages}
                      style={{padding:'6px',borderRadius:'8px',border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',opacity:page>=totalPages?0.4:1}}>
                      <ChevronRight style={{width:'14px',height:'14px'}} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'slots' && <SlotManager />}
      </div>
    </div>
  );
}

function SlotManager() {
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [serviceId, setServiceId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [duration, setDuration] = useState(15);
  const [breakTime, setBreakTime] = useState(0);
  const [offDays, setOffDays] = useState<number[]>([0]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<{start:string,end:string}[]>([]);

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(setServices);
  }, []);

  const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const toggleOffDay = (day: number) => {
    setOffDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const generateSlots = () => {
    const slots: {start:string,end:string}[] = [];
    let [h, m] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const endMins = endH * 60 + endM;
    while (true) {
      const slotEndMins = h * 60 + m + duration;
      if (slotEndMins > endMins) break;
      const eH = Math.floor(slotEndMins / 60);
      const eM = slotEndMins % 60;
      slots.push({
        start: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`,
        end: `${String(eH).padStart(2,'0')}:${String(eM).padStart(2,'0')}`
      });
      const next = slotEndMins + breakTime;
      h = Math.floor(next / 60);
      m = next % 60;
      if (h * 60 + m >= endMins) break;
    }
    return slots;
  };

  const getDates = () => {
    const dates: string[] = [];
    if (!startDate || !endDate) return dates;
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (!offDays.includes(d.getDay())) {
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const handlePreview = () => {
    const slots = generateSlots();
    setPreview(slots);
    if (slots.length === 0) toast.error('No slots — check time settings');
    else toast.success(`${slots.length} slots per day`);
  };

  const handleCreate = async () => {
    if (!serviceId || !startDate || !endDate) { toast.error('Service aur dates select karo'); return; }
    const slots = generateSlots();
    const dates = getDates();
    if (slots.length === 0) { toast.error('No slots — check time settings'); return; }
    if (dates.length === 0) { toast.error('No valid dates'); return; }

    setLoading(true);
    let total = 0;
    for (const date of dates) {
      const res = await fetch('/api/admin/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, date, slots }),
      });
      if (res.ok) { const d = await res.json(); total += d.created; }
    }
    toast.success(`✅ ${total} slots created across ${dates.length} days!`);
    setLoading(false);
    setPreview([]);
  };

  const inputStyle = {width:'100%',padding:'10px 12px',borderRadius:'8px',border:'1px solid #e5e7eb',fontSize:'13px',outline:'none',background:'#fff'};
  const labelStyle = {display:'block' as const,fontSize:'11px',fontWeight:700 as const,textTransform:'uppercase' as const,letterSpacing:'0.05em',color:'#6b7280',marginBottom:'6px'};

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',alignItems:'start'}}>
      <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',padding:'24px'}}>
        <h3 style={{fontFamily:'Georgia,serif',fontSize:'18px',marginBottom:'20px',color:'#111'}}>Slot Settings</h3>

        <div style={{marginBottom:'14px'}}>
          <label style={labelStyle}>Service</label>
          <select style={inputStyle} value={serviceId} onChange={e => setServiceId(e.target.value)}>
            <option value="">Select service</option>
            {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'14px'}}>
          <div>
            <label style={labelStyle}>From Date</label>
            <input type="date" style={inputStyle} min={new Date().toISOString().split('T')[0]} value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>To Date</label>
            <input type="date" style={inputStyle} min={startDate||new Date().toISOString().split('T')[0]} value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'14px'}}>
          <div>
            <label style={labelStyle}>Start Time</label>
            <input type="time" style={inputStyle} value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>End Time</label>
            <input type="time" style={inputStyle} value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'14px'}}>
          <div>
            <label style={labelStyle}>Duration (min)</label>
            <select style={inputStyle} value={duration} onChange={e => setDuration(Number(e.target.value))}>
              {[10,15,20,30,45,60,90,120].map(d => <option key={d} value={d}>{d} min</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Break Between Slots</label>
            <select style={inputStyle} value={breakTime} onChange={e => setBreakTime(Number(e.target.value))}>
              {[0,5,10,15,20,30].map(b => <option key={b} value={b}>{b===0?'No break':`${b} min break`}</option>)}
            </select>
          </div>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={labelStyle}>Days Off (click to toggle)</label>
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {DAY_NAMES.map((day,i) => (
              <button key={day} onClick={() => toggleOffDay(i)}
                style={{padding:'7px 12px',borderRadius:'8px',fontSize:'12px',fontWeight:700,border:'1px solid',cursor:'pointer',
                  background:offDays.includes(i)?'#fee2e2':'#f0fdf4',
                  borderColor:offDays.includes(i)?'#fca5a5':'#86efac',
                  color:offDays.includes(i)?'#dc2626':'#16a34a'}}>
                {day} {offDays.includes(i)?'✕':'✓'}
              </button>
            ))}
          </div>
          <p style={{fontSize:'11px',color:'#9ca3af',marginTop:'6px'}}>Red = off · Green = working</p>
        </div>

        <div style={{display:'flex',gap:'10px'}}>
          <button onClick={handlePreview}
            style={{flex:1,padding:'12px',borderRadius:'10px',border:'2px solid #2f4694',color:'#2f4694',fontWeight:700,fontSize:'13px',cursor:'pointer',background:'#fff'}}>
            Preview
          </button>
          <button onClick={handleCreate} disabled={loading}
            style={{flex:1,padding:'12px',borderRadius:'10px',border:'none',background:'#2f4694',color:'#fff',fontWeight:700,fontSize:'13px',cursor:'pointer',opacity:loading?0.6:1}}>
            {loading ? 'Creating...' : 'Create Slots'}
          </button>
        </div>
      </div>

      <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',padding:'24px'}}>
        <h3 style={{fontFamily:'Georgia,serif',fontSize:'18px',marginBottom:'6px',color:'#111'}}>Preview</h3>
        <p style={{fontSize:'12px',color:'#6b7280',marginBottom:'16px'}}>
          {preview.length > 0 ? `${preview.length} slots per day` : 'Click Preview to see slots'}
        </p>

        {preview.length > 0 ? (
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',maxHeight:'320px',overflowY:'auto',marginBottom:'16px'}}>
              {preview.map((slot,i) => (
                <div key={i} style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'8px',padding:'8px',textAlign:'center'}}>
                  <div style={{fontSize:'13px',fontWeight:700,color:'#15803d'}}>{slot.start}</div>
                  <div style={{fontSize:'10px',color:'#6b7280'}}>→ {slot.end}</div>
                </div>
              ))}
            </div>
            {startDate && endDate && (
              <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:'10px',padding:'14px'}}>
                <div style={{fontSize:'12px',fontWeight:700,color:'#1d4ed8',marginBottom:'6px'}}>Summary</div>
                <div style={{fontSize:'13px',color:'#1e40af',lineHeight:'1.8'}}>
                  📅 {getDates().length} working days<br/>
                  ⏰ {preview.length} slots/day<br/>
                  📊 Total: <strong>{getDates().length * preview.length} slots</strong><br/>
                  ⏱ {duration} min {breakTime > 0 ? `+ ${breakTime} min break` : '(no break)'}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{textAlign:'center',padding:'48px 0',color:'#9ca3af'}}>
            <Calendar style={{width:'36px',height:'36px',margin:'0 auto 10px',display:'block',opacity:0.3}} />
            <div style={{fontSize:'13px'}}>Set settings → Preview → Create</div>
          </div>
        )}
      </div>
    </div>
  );
}

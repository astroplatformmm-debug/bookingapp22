'use client';
// app/admin/dashboard/page.tsx

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Calendar, Users, IndianRupee, TrendingUp, LogOut, Search,
  CheckCircle2, XCircle, Clock, RefreshCw, Sparkles, Plus,
  ChevronLeft, ChevronRight, Trash2, AlertTriangle, Eye, EyeOff
} from 'lucide-react';
import { BookingType } from '../../../types';
import { formatPrice, formatDate, formatTime } from '../../../lib/utils';

interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  todayBookings: number;
  monthBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  monthRevenue: number;
}

interface SlotType {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isActive: boolean;
}

type FilterStatus = 'ALL' | 'CONFIRMED' | 'PENDING' | 'CANCELLED';

function toLocalDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatTimeFromHHMM(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const h = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${h}:${String(minutes).padStart(2, '0')} ${period}`;
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

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
                  <RefreshCw style={{width:'24px',height:'24px',margin:'0 auto 8px',display:'block'}} />Loading...
                </div>
              ) : bookings.length === 0 ? (
                <div style={{padding:'60px',textAlign:'center',color:'#9ca3af'}}>
                  <Calendar style={{width:'36px',height:'36px',margin:'0 auto 12px',display:'block',opacity:0.4}} />No bookings found
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
                              <Clock style={{width:'11px',height:'11px'}} />{b.slot && formatTime(b.slot.startTime)}
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
                    <button onClick={() => setPage(p=>p-1)} disabled={page===1} style={{padding:'6px',borderRadius:'8px',border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',opacity:page===1?0.4:1}}>
                      <ChevronLeft style={{width:'14px',height:'14px'}} />
                    </button>
                    <button onClick={() => setPage(p=>p+1)} disabled={page>=totalPages} style={{padding:'6px',borderRadius:'8px',border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',opacity:page>=totalPages?0.4:1}}>
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

// ─────────────────────────────────────────────────────────────────────────────
// SLOT MANAGER — Full UI with create panel + date-wise slot viewer
// ─────────────────────────────────────────────────────────────────────────────
function SlotManager() {
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [serviceId, setServiceId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [duration, setDuration] = useState(60);
  const [breakTime, setBreakTime] = useState(0);
  const [offDays, setOffDays] = useState<number[]>([0]);
  const [creating, setCreating] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [preview, setPreview] = useState<{start:string,end:string}[]>([]);

  // Viewer state
  const [viewServiceId, setViewServiceId] = useState('');
  const [viewStartDate, setViewStartDate] = useState(toLocalDateString(new Date()));
  const [viewEndDate, setViewEndDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 7); return toLocalDateString(d);
  });
  const [grouped, setGrouped] = useState<Record<string, SlotType[]>>({});
  const [viewLoading, setViewLoading] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then((data) => {
      setServices(data);
      if (data.length > 0) {
        setServiceId(data[0].id);
        setViewServiceId(data[0].id);
      }
    });
  }, []);

  // Auto-load viewer when viewServiceId changes
  useEffect(() => {
    if (viewServiceId) fetchSlots();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewServiceId]);

  const fetchSlots = async () => {
    if (!viewServiceId || !viewStartDate || !viewEndDate) return;
    setViewLoading(true);
    try {
      const params = new URLSearchParams({ serviceId: viewServiceId, startDate: viewStartDate, endDate: viewEndDate });
      const res = await fetch(`/api/admin/slots?${params}`);
      if (res.ok) {
        const data = await res.json();
        setGrouped(data.grouped || {});
      }
    } finally {
      setViewLoading(false);
    }
  };

  const handleToggle = async (slot: SlotType) => {
    if (slot.isBooked) { toast.error('Booked slot disable nahi ho sakta'); return; }
    setToggling(slot.id);
    const res = await fetch('/api/admin/slots', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId: slot.id, isActive: !slot.isActive }),
    });
    if (res.ok) {
      toast.success(slot.isActive ? 'Slot disabled' : 'Slot enabled');
      fetchSlots();
    } else {
      toast.error('Toggle failed');
    }
    setToggling(null);
  };

  const handleDeleteSlot = async (slot: SlotType) => {
    if (slot.isBooked) { toast.error('Booked slot delete nahi ho sakta'); return; }
    if (!confirm(`${formatTimeFromHHMM(slot.startTime)} slot delete karna hai?`)) return;
    setDeleting(slot.id);
    const res = await fetch('/api/admin/slots', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId: slot.id }),
    });
    if (res.ok) {
      toast.success('Slot deleted');
      fetchSlots();
    } else {
      toast.error('Delete failed');
    }
    setDeleting(null);
  };

  const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const toggleOffDay = (day: number) =>
    setOffDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);

  const generateSlots = () => {
    const slots: {start:string,end:string}[] = [];
    let [h, m] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const endMins = endH * 60 + endM;
    while (true) {
      const slotEndMins = h * 60 + m + duration;
      if (slotEndMins > endMins) break;
      const eH = Math.floor(slotEndMins / 60), eM = slotEndMins % 60;
      slots.push({ start: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`, end: `${String(eH).padStart(2,'0')}:${String(eM).padStart(2,'0')}` });
      const next = slotEndMins + breakTime;
      h = Math.floor(next / 60); m = next % 60;
      if (h * 60 + m >= endMins) break;
    }
    return slots;
  };

  const getDates = () => {
    if (!startDate || !endDate) return [];
    const [sy,sm,sd] = startDate.split('-').map(Number);
    const [ey,em,ed] = endDate.split('-').map(Number);
    const start = new Date(sy, sm-1, sd), end = new Date(ey, em-1, ed);
    const dates: string[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
      if (!offDays.includes(d.getDay())) dates.push(toLocalDateString(d));
    }
    return dates;
  };

  const handlePreview = () => {
    const s = generateSlots();
    setPreview(s);
    if (s.length === 0) toast.error('No slots — check time settings');
    else toast.success(`${s.length} slots per day`);
  };

  const runCreate = async (slots: {start:string,end:string}[], dates: string[]) => {
    let totalCreated = 0, failedDates = 0;
    for (const date of dates) {
      try {
        const res = await fetch('/api/admin/slots', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serviceId, date, slots: slots.map(s => ({ startTime: s.start, endTime: s.end })) }),
        });
        if (res.ok) { const d = await res.json(); totalCreated += d.created; }
        else { if (res.status === 401) { toast.error('Session expire — login karo'); return; } failedDates++; }
      } catch { failedDates++; }
    }
    if (failedDates > 0 && totalCreated === 0) toast.error('❌ Koi slot create nahi hua');
    else if (failedDates > 0) toast.success(`⚠️ ${totalCreated} created, ${failedDates} dates failed`);
    else toast.success(`✅ ${totalCreated} slots created across ${dates.length} days!`);
    // Sync viewer
    if (viewServiceId === serviceId) fetchSlots();
  };

  const handleClearAndRecreate = async () => {
    if (!serviceId || !startDate || !endDate) { toast.error('Service aur dates select karo'); return; }
    const slots = generateSlots(), dates = getDates();
    if (!slots.length) { toast.error('No slots — check time settings'); return; }
    if (!dates.length) { toast.error('No valid dates'); return; }
    if (!confirm(`⚠️ Is date range ke saare unbooked slots delete hokar ${slots.length} slots/day se recreate honge.\nBooked slots safe rahenge.\n\nProceed?`)) return;
    setClearing(true);
    const delRes = await fetch('/api/admin/slots', { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ serviceId, startDate, endDate }) });
    if (!delRes.ok) { toast.error('Delete failed'); setClearing(false); return; }
    const { deleted } = await delRes.json();
    toast.success(`🗑️ ${deleted} purane slots delete hue`);
    await runCreate(slots, dates);
    setClearing(false); setPreview([]);
  };

  const handleCreate = async () => {
    if (!serviceId || !startDate || !endDate) { toast.error('Service aur dates select karo'); return; }
    const slots = generateSlots(), dates = getDates();
    if (!slots.length) { toast.error('No slots — check time settings'); return; }
    if (!dates.length) { toast.error('No valid dates'); return; }
    setCreating(true);
    await runCreate(slots, dates);
    setCreating(false); setPreview([]);
  };

  const isBusy = creating || clearing;
  const todayLocal = toLocalDateString(new Date());

  const inputStyle: React.CSSProperties = { width:'100%', padding:'10px 12px', borderRadius:'8px', border:'1px solid #e5e7eb', fontSize:'13px', outline:'none', background:'#fff' };
  const labelStyle: React.CSSProperties = { display:'block', fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:'#6b7280', marginBottom:'6px' };

  const sortedDates = Object.keys(grouped).sort();
  const totalSlots = sortedDates.reduce((acc, d) => acc + grouped[d].length, 0);
  const activeSlots = sortedDates.reduce((acc, d) => acc + grouped[d].filter(s => s.isActive).length, 0);
  const bookedSlots = sortedDates.reduce((acc, d) => acc + grouped[d].filter(s => s.isBooked).length, 0);

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* ── CREATE PANEL ─────────────────────────────────────────────────── */}
      <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',padding:'24px'}}>
        <h3 style={{fontFamily:'Georgia,serif',fontSize:'18px',marginBottom:'4px',color:'#111'}}>Create Slots</h3>
        <p style={{fontSize:'12px',color:'#9ca3af',marginBottom:'20px'}}>Bulk slot creation by date range</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px',marginBottom:'14px'}}>
          <div>
            <label style={labelStyle}>Service</label>
            <select style={inputStyle} value={serviceId} onChange={e => setServiceId(e.target.value)}>
              <option value="">Select</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>From Date</label>
            <input type="date" style={inputStyle} min={todayLocal} value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>To Date</label>
            <input type="date" style={inputStyle} min={startDate || todayLocal} value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            <div>
              <label style={labelStyle}>Start</label>
              <input type="time" style={inputStyle} value={startTime} onChange={e => setStartTime(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>End</label>
              <input type="time" style={inputStyle} value={endTime} onChange={e => setEndTime(e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px',marginBottom:'16px'}}>
          <div>
            <label style={labelStyle}>Duration</label>
            <select style={inputStyle} value={duration} onChange={e => setDuration(Number(e.target.value))}>
              {[10,15,20,30,45,60,90,120].map(d => <option key={d} value={d}>{d} min</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Break</label>
            <select style={inputStyle} value={breakTime} onChange={e => setBreakTime(Number(e.target.value))}>
              {[0,5,10,15,20,30].map(b => <option key={b} value={b}>{b===0?'None':`${b} min`}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Days Off</label>
            <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
              {DAY_NAMES.map((day,i) => (
                <button key={day} onClick={() => toggleOffDay(i)}
                  style={{padding:'5px 8px',borderRadius:'6px',fontSize:'11px',fontWeight:700,border:'1px solid',cursor:'pointer',
                    background:offDays.includes(i)?'#fee2e2':'#f0fdf4',
                    borderColor:offDays.includes(i)?'#fca5a5':'#86efac',
                    color:offDays.includes(i)?'#dc2626':'#16a34a'}}>
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:'flex',gap:'8px',alignItems:'flex-start'}}>
          <button onClick={handlePreview} style={{padding:'10px 18px',borderRadius:'10px',border:'2px solid #2f4694',color:'#2f4694',fontWeight:700,fontSize:'13px',cursor:'pointer',background:'#fff',whiteSpace:'nowrap'}}>
            Preview
          </button>
          <div style={{flex:1,display:'flex',gap:'8px'}}>
            <button onClick={handleCreate} disabled={isBusy}
              style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',background:'#2f4694',color:'#fff',fontWeight:700,fontSize:'13px',cursor:'pointer',opacity:isBusy?0.6:1}}>
              {creating ? 'Creating...' : '＋ Add Slots'}
            </button>
            <button onClick={handleClearAndRecreate} disabled={isBusy}
              style={{flex:1,padding:'10px',borderRadius:'10px',border:'2px solid #dc2626',color:'#dc2626',fontWeight:700,fontSize:'13px',cursor:'pointer',background:'#fff',opacity:isBusy?0.6:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
              <Trash2 style={{width:'13px',height:'13px'}} />
              {clearing ? 'Clearing...' : 'Clear & Recreate'}
            </button>
          </div>
          {preview.length > 0 && (
            <div style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'10px',padding:'10px 16px',fontSize:'12px',color:'#15803d',fontWeight:600,whiteSpace:'nowrap'}}>
              {preview.length} slots/day · {getDates().length} days = <strong>{preview.length * getDates().length} total</strong>
            </div>
          )}
        </div>

        {preview.length > 0 && (
          <div style={{marginTop:'14px',display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {preview.map((slot,i) => (
              <span key={i} style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:'6px',padding:'4px 10px',fontSize:'12px',fontWeight:600,color:'#1d4ed8'}}>
                {formatTimeFromHHMM(slot.start)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── SLOT VIEWER ──────────────────────────────────────────────────── */}
      <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',padding:'24px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h3 style={{fontFamily:'Georgia,serif',fontSize:'18px',marginBottom:'4px',color:'#111'}}>Slot Viewer</h3>
            <p style={{fontSize:'12px',color:'#9ca3af',margin:0}}>Enable, disable, or delete individual slots</p>
          </div>
          {/* Stat pills */}
          {sortedDates.length > 0 && (
            <div style={{display:'flex',gap:'8px'}}>
              <span style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'999px',padding:'4px 12px',fontSize:'12px',fontWeight:700,color:'#15803d'}}>
                {activeSlots} active
              </span>
              <span style={{background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:'999px',padding:'4px 12px',fontSize:'12px',fontWeight:700,color:'#c2410c'}}>
                {bookedSlots} booked
              </span>
              <span style={{background:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:'999px',padding:'4px 12px',fontSize:'12px',fontWeight:700,color:'#6b7280'}}>
                {totalSlots} total
              </span>
            </div>
          )}
        </div>

        {/* Viewer filters */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr auto',gap:'10px',marginBottom:'16px',alignItems:'flex-end'}}>
          <div>
            <label style={labelStyle}>Service</label>
            <select style={inputStyle} value={viewServiceId} onChange={e => setViewServiceId(e.target.value)}>
              <option value="">Select</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>From</label>
            <input type="date" style={inputStyle} value={viewStartDate} onChange={e => setViewStartDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>To</label>
            <input type="date" style={inputStyle} value={viewEndDate} onChange={e => setViewEndDate(e.target.value)} />
          </div>
          <button onClick={fetchSlots} disabled={viewLoading}
            style={{padding:'10px 20px',borderRadius:'10px',border:'none',background:'#2f4694',color:'#fff',fontWeight:700,fontSize:'13px',cursor:'pointer',opacity:viewLoading?0.6:1,display:'flex',alignItems:'center',gap:'6px',whiteSpace:'nowrap'}}>
            <RefreshCw style={{width:'13px',height:'13px'}} />
            {viewLoading ? 'Loading...' : 'Load'}
          </button>
        </div>

        {/* Slot list */}
        {viewLoading ? (
          <div style={{textAlign:'center',padding:'40px',color:'#9ca3af'}}>
            <RefreshCw style={{width:'24px',height:'24px',margin:'0 auto 8px',display:'block'}} />Loading slots...
          </div>
        ) : sortedDates.length === 0 ? (
          <div style={{textAlign:'center',padding:'40px',color:'#9ca3af',border:'2px dashed #e5e7eb',borderRadius:'12px'}}>
            <Calendar style={{width:'36px',height:'36px',margin:'0 auto 10px',display:'block',opacity:0.3}} />
            <div style={{fontSize:'14px',fontWeight:600}}>No slots found</div>
            <div style={{fontSize:'12px',marginTop:'4px'}}>Upar se slots create karo ya date range change karo</div>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            {sortedDates.map(dateKey => {
              const daySlots = grouped[dateKey];
              const dayActive = daySlots.filter(s => s.isActive).length;
              const dayBooked = daySlots.filter(s => s.isBooked).length;
              return (
                <div key={dateKey} style={{border:'1px solid #e5e7eb',borderRadius:'12px',overflow:'hidden'}}>
                  {/* Date header */}
                  <div style={{background:'#f9fafb',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #e5e7eb'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <Calendar style={{width:'15px',height:'15px',color:'#2f4694'}} />
                      <span style={{fontWeight:700,fontSize:'14px',color:'#111'}}>{formatDisplayDate(dateKey)}</span>
                    </div>
                    <div style={{display:'flex',gap:'6px'}}>
                      <span style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'999px',padding:'2px 10px',fontSize:'11px',fontWeight:700,color:'#15803d'}}>{dayActive} active</span>
                      {dayBooked > 0 && <span style={{background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:'999px',padding:'2px 10px',fontSize:'11px',fontWeight:700,color:'#c2410c'}}>{dayBooked} booked</span>}
                      <span style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:'999px',padding:'2px 10px',fontSize:'11px',fontWeight:700,color:'#1d4ed8'}}>{daySlots.length} total</span>
                    </div>
                  </div>

                  {/* Slot chips */}
                  <div style={{padding:'14px 16px',display:'flex',flexWrap:'wrap',gap:'8px'}}>
                    {daySlots.map(slot => {
                      const isDisabled = !slot.isActive;
                      const isBooked = slot.isBooked;
                      return (
                        <div key={slot.id} style={{
                          display:'flex',alignItems:'center',gap:'6px',
                          padding:'7px 12px',borderRadius:'10px',border:'1px solid',
                          background: isBooked ? '#fff7ed' : isDisabled ? '#f9fafb' : '#f0fdf4',
                          borderColor: isBooked ? '#fed7aa' : isDisabled ? '#e5e7eb' : '#86efac',
                          opacity: isDisabled && !isBooked ? 0.65 : 1,
                        }}>
                          <Clock style={{width:'12px',height:'12px',color: isBooked?'#c2410c':isDisabled?'#9ca3af':'#15803d'}} />
                          <span style={{fontSize:'13px',fontWeight:700,color: isBooked?'#c2410c':isDisabled?'#6b7280':'#15803d'}}>
                            {formatTimeFromHHMM(slot.startTime)}
                          </span>
                          <span style={{fontSize:'11px',color:'#9ca3af'}}>→ {formatTimeFromHHMM(slot.endTime)}</span>

                          {isBooked ? (
                            <span style={{fontSize:'10px',fontWeight:700,background:'#fed7aa',color:'#c2410c',padding:'1px 6px',borderRadius:'999px',marginLeft:'2px'}}>BOOKED</span>
                          ) : (
                            <>
                              {/* Enable / Disable toggle */}
                              <button
                                onClick={() => handleToggle(slot)}
                                disabled={toggling === slot.id}
                                title={isDisabled ? 'Enable slot' : 'Disable slot'}
                                style={{padding:'3px 8px',borderRadius:'6px',border:'none',cursor:'pointer',fontSize:'11px',fontWeight:700,
                                  background: isDisabled ? '#eff6ff' : '#fef9c3',
                                  color: isDisabled ? '#2f4694' : '#a16207',
                                  opacity: toggling===slot.id?0.5:1
                                }}>
                                {toggling===slot.id ? '...' : isDisabled ? <Eye style={{width:'11px',height:'11px',display:'inline'}} /> : <EyeOff style={{width:'11px',height:'11px',display:'inline'}} />}
                                {' '}{isDisabled ? 'Enable' : 'Disable'}
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteSlot(slot)}
                                disabled={deleting === slot.id}
                                title="Delete slot"
                                style={{padding:'3px 6px',borderRadius:'6px',border:'none',cursor:'pointer',background:'#fee2e2',color:'#dc2626',opacity:deleting===slot.id?0.5:1}}>
                                {deleting===slot.id ? '...' : <Trash2 style={{width:'11px',height:'11px',display:'inline'}} />}
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Warning note */}
      <div style={{background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:'10px',padding:'12px 16px',display:'flex',gap:'8px',alignItems:'flex-start'}}>
        <AlertTriangle style={{width:'15px',height:'15px',color:'#ea580c',flexShrink:0,marginTop:'1px'}} />
        <p style={{fontSize:'12px',color:'#9a3412',margin:0,lineHeight:'1.6'}}>
          <strong>Add Slots</strong> = existing ke saath naye add hote hain. &nbsp;
          <strong>Clear &amp; Recreate</strong> = pehle unbooked slots delete, phir fresh create. &nbsp;
          <strong>Booked slots kabhi delete nahi hote.</strong>
        </p>
      </div>
    </div>
  );
}

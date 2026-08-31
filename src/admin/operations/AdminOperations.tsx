import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3, Camera, CheckCircle2, Clock3, ListTodo, MapPin, MessageCircle, Plus, Smartphone, Trash2, Video } from 'lucide-react';
import { distanceMeters, getBrowserLocation } from './geo';
import { defaultState, loadOperationsState, saveOperationsState } from './store';
import type { AttendanceRecord, AttendanceType, GeoPoint, OperationsState, SocialMetric, TodoPriority } from './types';

type Tab = 'overview' | 'attendance' | 'todo' | 'social' | 'daily';
const officeLat = Number(import.meta.env.VITE_OFFICE_LAT);
const officeLng = Number(import.meta.env.VITE_OFFICE_LNG);
const officeRadius = Number(import.meta.env.VITE_ATTENDANCE_RADIUS_METERS || 150);
const hasOfficeConfig = Number.isFinite(officeLat) && Number.isFinite(officeLng);
const input = 'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#1B4D3E]';
const card = 'rounded-3xl border border-gray-200 bg-white p-5 shadow-sm';

function timing(type: AttendanceType, now = new Date()) {
  const actual = now.getHours() * 60 + now.getMinutes();
  const target = type === 'check_in' ? 8 * 60 : 17 * 60;
  const delta = actual - target;
  return type === 'check_in'
    ? { status: delta > 0 ? ('late' as const) : ('on_time' as const), minutesDelta: delta }
    : { status: delta < 0 ? ('early_leave' as const) : ('normal' as const), minutesDelta: delta };
}

function engagement(m: SocialMetric) {
  return m.reach ? ((m.likes + m.comments + m.shares + m.saves) / m.reach) * 100 : 0;
}

export default function AdminOperations() {
  const [tab, setTab] = useState<Tab>('overview');
  const [state, setState] = useState<OperationsState>(() => loadOperationsState());
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const [location, setLocation] = useState<GeoPoint | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationError, setLocationError] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [clock, setClock] = useState(new Date());

  useEffect(() => saveOperationsState(state), [state]);
  useEffect(() => { const id = window.setInterval(() => setClock(new Date()), 1000); return () => clearInterval(id); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const attendanceToday = state.attendance.filter(x => x.createdAt.slice(0, 10) === today);
  const checkedIn = attendanceToday.some(x => x.type === 'check_in');
  const checkedOut = attendanceToday.some(x => x.type === 'check_out');
  const replyRate = state.sales.incomingChats ? Math.round(state.sales.repliedChats / state.sales.incomingChats * 100) : 0;
  const avgER = useMemo(() => state.social.reduce((n, x) => n + engagement(x), 0) / state.social.length, [state.social]);
  const insideRadius = distance !== null && distance <= officeRadius;
  const canAttend = !!location && insideRadius && !!photoName && hasOfficeConfig;

  async function checkLocation() {
    setLocationError('');
    try {
      const pos = await getBrowserLocation();
      setLocation(pos);
      if (!hasOfficeConfig) { setDistance(null); setLocationError('Koordinat kantor belum dikonfigurasi.'); return; }
      setDistance(distanceMeters(pos, { latitude: officeLat, longitude: officeLng }));
    } catch (e) { setLocation(null); setDistance(null); setLocationError(e instanceof Error ? e.message : 'Lokasi gagal dibaca.'); }
  }

  function takePhoto(file?: File) {
    if (!file) return;
    setPhotoName(file.name);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function attend(type: AttendanceType) {
    if (!location || distance === null || !canAttend) return;
    const now = new Date();
    const t = timing(type, now);
    const row: AttendanceRecord = {
      id: crypto.randomUUID(), type, createdAt: now.toISOString(), status: t.status,
      minutesDelta: t.minutesDelta, location, distanceMeters: Math.round(distance), photoName
    };
    setState(s => ({ ...s, attendance: [row, ...s.attendance] }));
    setPhotoName(''); setPhotoPreview('');
  }

  function addTodo() {
    if (!todo.trim()) return;
    setState(s => ({ ...s, todos: [{ id: crypto.randomUUID(), title: todo.trim(), priority, done: false, createdAt: new Date().toISOString() }, ...s.todos] }));
    setTodo('');
  }

  function updateSocial(index: number, key: keyof SocialMetric, value: number) {
    setState(s => ({ ...s, social: s.social.map((x, i) => i === index ? { ...x, [key]: value } : x) }));
  }

  const tabs: Array<[Tab,string]> = [['overview','Overview'],['attendance','Absensi'],['todo','To-do'],['social','Social Report'],['daily','Chat & Konten']];

  return <div className="min-h-screen bg-[#f6f7f5] text-gray-900">
    <header className="border-b border-gray-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between">
      <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1B4D3E]">Subsidi Rumah Bogor</p><h1 className="text-2xl font-black">Admin Operations</h1><p className="text-sm text-gray-500">Absensi, pekerjaan, social media, chat, dan konten.</p></div>
      <div className="rounded-2xl bg-[#1B4D3E] px-4 py-2 text-white"><p className="text-xs text-white/60">Jam kerja 08:00—17:00</p><p className="font-black">{clock.toLocaleTimeString('id-ID')}</p></div>
    </div></header>
    <main className="mx-auto max-w-7xl px-5 py-6">
      <div className="mb-6 flex gap-2 overflow-x-auto">{tabs.map(([id,label]) => <button key={id} onClick={()=>setTab(id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold ${tab===id?'bg-[#1B4D3E] text-white':'border border-gray-200 bg-white text-gray-600'}`}>{label}</button>)}</div>

      {tab==='overview' && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className={card}><p className="text-xs font-bold text-gray-400">ABSENSI HARI INI</p><p className="mt-2 text-2xl font-black">{checkedOut?'Lengkap':checkedIn?'Sudah masuk':'Belum absen'}</p></div>
        <div className={card}><p className="text-xs font-bold text-gray-400">TO-DO AKTIF</p><p className="mt-2 text-2xl font-black">{state.todos.filter(x=>!x.done).length}</p></div>
        <div className={card}><p className="text-xs font-bold text-gray-400">CHAT DIBALAS</p><p className="mt-2 text-2xl font-black">{replyRate}%</p><p className="text-xs text-gray-500">{state.sales.repliedChats}/{state.sales.incomingChats} chat</p></div>
        <div className={card}><p className="text-xs font-bold text-gray-400">AVG ENGAGEMENT</p><p className="mt-2 text-2xl font-black">{avgER.toFixed(2)}%</p></div>
      </div>}

      {tab==='attendance' && <div className="grid gap-5 lg:grid-cols-2">
        <section className={card}><div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#1B4D3E]"/><h2 className="font-black">Foto + validasi lokasi</h2></div>
          <p className="mt-3 text-sm text-gray-600">Radius maksimal <b>{officeRadius} m</b>. Di luar radius = absen tidak bisa disimpan.</p>
          {!hasOfficeConfig && <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-xs font-bold text-amber-700">Isi VITE_OFFICE_LAT dan VITE_OFFICE_LNG dulu.</p>}
          <button onClick={checkLocation} className="mt-4 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-black">Izinkan & cek lokasi</button>
          {location && <div className="mt-3 rounded-2xl bg-gray-50 p-3 text-sm"><b>Accuracy:</b> ±{Math.round(location.accuracy)} m · <b>Jarak:</b> {distance===null?'null':`${Math.round(distance)} m`} · <b>Status:</b> {insideRadius?'Dalam radius':'Di luar radius'}</div>}
          {locationError && <p className="mt-3 text-sm font-bold text-red-600">{locationError}</p>}
          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-7 text-sm font-black"><Camera className="h-5 w-5"/>Ambil foto<input className="hidden" type="file" accept="image/*" capture="user" onChange={e=>takePhoto(e.target.files?.[0])}/></label>
          {photoPreview && <img src={photoPreview} className="mt-3 h-56 w-full rounded-3xl object-cover"/>}
          <div className="mt-4 grid gap-3 sm:grid-cols-2"><button disabled={!canAttend||checkedIn} onClick={()=>attend('check_in')} className="rounded-2xl bg-[#1B4D3E] p-4 text-sm font-black text-white disabled:opacity-30">Absen Datang</button><button disabled={!canAttend||!checkedIn||checkedOut} onClick={()=>attend('check_out')} className="rounded-2xl bg-gray-950 p-4 text-sm font-black text-white disabled:opacity-30">Absen Pulang</button></div>
        </section>
        <section className={card}><div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-[#1B4D3E]"/><h2 className="font-black">Riwayat</h2></div><div className="mt-4 space-y-3">{state.attendance.map(x=><div key={x.id} className="rounded-2xl bg-gray-50 p-4"><p className="font-black">{x.type==='check_in'?'Datang':'Pulang'} · {new Date(x.createdAt).toLocaleTimeString('id-ID')}</p><p className="text-xs text-gray-500">{x.status==='late'?`Telat ${Math.max(x.minutesDelta,0)} menit`:x.status==='early_leave'?`Pulang cepat ${Math.abs(x.minutesDelta)} menit`:x.status==='on_time'?'Tepat waktu':'Normal'} · {x.distanceMeters} m</p></div>)}</div></section>
      </div>}

      {tab==='todo' && <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]"><section className={card}><div className="flex items-center gap-2"><Plus className="h-5 w-5"/><h2 className="font-black">Tambah To-do</h2></div><input className={`${input} mt-4`} value={todo} onChange={e=>setTodo(e.target.value)} placeholder="Follow-up lead..."/><select className={`${input} mt-3`} value={priority} onChange={e=>setPriority(e.target.value as TodoPriority)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select><button onClick={addTodo} className="mt-3 w-full rounded-2xl bg-[#1B4D3E] p-3 text-sm font-black text-white">Tambah</button></section><section className={card}><div className="flex items-center gap-2"><ListTodo className="h-5 w-5"/><h2 className="font-black">Pekerjaan</h2></div><div className="mt-4 space-y-2">{state.todos.map(x=><div key={x.id} className="flex items-center gap-3 rounded-2xl border p-3"><button onClick={()=>setState(s=>({...s,todos:s.todos.map(t=>t.id===x.id?{...t,done:!t.done}:t)}))}><CheckCircle2 className={`h-5 w-5 ${x.done?'text-emerald-600':'text-gray-300'}`}/></button><div className="flex-1"><p className={`font-bold ${x.done?'line-through text-gray-400':''}`}>{x.title}</p><p className="text-xs text-gray-400">{x.priority}</p></div><button onClick={()=>setState(s=>({...s,todos:s.todos.filter(t=>t.id!==x.id)}))}><Trash2 className="h-4 w-4 text-gray-400"/></button></div>)}</div></section></div>}

      {tab==='social' && <div className="grid gap-5 xl:grid-cols-3">{state.social.map((m,i)=><section key={m.platform} className={card}><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Smartphone className="h-5 w-5"/><h2 className="font-black">{m.platform}</h2></div><span className="text-xs font-black text-[#1B4D3E]">ER {engagement(m).toFixed(2)}%</span></div><div className="mt-4 grid grid-cols-2 gap-3">{(['followers','reach','views','likes','comments','shares','saves'] as const).map(k=><label key={k}><span className="text-xs capitalize text-gray-500">{k}</span><input className={input} type="number" min="0" value={m[k]} onChange={e=>updateSocial(i,k,Number(e.target.value)||0)}/></label>)}</div></section>)}</div>}

      {tab==='daily' && <div className="grid gap-5 lg:grid-cols-2"><section className={card}><div className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/><h2 className="font-black">Chat hari ini</h2></div><div className="mt-4 grid grid-cols-2 gap-3">{([['incomingChats','Chat masuk'],['repliedChats','Dibalas'],['followUps','Follow-up'],['surveyBookings','Survey']] as const).map(([k,l])=><label key={k}><span className="text-xs text-gray-500">{l}</span><input className={input} type="number" min="0" value={state.sales[k]} onChange={e=>setState(s=>({...s,sales:{...s.sales,[k]:Number(e.target.value)||0}}))}/></label>)}</div><div className="mt-4 rounded-2xl bg-[#F0F5F2] p-4"><p className="text-xs text-gray-500">Reply rate</p><p className="text-3xl font-black text-[#1B4D3E]">{replyRate}%</p></div></section><section className={card}><div className="flex items-center gap-2"><Video className="h-5 w-5"/><h2 className="font-black">Konten hari ini</h2></div><div className="mt-4 grid grid-cols-2 gap-3">{([['planned','Direncanakan'],['recorded','Dibuat'],['edited','Diedit'],['published','Publish']] as const).map(([k,l])=><label key={k}><span className="text-xs text-gray-500">{l}</span><input className={input} type="number" min="0" value={state.content[k]} onChange={e=>setState(s=>({...s,content:{...s.content,[k]:Number(e.target.value)||0}}))}/></label>)}</div><textarea className={`${input} mt-3 min-h-28`} placeholder="Catatan..." value={state.content.notes} onChange={e=>setState(s=>({...s,content:{...s.content,notes:e.target.value}}))}/></section></div>}
    </main>
  </div>;
}

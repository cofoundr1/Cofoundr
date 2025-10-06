import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useParams } from 'react-router-dom';
import './styles/tokens.css';
import { login, setToken, signup, me, updateMe, discover, myConnections, getUserId, thread } from './api';
import { makeSocket } from './socket';

function Home(){
  return (
    <div className="card" style={{maxWidth:820, margin:'40px auto', textAlign:'center'}}>
      <h1 style={{fontFamily:'var(--font-serif)', marginTop:0}}>CoFoundr</h1>
      <p>Connect with entrepreneurs, find co-founders, and start building together.</p>
      <div style={{display:'flex', gap:12, justifyContent:'center'}}>
        <Link className="btn primary" to="/signup">Get Started</Link>
        <Link className="btn" to="/login">Log In</Link>
      </div>
    </div>
  );
}

function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const nav = useNavigate();
  async function submit(e){ e.preventDefault(); setErr('');
    try{ const { token } = await login({ email, password }); setToken(token); nav('/discover'); }
    catch{ setErr('Invalid credentials'); }
  }
  return (
    <form className="card" onSubmit={submit} style={{maxWidth:420, margin:'40px auto'}}>
      <h2 style={{fontFamily:'var(--font-serif)'}}>Welcome back</h2>
      {err && <div style={{color:'crimson'}}>{err}</div>}
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn primary" type="submit">Log in</button>
      <p>No account? <Link to="/signup">Create one</Link></p>
    </form>
  );
}

function Signup(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();
  async function submit(e){ e.preventDefault();
    const { token } = await signup({ name, email, password });
    setToken(token); nav('/profile');
  }
  return (
    <form className="card" onSubmit={submit} style={{maxWidth:480, margin:'40px auto'}}>
      <h2 style={{fontFamily:'var(--font-serif)'}}>Join CoFoundr</h2>
      <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn primary">Create account</button>
    </form>
  );
}

function Profile(){
  const [form,setForm]=useState({ name:'', bio:'', skills:'', interests:'', location:'', partnerType:'Collaborator' });
  React.useEffect(()=>{ (async()=>{ const u=await me(); setForm({
    name:u.name||'', bio:u.bio||'', skills:(u.skills||[]).join(', '), interests:(u.interests||[]).join(', '),
    location:u.location||'', partnerType:u.partnerType||'Collaborator'
  }); })(); },[]);
  async function save(){
    const payload={...form, skills:form.skills.split(',').map(s=>s.trim()).filter(Boolean), interests:form.interests.split(',').map(s=>s.trim()).filter(Boolean)};
    await updateMe(payload);
    alert('Saved');
  }
  return (
    <div className="card" style={{maxWidth:720, margin:'20px auto'}}>
      <h2 style={{fontFamily:'var(--font-serif)'}}>Your profile</h2>
      <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <textarea className="input" placeholder="Bio" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} />
      <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
      <input className="input" placeholder="skills (comma separated)" value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})} />
      <input className="input" placeholder="interests (comma separated)" value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})} />
      <select className="input" value={form.partnerType} onChange={e=>setForm({...form,partnerType:e.target.value})}>
        {['Co-founder','Collaborator','Mentor','Investor','Other'].map(o=> <option key={o}>{o}</option>)}
      </select>
      <button className="btn primary" onClick={save}>Save</button>
    </div>
  );
}

function Discover(){
  const [q,setQ]=useState('');
  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);
  async function load(){ setLoading(true); const u = await discover(q); setUsers(u); setLoading(false); }
  React.useEffect(()=>{ load(); },[]);
  return (
    <div>
      <div className="card" style={{marginBottom:16}}>
        <input className="input" placeholder="Search by name or skill" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn primary" onClick={load} style={{marginTop:8}}>Search</button>
      </div>
      {loading ? <div>Loading…</div> : (
        <div className="list">
          {users.map(u => (
            <div className="card" key={u._id}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <h3 style={{margin:'4px 0', fontFamily:'var(--font-serif)'}}>{u.name}</h3>
                  <div style={{marginTop:6}}>
                    {(u.skills||[]).slice(0,4).map(s => <span className="tag" key={s}>{s}</span>)}
                  </div>
                </div>
                <button className="btn">Connect</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Connections(){
  const [items,setItems]=useState([]);
  const meId = getUserId();
  React.useEffect(()=>{ (async()=> setItems(await myConnections()))(); },[]);
  return (
    <div className="list">
      {items.map((c,i) => {
        const otherUser = String(c.requester._id) === String(meId) ? c.recipient : c.requester;
        return (
          <div className="card" key={c._id || i}>
            <h3 style={{fontFamily:'var(--font-serif)'}}>{otherUser.name}</h3>
            <div style={{margin:'6px 0'}}>
              {(otherUser.skills||[]).slice(0,4).map(s=> <span className="tag" key={s}>{s}</span>)}
            </div>
            <Link className="btn primary" to={`/chat/${otherUser._id}`}>Open chat</Link>
          </div>
        );
      })}
    </div>
  );
}

function Chat(){
  const { withId } = useParams();
  const [messages,setMessages]=useState([]);
  const [text,setText]=useState('');
  const [sock,setSock]=useState(null);
  const viewRef = React.useRef(null);
  React.useEffect(()=>{ (async()=> setMessages(await thread(withId)))(); },[withId]);
  React.useEffect(()=>{
    const s = makeSocket(localStorage.getItem('token'));
    setSock(s);
    s.on('message:recv', (msg)=>{
      if ((String(msg.from)===String(withId))||(String(msg.to)===String(withId))) setMessages(prev=>[...prev, msg]);
    });
    return ()=> s.disconnect();
  },[withId]);
  React.useEffect(()=>{ viewRef.current?.scrollTo(0, 999999); },[messages]);
  function send(){ if(!text.trim()) return; sock.emit('message:send', { to: withId, content: text.trim() }); setText(''); }
  return (
    <div className="card">
      <div ref={viewRef} className="chat" style={{overflowY:'auto'}}>
        {messages.map((m, i) => (
          <div key={m._id || i} className={`bubble ${String(m.from)===String(withId)?'them':'me'}`}>{m.content}</div>
        ))}
      </div>
      <div style={{display:'flex', gap:8}}>
        <input className="input" placeholder="Type a message" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} />
        <button className="btn primary" onClick={send}>Send</button>
      </div>
    </div>
  );
}

function App(){
  const nav = useNavigate();
  function logout(){ localStorage.clear(); nav('/'); }
  return (
    <>
      <nav className="nav">
        <strong>CoFoundr</strong>
        <Link to="/discover" className="btn ghost">Discover</Link>
        <Link to="/connections" className="btn ghost">Connections</Link>
        <Link to="/profile" className="btn ghost">Profile</Link>
        <span style={{flex:1}}/>
        <button className="btn ghost" onClick={logout}>Logout</button>
      </nav>
      <div className="container">
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/discover" element={<Discover/>} />
          <Route path="/connections" element={<Connections/>} />
          <Route path="/chat/:withId" element={<Chat/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

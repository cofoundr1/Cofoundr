const API = import.meta.env.VITE_API_BASE;
export const setToken = (t) => localStorage.setItem('token', t);
export const getToken = () => localStorage.getItem('token');
const headers = () => ({ 'Content-Type':'application/json', Authorization:`Bearer ${getToken()||''}` });

export function getUserId(){
  try{
    const token = getToken();
    if(!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.uid || payload.userId || null;
  }catch{ return null; }
}

export async function signup(payload){
  const r = await fetch(`${API}/auth/signup`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
  if(!r.ok) throw new Error('Signup failed'); return r.json();
}
export async function login(payload){
  const r = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
  if(!r.ok) throw new Error('Login failed'); return r.json();
}
export async function me(){ const r = await fetch(`${API}/users/me`, { headers: headers() }); if(!r.ok) throw 0; return r.json(); }
export async function updateMe(data){ const r = await fetch(`${API}/users/me`, { method:'PUT', headers: headers(), body: JSON.stringify(data)}); return r.json(); }
export async function discover(q=''){ const r = await fetch(`${API}/users/discover?q=${encodeURIComponent(q)}`, { headers: headers() }); return r.json(); }
export async function myConnections(){ const r = await fetch(`${API}/connections/mine`, { headers: headers() }); return r.json(); }
export async function requestConnection(id){ const r = await fetch(`${API}/connections/request/${id}`, { method:'POST', headers: headers() }); return r.json(); }
export async function thread(withId){ const r = await fetch(`${API}/messages/thread/${withId}`, { headers: headers() }); return r.json(); }

const API = process.env.EXPO_PUBLIC_API || 'http://localhost:4000';
export const tokenStore = { t: '' };
export const setToken = (t:string)=> tokenStore.t=t;
const headers = ()=> ({ 'Content-Type':'application/json', Authorization:`Bearer ${tokenStore.t}` });
export async function login(payload:any){ const r= await fetch(`${API}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); if(!r.ok) throw 0; return r.json(); }
export async function signup(payload:any){ const r= await fetch(`${API}/auth/signup`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); if(!r.ok) throw 0; return r.json(); }
export async function me(){ const r= await fetch(`${API}/users/me`,{headers:headers()}); return r.json(); }
export async function discover(){ const r= await fetch(`${API}/users/discover`,{headers:headers()}); return r.json(); }
export async function thread(withId:string){ const r= await fetch(`${API}/messages/thread/${withId}`,{headers:headers()}); return r.json(); }

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { login, setToken } from '../api';

export default function LoginScreen({ navigation, onAuthed }:{ navigation:any, onAuthed:()=>void }){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  async function submit(){ try{ const { token } = await login({ email, password }); setToken(token); onAuthed(); }catch{ setErr('Invalid credentials'); } }
  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:28, fontWeight:'700', marginBottom:12 }}>CoFoundr</Text>
      {err? <Text style={{ color:'crimson' }}>{err}</Text>:null}
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={{ borderWidth:1, padding:12, marginBottom:8 }} />
      <TextInput placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth:1, padding:12, marginBottom:8 }} />
      <Button title='Log in' onPress={submit} />
      <Text style={{ marginTop:12 }} onPress={()=>navigation.navigate('Signup')}>No account? Sign up</Text>
    </View>
  );
}

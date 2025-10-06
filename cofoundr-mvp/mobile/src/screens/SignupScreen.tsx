import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signup, setToken } from '../api';

export default function SignupScreen({ onAuthed, navigation }:{ onAuthed:()=>void, navigation:any }){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  async function submit(){ const { token } = await signup({ name, email, password }); setToken(token); onAuthed(); }
  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:28, fontWeight:'700', marginBottom:12 }}>Create account</Text>
      <TextInput placeholder='Full name' value={name} onChangeText={setName} style={{ borderWidth:1, padding:12, marginBottom:8 }} />
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={{ borderWidth:1, padding:12, marginBottom:8 }} />
      <TextInput placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth:1, padding:12, marginBottom:8 }} />
      <Button title='Sign up' onPress={submit} />
      <Text style={{ marginTop:12 }} onPress={()=>navigation.goBack()}>Back to login</Text>
    </View>
  );
}

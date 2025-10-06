import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text } from 'react-native';
import { thread } from '../api';
import { makeSocket } from '../socket';
import { tokenStore } from '../api';

export default function ChatScreen({ route }:{ route:any }){
  const { withId } = route.params;
  const [messages,setMessages]=useState<any[]>([]);
  const [text,setText]=useState('');
  const viewRef = useRef<ScrollView>(null);

  useEffect(()=>{ (async()=> setMessages(await thread(withId)))(); },[withId]);
  useEffect(()=>{
    const s = makeSocket(tokenStore.t);
    s.on('message:recv', (m:any)=>{ if(String(m.from)===String(withId) || String(m.to)===String(withId)) setMessages(p=>[...p,m]); });
    return ()=> s.disconnect();
  },[withId]);

  function send(){ if(!text.trim()) return; const s = makeSocket(tokenStore.t); s.emit('message:send', { to: withId, content: text.trim() }); setText(''); }

  return (
    <View style={{ flex:1, padding:12 }}>
      <ScrollView ref={viewRef} style={{ flex:1 }}>
        {messages.map((m,i)=> (
          <Text key={i} style={{ alignSelf: String(m.from)===String(withId)?'flex-start':'flex-end', backgroundColor: String(m.from)===String(withId)?'#eee':'#0F172A', color: String(m.from)===String(withId)?'#000':'#fff', padding:8, marginVertical:4, borderRadius:8 }}>{m.content}</Text>
        ))}
      </ScrollView>
      <View style={{ flexDirection:'row', gap:8 }}>
        <TextInput value={text} onChangeText={setText} placeholder='Type a message' style={{ borderWidth:1, flex:1, padding:10, borderRadius:8 }} />
        <Button title='Send' onPress={send} />
      </View>
    </View>
  );
}

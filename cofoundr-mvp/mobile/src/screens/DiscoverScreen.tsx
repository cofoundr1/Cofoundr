import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { discover } from '../api';

export default function DiscoverScreen({ navigation }:{ navigation:any }){
  const [users,setUsers]=useState<any[]>([]);
  useEffect(()=>{ (async()=> setUsers(await discover()))(); },[]);
  return (
    <ScrollView style={{ padding:16 }}>
      {users.map(u=> (
        <View key={u._id} style={{ borderWidth:1, padding:12, marginBottom:10 }}>
          <Text style={{ fontSize:18, fontWeight:'700' }}>{u.name}</Text>
          <Text>{(u.skills||[]).slice(0,4).join(' · ')}</Text>
          <Button title='Chat' onPress={()=>navigation.navigate('Chat', { withId: u._id })} />
        </View>
      ))}
    </ScrollView>
  );
}

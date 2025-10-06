import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();
export default function App(){
  const [authed,setAuthed] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authed ? (
          <>
            <Stack.Screen name="Discover" component={DiscoverScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown:false }}>
              {props => <LoginScreen {...props} onAuthed={()=>setAuthed(true)} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" options={{ headerShown:false }}>
              {props => <SignupScreen {...props} onAuthed={()=>setAuthed(true)} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

mkdir -p server/src/{models,routes,middleware} web/src/{pages,styles} mobile/src/{screens}
touch server/{package.json,.env.example} \
      server/src/{index.js,config.js,db.js} \
      server/src/models/{User.js,Message.js,Connection.js} \
      server/src/routes/{auth.js,users.js,connections.js,messages.js} \
      server/src/middleware/auth.js \
      web/{package.json,index.html,.env.example} \
      web/src/{main.jsx,App.jsx,api.js,socket.js} \
      web/src/pages/{Home.jsx,Login.jsx,Signup.jsx,Profile.jsx,Discover.jsx,Connections.jsx,Chat.jsx} \
      web/src/styles/tokens.css \
      mobile/{package.json,app.json} \
      mobile/src/{App.tsx,api.ts,socket.ts} \
      mobile/src/screens/{LoginScreen.tsx,SignupScreen.tsx,DiscoverScreen.tsx,ChatScreen.tsx}

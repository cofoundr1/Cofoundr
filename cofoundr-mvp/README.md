# CoFoundr – Monorepo (Web + Mobile + API)

## Run API (server)
```bash
cd server
cp .env.example .env   # set MONGO_URI + JWT_SECRET
npm i
npm run dev
```

## Run Web
```bash
cd web
cp .env.example .env   # set VITE_API_BASE + VITE_SOCKET_URL
npm i
npm run dev
```

## Mobile (Expo Snack)
Use the code in `mobile/src` with snack.expo.dev and set:
```js
const API = "https://4000-<your-codespace>.github.dev";
const SOCKET = "https://4000-<your-codespace>.github.dev";
```

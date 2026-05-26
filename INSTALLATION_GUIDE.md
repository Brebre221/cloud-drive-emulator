# 🚀 Complete Installation Guide

## Step 1: Clone Repository

```bash
git clone https://github.com/Brebre221/cloud-drive-emulator.git
cd cloud-drive-emulator
```

## Step 2: Install Backend

```bash
cd backend
npm install
```

## Step 3: Install Mobile App

```bash
cd ../mobile
npm install
```

## Step 4: Configure Environment

```bash
cp ../.env.example ../.env
# Edit .env if needed
```

## Step 5: Start Backend

```bash
cd ../backend
npm run dev
```

Backend should now run at `http://localhost:3000`

## Step 6: Run Mobile App

```bash
cd ../mobile
npm start

# In another terminal:
# For iOS:
npm run ios

# For Android:
npm run android
```

## Step 7: Login

- **Email:** demo@example.com
- **Password:** demo123

## 🎮 Start Playing!

Browse games, play them with the virtual controller, and enjoy!

## 📱 Build APK

```bash
cd mobile
npm run build:apk
```

APK will be at: `mobile/android/app/build/outputs/apk/release/app-release.apk`

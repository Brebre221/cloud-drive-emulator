# Cloud Gaming Emulator Platform

A comprehensive mobile-first cloud gaming platform supporting multiple gaming systems with hybrid emulation (local + cloud streaming).

## 🎮 Supported Gaming Systems

- **Classic Consoles**: NES, SNES, Genesis/Mega Drive, N64
- **Handheld**: GameBoy, GameBoy Color, Game Boy Advance
- **PlayStation**: PS1, PS2
- **Arcade**: MAME, FBA
- **Atari**: 2600, 7800

## ✨ Features

### Core Features
- 🚀 **Hybrid Emulation**: Local emulation on device + cloud streaming option
- ☁️ **Cloud Storage**: Store and sync games across devices
- 📱 **Mobile-First**: React Native app (iOS/Android)
- 🕹️ **Controller Support**: Bluetooth gamepad compatibility
- 💾 **Cloud Saves**: Automatic save game synchronization
- 👤 **User Accounts**: Authentication & cloud profile management
- 🎯 **Game Library**: Search, filter, and organize games
- 📊 **Progress Tracking**: Play time, achievements, statistics
- 🔄 **Cross-Device Sync**: Resume games on any device

### Backend Features
- Node.js/Express REST API
- AWS S3 cloud storage integration
- Real-time WebSocket for cloud streaming
- Video encoding for cloud gaming
- Database for user accounts & progress

## 📁 Project Structure

```
cloud-drive-emulator/
├── mobile/                 # React Native mobile app
│   ├── ios/               # iOS native code
│   ├── android/           # Android native code
│   ├── src/
│   │   ├── screens/       # Game library, player, settings
│   │   ├── components/    # UI components
│   │   ├── services/      # API, emulation, storage
│   │   ├── store/         # Redux state management
│   │   └── config/        # App configuration
│   └── package.json
│
├── backend/               # Node.js/Express API server
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Auth, validation
│   │   ├── services/      # Cloud storage, emulation
│   │   └── config/        # Database, AWS config
│   ├── emulators/         # Emulator wrappers
│   └── package.json
│
├── web/                   # Web PWA (optional)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── package.json
│
├── docker-compose.yml     # Local development setup
├── .env.example           # Environment variables
└── docs/                  # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- React Native CLI
- Docker & Docker Compose
- Xcode (iOS) or Android Studio (Android)
- AWS Account (for S3 storage)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Brebre221/cloud-drive-emulator.git
   cd cloud-drive-emulator
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Mobile
   cd ../mobile && npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your AWS credentials and settings
   ```

4. **Start backend services**
   ```bash
   docker-compose up -d
   npm start  # Backend
   ```

5. **Run mobile app**
   ```bash
   cd mobile
   npm start              # Metro bundler
   npx react-native run-ios    # or run-android
   ```

## 🏗️ Architecture

### Mobile App (React Native)
- **State Management**: Redux Toolkit
- **UI Framework**: React Native + NativeBase
- **Emulation**: JavaScript emulator engines
- **Storage**: SQLite + Cloud sync
- **Networking**: Axios + WebSocket

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: PostgreSQL + Redis
- **Cloud Storage**: AWS S3
- **Streaming**: FFmpeg + WebRTC
- **Authentication**: JWT + OAuth2

### Emulator Engines
- **NES/SNES**: jsnes, bsnes-web
- **Genesis**: Mega.js
- **N64**: Mupen64Plus-JS
- **GameBoy**: Gambatte.js
- **PS1**: DuckStation
- **Arcade**: MAME

## 🔧 Configuration

### Cloud Storage Setup (AWS S3)
```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=cloud-gaming-bucket
AWS_REGION=us-east-1
```

### Emulation Modes
- **Local**: Full emulation on device (better performance, higher CPU usage)
- **Streaming**: Video stream from cloud server (lower device load, needs good internet)
- **Hybrid**: Automatic switching based on device capacity

## 📱 Mobile App Features

### Game Library Screen
- Browse all games by system
- Search and filter capabilities
- Recently played section
- Favorites management
- Game details (year, developer, ratings)

### Game Player Screen
- Full-screen emulation
- Virtual controller overlay
- Bluetooth gamepad support
- Save/Load game states
- Take screenshots
- Adjust emulation speed

### Cloud Sync
- Automatic save uploads
- Cross-device resume
- Backup management
- Storage quota tracking

### Settings
- Controller configuration
- Emulation quality settings
- Cloud storage options
- Account management
- Download management

## 🔐 Authentication

- JWT-based authentication
- OAuth2 support (Google, GitHub)
- Secure token refresh
- Device trust management

## 📡 API Endpoints

```
Auth:
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/refresh

Games:
  GET    /api/games              # List all games
  GET    /api/games/:id          # Game details
  POST   /api/games/upload       # Upload ROM
  DELETE /api/games/:id          # Delete game

Saves:
  GET    /api/saves/:gameId      # Get save states
  POST   /api/saves              # Upload save
  DELETE /api/saves/:id          # Delete save

Streaming:
  WS     /api/stream/:gameId     # Cloud streaming
  POST   /api/stream/start       # Start stream
  POST   /api/stream/stop        # Stop stream

Profile:
  GET    /api/profile
  PUT    /api/profile
  GET    /api/profile/progress
```

## 🎯 Roadmap

- [ ] MVP: NES, SNES, Genesis support
- [ ] Mobile app (iOS/Android)
- [ ] Cloud save syncing
- [ ] Cloud streaming
- [ ] Multiplayer support
- [ ] Achievement system
- [ ] Social features
- [ ] Web PWA
- [ ] Game recommendations
- [ ] Community game sharing

## 📚 Documentation

See `/docs` for detailed documentation:
- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Mobile Development](docs/MOBILE.md)
- [Cloud Setup](docs/CLOUD_SETUP.md)
- [Contributing Guide](docs/CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md)

## 📄 License

MIT License - See LICENSE file

## 🙏 Credits

- Emulator projects: jsnes, Mega.js, DuckStation, MAME
- Open-source gaming community

## 📞 Support

- Issues: [GitHub Issues](https://github.com/Brebre221/cloud-drive-emulator/issues)
- Discussions: [GitHub Discussions](https://github.com/Brebre221/cloud-drive-emulator/discussions)

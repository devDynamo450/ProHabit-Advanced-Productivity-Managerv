# ProHabit: Advanced Productivity Manager

ProHabit is a cutting-edge Task & Habit manager built with modern web technologies. It is designed to be lightning-fast, offline-capable, and completely serverless.

## 🚀 Advanced Technologies Used

- **Next.js 16 (App Router)**: The core framework providing automatic code splitting, lazy loading, and edge serverless APIs.
- **TypeScript**: End-to-end type safety for rock-solid reliability.
- **Progressive Web App (PWA)**: Implements offline caching, installability, and push notification access via `next-pwa`.
- **GraphQL & Apollo**: Replaces legacy REST architectures with an efficient GraphQL endpoint hosted entirely in a Serverless Next.js API Route.
- **MongoDB & Mongoose**: Advanced document-based database for scalable task storage.
- **Tailwind CSS**: A beautiful, micro-animation rich, and responsive glassmorphic UI.
- **Vitest & React Testing Library**: For comprehensive unit and UI testing.

## 🛠️ Setup & Deployment

### Local Setup
1. Define `MONGODB_URI` in `.env.local` to point to a MongoDB instance.
2. Run `npm install`
3. Run `npm run dev` to start the local server.

### Advanced Deployment & Monitoring
This application is perfectly tuned for **Vercel**:
1. Push this repository to GitHub.
2. Import it in Vercel.
3. Vercel automatically detects the Next.js framework, sets up Edge Caching for the PWA assets, and provides advanced Analytics & Speed Insights natively.
4. **Error Handling**: Native `error.tsx` boundaries capture all client-side crashes, ready to be piped into tools like Sentry.

## 🧪 Testing Strategy
Run tests using Vitest:
```bash
npm run test
```

## 📈 Performance Optimizations
- **Image Optimization**: Custom logos are served via `next/image` ensuring optimal formats (WebP/AVIF).
- **Dynamic Imports**: Large components like `TaskList` are loaded asynchronously, dropping initial page load times.
- **Real-Time Polling**: Simulates WebSocket live sync without maintaining expensive persistent server connections.

Enjoy unparalleled productivity with ProHabit!

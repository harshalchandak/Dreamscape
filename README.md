# Dreamscape
> AI-powered Dream Journal & Pattern Analyzer

## Problem Statement
Millions of people experience vivid dreams but have no structured way to track or interpret them. Dream patterns often carry emotional signals — anxiety, recurring fears, unresolved conflicts — that go unnoticed. Dreamscape combines journaling with AI-powered symbolic and emotional analysis in a beautiful, private space.

## Features
- Dream journaling with mood tracking
- AI pattern analysis
- Emotion trend visualization
- Streak tracking

## Tech Stack
React 19, Firebase (Auth & Firestore), Tailwind CSS, Recharts, Framer Motion

## Setup
1. Clone the repo
2. `npm install`
3. Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
4. `npm run dev`

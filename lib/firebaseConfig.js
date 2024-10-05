// lib/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';  // Add this line for Firebase Storage
// Firebase configuration (from .env.local or Firebase console)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,  // Add storage bucket
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,  // This is necessary
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);  // Initialize Firebase Storage

export { app, storage };

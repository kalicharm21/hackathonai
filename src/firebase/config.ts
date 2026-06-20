import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAurDjg_Z6IADZJEYkFs_6Jk3vaIIlTVhY",
  authDomain: "gen-lang-client-0009137549.firebaseapp.com",
  projectId: "gen-lang-client-0009137549",
  storageBucket: "gen-lang-client-0009137549.firebasestorage.app",
  messagingSenderId: "378502765729",
  appId: "1:378502765729:web:e0c434fb85f32c230aa4e0"
};

// Handle optional multi-database names
export const firestoreDatabaseId = "ai-studio-26735b85-6a76-46dc-88d7-b8643d956007";

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
export const auth = getAuth(app);

// Initialize Firestore targeting the specific database ID from the console config
export const db = initializeFirestore(app, {
  databaseId: firestoreDatabaseId
} as any);

export default app;

// Firebase configuration for Nathan's Birthday App
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// You'll need to replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyAdb2e9jDJkI_mr4aiasHxd6JNAWgLTvI4",
  authDomain: "nathan-a77e1.firebaseapp.com",
  projectId: "nathan-a77e1",
  storageBucket: "nathan-a77e1.firebasestorage.app",
  messagingSenderId: "2813724436",
  appId: "1:2813724436:web:8d4f54b52c7dcb59242401",
  measurementId: "G-99ELQ1KKPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app; 
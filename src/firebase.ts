import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  apiKey: 'AIzaSyCFxwaf8RFjIHi1Yn4b38MRUsfimAcKiws',
  authDomain: 'saunter-cd93e.firebaseapp.com',
  projectId: 'saunter-cd93e',
  storageBucket: 'saunter-cd93e.firebasestorage.app',
  messagingSenderId: '845204722448',
  appId: '1:845204722448:web:d6f20baee071fd42c24b95',
  measurementId: 'G-YYJ68T2QZ9'
};


const app = initializeApp( firebaseConfig );
export const db = getFirestore( app );
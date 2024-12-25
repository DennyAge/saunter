import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
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
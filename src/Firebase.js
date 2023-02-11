// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCtQgtbiYfMVJ_-1USCryYCu-LLgSQMUEc',
	authDomain: 'realtore-clone-7a3fb.firebaseapp.com',
	projectId: 'realtore-clone-7a3fb',
	storageBucket: 'realtore-clone-7a3fb.appspot.com',
	messagingSenderId: '182221127263',
	appId: '1:182221127263:web:b28e359823aca39f0e65ea',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getFirestore(app)
export default db


export const storage = getStorage(app)
export const storageRef = ref(storage);


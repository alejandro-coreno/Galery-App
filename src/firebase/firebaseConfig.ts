// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAao5Vp4U_objXpUTiN0W8bgy7WWngxglM",
  authDomain: "sistema-informacion-d1be4.firebaseapp.com",
  projectId: "sistema-informacion-d1be4",
  storageBucket: "sistema-informacion-d1be4.appspot.com",
  messagingSenderId: "167314025297",
  appId: "1:167314025297:web:898ef32c3e424329f78170"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const storage = getStorage(app);

export { db, auth, storage, ref };
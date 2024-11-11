// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtlIPBfQh0QqnvTF-n_eCblGtq2xb4EqQ",
  authDomain: "email-password-auth-6f4a9.firebaseapp.com",
  projectId: "email-password-auth-6f4a9",
  storageBucket: "email-password-auth-6f4a9.firebasestorage.app",
  messagingSenderId: "325619314100",
  appId: "1:325619314100:web:d30585425a04acb75356e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
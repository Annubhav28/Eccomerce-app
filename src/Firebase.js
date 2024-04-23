// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgF6sdrboOuKVFcvaOkghYLOQiWW-C0PE",
  authDomain: "fash-eccom.firebaseapp.com",
  projectId: "fash-eccom",
  storageBucket: "fash-eccom.appspot.com",
  messagingSenderId: "805348424106",
  appId: "1:805348424106:web:490733ee56431ec907d3d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
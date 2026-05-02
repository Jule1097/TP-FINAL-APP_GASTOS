// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXQngNZX1gjb_03pWCsSsyFEubrdasVZk",
  authDomain: "tp3---gestor-de-gastos.firebaseapp.com",
  databaseURL: "https://tp3---gestor-de-gastos-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tp3---gestor-de-gastos",
  storageBucket: "tp3---gestor-de-gastos.firebasestorage.app",
  messagingSenderId: "52896218835",
  appId: "1:52896218835:web:4cc762c026209cf82d9e26",
  measurementId: "G-G80H27L0WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBexxb86lXMFcwOFStkwTLcMkleIAfJ2H4",
  authDomain: "artgallery-9ef55.firebaseapp.com",
  projectId: "artgallery-9ef55",
  storageBucket: "artgallery-9ef55.appspot.com",
  messagingSenderId: "252998442995",
  appId: "1:252998442995:web:386eb1ac24b65316617c86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID    
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// const firebaseConfig = {
//     apiKey: "AIzaSyAtwAhkn50rv6oX6pXGL-pQnaog5MDOZsg",
//     authDomain: "language-learning-platfo-40408.firebaseapp.com",
//     databaseURL: "https://language-learning-platfo-40408-default-rtdb.firebaseio.com",
//     projectId: "language-learning-platfo-40408",
//     storageBucket: "language-learning-platfo-40408.appspot.com",
//     messagingSenderId: "1087066473453",
//     appId: "1:1087066473453:web:42a550ae24ee64b7115de4",
//     measurementId: "G-7Q4V2K5QKZ"
// };
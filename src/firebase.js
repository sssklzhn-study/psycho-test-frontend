import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";

// Твоя Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyBGfXz_T8k2DV2Q_hOC8cOXzoX_IkgHHsA",
  authDomain: "psychotesting2026new.firebaseapp.com",
  projectId: "psychotesting2026new",
  storageBucket: "psychotesting2026new.firebasestorage.app",
  messagingSenderId: "545408689654",
  appId: "1:545408689654:web:a2b3c7cd6257ee545ed3d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Экспортируем методы для удобства
export { signInAnonymously, signInWithEmailAndPassword };
export default app;
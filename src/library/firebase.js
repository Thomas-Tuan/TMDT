// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCjVacN4ZVuxUjoSKYrM7C61n83gb5MHho",
    authDomain: "furnitureshop-94961.firebaseapp.com",
    projectId: "furnitureshop-94961",
    storageBucket: "furnitureshop-94961.appspot.com",
    messagingSenderId: "631222853000",
    appId: "1:631222853000:web:09b0b34a33c34fc200ee3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
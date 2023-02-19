import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAhCBqi7lN3APXhui0hNXLvXn8N5nhaBqs",
  authDomain: "chakra-hub-chatapp.firebaseapp.com",
  projectId: "chakra-hub-chatapp",
  storageBucket: "chakra-hub-chatapp.appspot.com",
  messagingSenderId: "206366116226",
  appId: "1:206366116226:web:a4ad7e12eabc2d7ecb279b"
};

export const app = initializeApp(firebaseConfig);
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBN2MyxNjeuUnvnL0SZ70mGscSjzGXQY7Y",
  authDomain: "star-hotel-ab99d.firebaseapp.com",
  projectId: "star-hotel-ab99d",
  storageBucket: "star-hotel-ab99d.appspot.com",
  messagingSenderId: "400376263819",
  appId: "1:400376263819:web:5d929d19b0d2bf1fcfd08e"
};

export const app = initializeApp(firebaseConfig);
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBN2MyxNjeuUnvnL0SZ70mGscSjzGXQY7Y",
//   authDomain: "star-hotel-ab99d.firebaseapp.com",
//   projectId: "star-hotel-ab99d",
//   storageBucket: "star-hotel-ab99d.appspot.com",
//   messagingSenderId: "400376263819",
//   appId: "1:400376263819:web:5d929d19b0d2bf1fcfd08e"
// };

// export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnDTvBGwPMxYxVX45pAfgouuwCKSYIbKM",
  authDomain: "star-hotel-ab99d.firebaseapp.com",
  databaseURL: "https://star-hotel-ab99d-default-rtdb.firebaseio.com",
  projectId: "star-hotel-ab99d",
  storageBucket: "star-hotel-ab99d.appspot.com",
  messagingSenderId: "400376263819",
  appId: "1:400376263819:web:55ce41ca7f15ad47cfd08e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
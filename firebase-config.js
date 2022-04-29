import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4xCJinMh_YQVnS22Ihls3LyZBlnGi3Hs",
  authDomain: "todo-list-2a7c3.firebaseapp.com",
  projectId: "todo-list-2a7c3",
  storageBucket: "todo-list-2a7c3.appspot.com",
  messagingSenderId: "497695372579",
  appId: "1:497695372579:web:b9348b48bbf2d0deb04896"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
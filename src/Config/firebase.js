import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhAnJs3F-96OVU6sCnTNIsyCI5ITyqi6I",
  authDomain: "ecommerce-react-14462.firebaseapp.com",
  projectId: "ecommerce-react-14462",
  storageBucket: "ecommerce-react-14462.appspot.com",
  messagingSenderId: "1039232576631",
  appId: "1:1039232576631:web:981c7615440d5b714d2a72",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

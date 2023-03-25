import logo from './logo.svg';
import './App.css';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1i1KcrVBmvNY1CxeKdjhM6_XIgSQ45FY",
  authDomain: "fifadraft-614b0.firebaseapp.com",
  projectId: "fifadraft-614b0",
  storageBucket: "fifadraft-614b0.appspot.com",
  messagingSenderId: "797524994217",
  appId: "1:797524994217:web:ea84780db1ca017ca261b8",
  measurementId: "G-FMGZ95DBN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;


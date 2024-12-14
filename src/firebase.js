import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDRIRfXDWptrikxoA5jv1bsflukna4olrs",
    authDomain: "doomsday-a8ffc.firebaseapp.com",
    projectId: "doomsday-a8ffc",
    storageBucket: "doomsday-a8ffc.appspot.com",  // Corrected
    messagingSenderId: "225028807712",
    appId: "1:225028807712:web:b069450d721b1f5a903045",
    measurementId: "G-EZVW0GG4DH"
};


const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export  const firestore = getFirestore(app);
export default app;
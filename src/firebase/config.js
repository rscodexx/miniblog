import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCK457KXrm8jN3-aGBAWFUSBdY-vX8MDQg",
    authDomain: "miniblog-17295.firebaseapp.com",
    projectId: "miniblog-17295",
    storageBucket: "miniblog-17295.appspot.com",
    messagingSenderId: "715800758802",
    appId: "1:715800758802:web:8e3cf9bb1efde3664666cb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

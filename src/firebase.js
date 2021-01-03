import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnjoXZd7IXXE0Y3N3W1urGBCkuy_MD1SI",
    authDomain: "image-shuffler-ui.firebaseapp.com",
    projectId: "image-shuffler-ui",
    storageBucket: "image-shuffler-ui.appspot.com",
    messagingSenderId: "248707663508",
    appId: "1:248707663508:web:ae5c5cb62086ec74edd681",
    measurementId: "G-VMBDJXJ60L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage, db };
export default db;
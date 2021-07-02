// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBF0XtIqF4qOEbNtTqdPmzIz7r2cA-wR2Y",
    authDomain: "todo-app-91d28.firebaseapp.com",
    projectId: "todo-app-91d28",
    storageBucket: "todo-app-91d28.appspot.com",
    messagingSenderId: "654638863840",
    appId: "1:654638863840:web:cd1c0a2915c5b16c9d8785",
    measurementId: "G-3MY0D92DCS"
});

const db = firebaseApp.firestore();

export default db;

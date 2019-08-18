import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAXrE28BUwq-Mp6m4vBmgb97Rpok_S-Ydk",
    authDomain: "expensify-me.firebaseapp.com",
    databaseURL: "https://expensify-me.firebaseio.com",
    projectId: "expensify-me",
    storageBucket: "",
    messagingSenderId: "590032757664",
    appId: "1:590032757664:web:39e206e336dd8582"
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

export {firebase, googleAuthProvider, database as default};


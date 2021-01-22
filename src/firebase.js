import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC_CXfQjnjDOf4Fu66x47C69WOqWQKswWo",
    authDomain: "rhyzode.firebaseapp.com",
    databaseURL: "https://rhyzode-default-rtdb.firebaseio.com",
    projectId: "rhyzode",
    storageBucket: "rhyzode.appspot.com",
    messagingSenderId: "744852588542",
    appId: "1:744852588542:web:f644c6cba55c5fa65462af",
    measurementId: "G-7ET7YFL8C2"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.database();
export const storage = firebase.storage()

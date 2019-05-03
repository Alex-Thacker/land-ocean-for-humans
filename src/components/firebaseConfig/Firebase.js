import firebase from 'firebase/app'
import 'firebase/storage'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAttIVmROFZ8uBxiHQEoqXJrDO8FH-A6eQ",
    authDomain: "land-ocean-76341.firebaseapp.com",
    databaseURL: "https://land-ocean-76341.firebaseio.com",
    projectId: "land-ocean-76341",
    storageBucket: "land-ocean-76341.appspot.com",
    messagingSenderId: "92845425666"
};
firebase.initializeApp(config);

const storage = firebase.storage()

export {
    storage, firebase as default
}
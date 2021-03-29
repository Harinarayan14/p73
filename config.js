import firebase from 'firebase'
require("@firebase/firestore")



var firebaseConfig = {
  apiKey: "AIzaSyBplLkm8W3T6JOJoSTd0gCl3A_GWB8ScVA",
  authDomain: "stories-app123.firebaseapp.com",
  projectId: "stories-app123",
  storageBucket: "stories-app123.appspot.com",
  messagingSenderId: "439320085738",
  appId: "1:439320085738:web:58ebc58a44e43cd0ea0393"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();

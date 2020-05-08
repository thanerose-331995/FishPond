
//-------------------- DATABASE CONFIG

var firebaseConfig = {
    apiKey: "AIzaSyDWZIlMrHn0gXM8K4IhthYxXw8tyB3ks48",
    authDomain: "fishpond-pwa.firebaseapp.com",
    databaseURL: "https://fishpond-pwa.firebaseio.com",
    projectId: "fishpond-pwa",
    storageBucket: "fishpond-pwa.appspot.com",
    messagingSenderId: "986686776620",
    appId: "1:986686776620:web:69dbf122ef36afb28cb889",
    measurementId: "G-Q2TLGC8KV4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

//offline data
db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            console.log('persistence failed, are there multiple tabs open?');
        }
        else if (err.code == 'unimplemented') {
            console.log('persistence failed, not avalible in this browser.');
        }
    })
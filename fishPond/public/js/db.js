
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
const storage = firebase.storage();
const storageRef = storage.ref(); // a reference point for the storage

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

// ------- FILE HANDING ---

//upload file
function upload(file, urlRef, callback) {
    storageRef.child(urlRef).put(file).then(function (snapshot) {
        callback(snapshot);
    })
}

//get file url to use in app
function download(urlRef, callback) {
    storageRef.child(urlRef).getDownloadURL().then(function (url) {
        callback(url)
    }).catch(err => { callback(err) })
}
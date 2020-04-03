
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


//realtime listener
function getSnapshot() {
    db.collection('fish').onSnapshot(snapshot => {
        //gets a snapshot of this collection whenever theres a change
        console.log(snapshot.docChanges());
        snapshot.docChanges().forEach(change => {
            console.log(change, change.doc.data(), change.doc.id)
            if (change.type === 'added') {
                //add data
                const loc = sessionStorage.getItem("location");
                //getFish(city);
                if (change.doc.data().city == loc) {
                    displayFish(change.doc.data(), change.doc.id);
                }
            }
            if (change.type === 'removed') {
                //remove data
                removePet(change.doc.id);
            }
        })
    })
}

// function getFish(city) {
//     db.collection('fish').where('city', '==', city).get().then((snapshot) => {
//         console.log(snapshot.docs.length);
//         snapshot.docs.forEach(doc => {
//         })
//     })
// }

//add fish
function addFish() {
    const form = $(".add-fish").find("form")[0];

    const fish = {
        name: form.name.value,
        city: form.city.value,
        color: form.colorSelect.value,
        origin: form.origin.value,
        parent: form.parent.value
    }

    var valid = true;
    for (var val in fish) {
        if (val == "") {
            valid = false;
        }
    }

    if (valid) {
        console.log("add: ", fish);
        db.collection('fish').add(fish).catch(err => { console.log(err) });
    }
}

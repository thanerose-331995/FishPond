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
// db.collection('fish').onSnapshot((snapshot) => {
//     //gets a snapshot of this collection whenever theres a change
//     console.log(snapshot.docChanges());
//     snapshot.docChanges().forEach(change => {
//         console.log(change, change.doc.data(), change.doc.id);
//         if (change.type === 'added') {
//             //add data
//             getFish();
//         }
//         if (change.type === 'removed') {
//             //remove data
//             removePet(change.doc.id);
//         }
//     });
// })

function getFish() {
    console.log("check");
    db.collection('fish').where('city', '==', 'bath').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            displayFish(doc.data(), doc.id);
        })
    })
}

// //add pet
// const form = document.querySelector('form');

// form.addEventListener('submit', evt => {
//     evt.preventDefault(); //so the page doesnt automatically refresh

//     const pet = {
//         name : form.name.value,
//         age: form.age.value,
//         breed: form.breed.value
//     }

//     db.collection('pets').add(pet)
//         .catch(err => {console.log(err)});

//     form.name.value = "";
//     form.age.value = "";
//     form.breed.value = "";
// })

//delete pet
// const petContainer = document.querySelector('.pets');
// petContainer.addEventListener('click', evt => {
//     if (evt.target.tagName === 'I') {
//         const id = evt.target.getAttribute('data-id');
//         db.collection('pets').doc(id).delete();
//     }
// })

// USERS //

function checkUser(data) {
    db.collection('users').where('username', '==', data.username).get().then((snapshot) => {
        console.log((snapshot.docs === null));
        // snapshot.docs.forEach(doc => {
        //     console.log(doc.data());
        // })
    })
}

function addUser() {
    const form = ($('.signup-form').find('form'))[0];

    const user = {
        firstName: form.first_name.value,
        lastName: form.last_name.value,
        originCity: form.origin.value,
        username: form.email.value,
        password: form.password.value
    }

    console.log("sign up: ", user);

    checkUser(user);
    // form.addEventListener('submit', evt => {
    //     evt.preventDefault(); //so the page doesnt automatically refresh
    //     console.log("check")
    //     // const pet = {
    //     //     name: form.name.value,
    //     //     age: form.age.value,
    //     //     breed: form.breed.value
    //     // }

    //     // db.collection('pets').add(pet)
    //     //     .catch(err => { console.log(err) });

    // })
}


// function login(){
//     const form = document.querySelector('.login');

//     form.addEventListener('submit', evt => {
//         evt.preventDefault(); //so the page doesnt automatically refresh
//         console.log("check")
//         // const pet = {
//         //     name: form.name.value,
//         //     age: form.age.value,
//         //     breed: form.breed.value
//         // }

//         // db.collection('pets').add(pet)
//         //     .catch(err => { console.log(err) });

//     })
// }
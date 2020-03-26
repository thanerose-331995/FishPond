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
db.collection('fish').onSnapshot(snapshot => {
    //gets a snapshot of this collection whenever theres a change
    console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        console.log(change, change.doc.data(), change.doc.id)
        if (change.type === 'added') {
            //add data
            const city = sessionStorage.getItem("location");
            getFish(city);
        }
        if (change.type === 'removed') {
            //remove data
            removePet(change.doc.id);
        }
    }
})

function getFish(city) {
    db.collection('fish').where('city', '==', city).get().then((snapshot) => {
        console.log(snapshot.docs.length);
        snapshot.docs.forEach(doc => {
            displayFish(doc.data(), doc.id);
        })
    })
}

//add fish
function addFish(){
    const form = $(".add-fish").find("form")[0];

    const fish = {
        name: form.name.value,
        city: form.city.value,
        color: form.colorSelect.value,
        origin: form.origin.value,
        parent: form.parent.value
    }

    var valid = true;
    for(var val in fish){
        if(val == ""){
            valid = false;
        }
    }

    if(valid){
        console.log("add: ", fish);
        db.collection('fish').add(fish).catch(err => { console.log(err) });
    }
}

// USERS //
function addUser() {
    const form = ($('.signup-form').find('form'))[0];

    const user = {
        firstName: form.first_name.value,
        lastName: form.last_name.value,
        originCity: form.origin.value,
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
    }

    console.log("sign up: ", user);

    //check if emails in use
    db.collection('users').where('email', '==', user.email).get().then((snapshot) => {
        if (snapshot.empty) {
            //check if usernames in use
            db.collection('users').where('username', '==', user.username).get().then((snapshot) => {
                if (snapshot.empty) {
                    //then sign up
                    $("#signup-err").html("");
                    db.collection('users').add(user).catch(err => { console.log(err) });
                    sessionStorage.setItem("currentUser", user.username);
                    //set logged in to true
                    sessionStorage.setItem("logged_in", true);
                    checkLogin();
                }
                else {
                    $(".signup-form").append("<p class='err'>Sorry, this username is already in use.</p>");
                }
            });
        }
        else {
            $(".signup-form").append("<p class='err'>Sorry, this email is linked to a different account.</p>");
        }
    });
}

//LOGIN
function login() {
    console.log("check");
    const form = ($('.login-form').find('form'))[0];

    const user = {
        username: form.username.value,
        password: form.password.value
    }

    console.log("login: ", user);
    db.collection('users').where('username', '==', user.username).get().then((snapshot) => {
        if (!snapshot.empty) {
            snapshot.docs.forEach(doc => {  
                if (doc.data().password === user.password) {
                    sessionStorage.setItem("currentUser", doc.data().username);
                    sessionStorage.setItem("logged_in", true);
                    checkLogin();
                }
                else {
                    $(".login-form").append("<p class='err'>Password is incorrect.</p>");
                }
            })
        }
        else {
            $(".login-form").append("<p class='err'>Username is incorrect.</p>");
        }
    })
}

//THIS IS WIP
$('.signup-form').find('#username').on('keyup', () => {
    var user = $('.signup-form').find('#username')[0].value;
    db.collection('users').where('username', '==', user).get().then((snapshot) => {
        if (snapshot.empty && (user.length > 3)) {
            console.log("username available");

        }
        else {
            console.log("username taken");
        }
    })
})


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
    console.log(db);
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });

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

                    //AUTHENTICATION
                    
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

//validate form
$(document).keypress(function (e) {
    var form = ($(".login-form").is(":visible")) ? $(".login-form")
        : ($(".signup-form").is(":visible")) ? $(".signup-form")
            : null;
    if (form !== null) {
        var validate = true;
        $.each($(form).find("input"), (key, val) => {
            if (val.value == "") {
                validate = false;
            }
        });
        validate = true; //debugging
        validate ? $(form).find("button").removeClass("disabled") : null;
    }
});

//check login status
function checkLogin() {
    console.log("logged in: ", sessionStorage.getItem("logged_in"));
    if (sessionStorage.getItem("logged_in")) {
        if (window.location.href != "/") {
            window.location.href = "/";
        }
    } else {
        window.location.href = "./pages/signup_login.html";
    }
}


//THIS IS WIP
// $('.signup-form').find('#username').on('keyup', () => {
//     var user = $('.signup-form').find('#username')[0].value;
//     db.collection('users').where('username', '==', user).get().then((snapshot) => {
//         if (snapshot.empty && (user.length > 3)) {
//             console.log("username available");

//         }
//         else {
//             console.log("username taken");
//         }
//     })
// })

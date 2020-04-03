
//----------- STATE CHANGE

auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    //user is logged in
    console.log("User Logged In:", user);
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "./pages/main.html";
  }
  else {
    console.log("User Logged Out");
  }
})


//---------- FORM HANDLING

//SIGN UP
$("#signup").submit(e => {
  e.preventDefault();
  const user = objectifyForm($("#signup").serializeArray());
  auth.createUserWithEmailAndPassword(user.email, user.password).then(cred => {
    return db.collection("users").doc(cred.user.uid).set(user);
  }).then(() => {
    const modal = $("#modal-signup");
    M.Modal.getInstance(modal).close();
  });
})

//LOGIN
$("#login").submit(e => {
  e.preventDefault();
  const user = objectifyForm($("#login").serializeArray());
  auth.signInWithEmailAndPassword(user.email, user.password).then(cred => {
    const modal = $("#modal-login");
    M.Modal.getInstance(modal).close();
  });
})

//FORM FORMATTING
function objectifyForm(formArray) {//serialize data function

  var returnArray = {};
  for (var i = 0; i < formArray.length; i++) {
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}


//---------- USER DATA

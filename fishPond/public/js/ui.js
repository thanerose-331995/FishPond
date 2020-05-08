
//when browser loads
var currentUser = {};

//LOGOUT



//PROFILE
function loadProfile(user) {
    $("#profile-data").empty();
    $("#profile-data").append(`` +
        `<div class= "row">` +
        `<div class="col s12 m6">` +
        `<div class="card white">` +
        `<div class="card-content">` +
        `<span class="card-title"><b>${user.username}</b></span>` +
        `<h6><b>${user.first_name} ${user.last_name}</b></h6>` +
        `<p>Origin City: ${user.origin}</p>` +
        `</div>` +
        `</div>` +
        `</div>` +
        `</div >`
    );
}

//when browser loads
var currentUser = {};

//LOGOUT
$("#logout").click(e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("User Signed Out");
        window.location.href = "../";
    })
})

// FISHES //

function displayFish(data, id) {
    var name = data.name.replace(data.name[0], data.name[0].toUpperCase());
    const html = `
                <div class="card" style="background-color: rgba(255,255,255,0.3)">
                    <div class="card-content white-text row" style="font-size: 11px;padding:15px">
                        <h5 class="col s12">${name}</h5>
                        <div class="divider col s12" style="margin: 5px"></div>
                        <div class="col s12 align-left row" style="margin:0px">
                        
                        <p class="col s4">User: ${data.parent}</p>
                        <p class="col s6">Origin City: ${data.origin}</p>
                        </div>
                    </div>
                </div>
    `;

    $('.fish').append(html);
}

function removePet(id) {
    // //attribute selector which looks for pet attribute with this data-id val
    // const pet = document.querySelector(`.pet[data-id=${id}]`);
    // pet.remove();
}

//SAMPLE FISH CARD
$(".add-fish").change(() => {
    const fish = $(".add-fish").find("form")[0];
    var name = fish.name.value;
    name = name.replace(name[0], name[0].toUpperCase());
    var user = $.parseJSON(sessionStorage.user);
    console.log(user);
    $(".added-fish").empty();
    $(".added-fish").append(
        `<div class="card-content">
                <span class="card-title"><i><b>${name}</b></i></span>
                <img src="../img/fish.png" style="width: 50px;">
                <div class="row">
                    <h6 class="col s6"><b>Pond: </b><i>${fish.city.value}</i></h6>
                    <h6 class="col s6"><b>Parent: </b><i>${user.username}</i></h6>
                    <h6 class="col s6"><b>City of Origin:</b> <i>${user.origin}</i></h6>
                    <h6 class="col s6"><b>Color:</b> <i>${fish.colorSelect.value}</i></h6>
                </div>
                <div class="card-action">
                    <a class="btn waves-effect waves-light indigo darken-2 modal-close" onclick="addFish()"><i class="material-icons">add_circle</i></a>
                </div>
            </div>`
    );
})

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

//NAV BAR
$("#pond-button").click(() => {
    window.location.href = "./main.html";
})
$("#feed-button").click(() => {
    window.location.href = "./feed.html";
})
$("#chats-button").click(() => {
    console.log("chats");
})
$("#profile-button").click(() => {
    window.location.href = "./profile.html";
})
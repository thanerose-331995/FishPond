
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
    console.log("check");
    //this is a template html
    const html = `
        <div class="row">
            <div class="col s12">
                <div class="card indigo darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Name: ${data.name}</span>
                        <p>User: ${data.parent}</p>
                        <p>Color: ${data.color}</p>
                        <p>Origin City: ${data.origin}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('.fish').append(html);

    console.log(data, id);
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

    $(".added-fish").empty();
    $(".added-fish").append(
        `<div class="card-content">
            <span class="card-title"><i><b>${name}</b></i></span>
            <img src="img/fish.png" style="width: 50px;">
            <div class="row">
                <h6 class="col s6"><b>Pond: </b><i>${fish.city.value}</i></h6>
                <h6 class="col s6"><b>Parent: </b><i>${fish.parent.value}</i></h6>
                <h6 class="col s6"><b>City of Origin:</b> <i>${fish.origin.value}</i></h6>
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
    db.collection('users').doc(user.uid).get().then(doc => {
        $("#profile-data").empty();
        $("#profile-data").append(`` +
            `<div class= "row">` +
            `<div class="col s12 m6">` +
            `<div class="card white">` +
            `<div class="card-content">` +
            `<span class="card-title"><b>${doc.data().username}</b></span>` +
            `<h6><b>${doc.data().first_name} ${doc.data().last_name}</b></h6>`+
            `<p>Origin City: ${doc.data().origin}</p>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div >`
        );
    })
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
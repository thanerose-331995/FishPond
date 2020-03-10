
//when browser loads



// FISHES //

function displayFish(data, id) {
    console.log("check");
    //this is a template html
    const html = `
        <div class="row">
            <div class="col s12 m6">
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

// SIGNUP/LOGIN FORM //
function showForm(i, j) {
    $($(i).parent()).parent().addClass("hide");
    $(j).removeClass("hide");
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

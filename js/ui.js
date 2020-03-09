
//when browser loads
document.addEventListener('DOMContentLoaded', function () {
    getFish();
});


// FISHES //

function displayFish(data, id) {
    const fish = $('.fish');

    //this is a template html
    const html = `
        <div class="row">
            <div class="col s12 m6">
                <div class="card indigo darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Name: ${data.name}</span>
                        <p>User: ${data.userID}</p>
                        <p>Color: ${data.mainColor}</p>
                        <p>Origin City: ${data.origin}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    fish.innerHTML += html;

    console.log(data, id);
}

function removePet(id) {
    // //attribute selector which looks for pet attribute with this data-id val
    // const pet = document.querySelector(`.pet[data-id=${id}]`);
    // pet.remove();
}

// SIGNUP/LOGIN FORM //

function showForm(i, j){
    $($(i).parent()).parent().addClass("hide");
    $(j).removeClass("hide");
}

//validate form
$(document).keypress(function (e) {
    var form    = ($(".login-form").is(":visible")) ? $(".login-form")
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

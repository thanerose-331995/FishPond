// ALL FISH CONTENT

// ------------ DISPLAY

// DISPLAY FISH DATA
function displayFish(data, id, key, container) {
    var name = data.name;
    name = name.replace(name[0], name[0].toUpperCase());
    if (key == "city") {
        var html = `
        <div class="card" id="${id}" style="background-color: rgba(255,255,255,0.3)">
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
    }
    else {
        var textcolor = (data.color == "black") ? "white" : "black";
        var html =`
        <div id="${id}" class="center user-fish-data ${data.color} ${textcolor}-text">
            <h6><b>${name}</b></h6>
            <p>${data.city}</p>
        </div>
        `;
    }
    console.log(container);
    $(container).append(html);
}

// ------------ READ

// GET FISH DATA
function getFish(key, val) {
    var container = (key == "city") ? $("#pond-fish") : $("#user-fish");
    $(container).empty();
    db.collection("fish").where(key, "==", val).get().then(snapshot => {
        snapshot.forEach(snap => {
            displayFish(snap.data(), snap.id, key, container);
        })
        $("#preload").fadeOut(() => {
            $(container).fadeIn();
        })
    });
}

// ------------ WRITE

// FISH FORM CHANGE
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
// FISH FORM SUBIMT
function addFish() {
    const form = $(".add-fish").find("form")[0];

    var today = new Date();
    today = today.toISOString();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const fish = {
        name: form.name.value,
        city: form.city.value,
        color: form.colorSelect.value,
        origin: user.origin,
        parent: user.username,
        dateCreated: today
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
        const city = sessionStorage.location;
        getFish("city", city);
    }
}

// ------------ UPADTE

// ------------ DELETE

let selectedBulb, selectedColor, selectedSize;

function openColorModal(e) {
    selectedBulb = e.target.parentNode.id;
    // only possible to edit while glow on pause
    if (document.getElementById('lights-container').classList.value !== "glowing") {
        document.getElementById("modal-edit").classList.add("active", selectedBulb)
    }

    // adapt color of example bulb to selected bulb
    document.getElementById("edit-bulb").classList.add(selectedBulb);
    document.getElementById(selectedBulb).classList.forEach(el => {
        if (/^bulb/.test(el)) {
            selectedColor = el;
        };
        if (/^light/.test(el)) {
            selectedSize = el;
        };
    });
    document.getElementById("edit-bulb").removeAttribute("class");
    document.getElementById("edit-bulb").classList.add("circle", selectedColor, selectedSize);
    for (var i = 1; i <= 3; i++) {
        document.getElementById("light-" + i).checked = false;
    }
    document.getElementById(selectedSize).checked = true;
    document.getElementById(selectedSize).classList.add(selectedColor);
};

function closeColorModal() {
    document.getElementById("modal-edit").removeAttribute("class")
};

function changeColorModal() {
    document.getElementById(selectedBulb).removeAttribute("class")
    document.getElementById(selectedBulb).classList.add("circle", selectedColor, selectedSize)
    closeColorModal();
};

function chooseNewColor(e) {
    selectedColor = e.target.classList.value;
    for (var i = 1; i <= 3; i++) {
        if (document.getElementById("light-" + i).checked) {
            document.getElementById("light-" + i).removeAttribute("class");
            document.getElementById("light-" + i).classList.add("size-check", selectedColor);
        }
    }
    document.getElementById("edit-bulb").removeAttribute("class");
    document.getElementById("edit-bulb").classList.add("circle", selectedColor, selectedSize);
}

function chooseNewSize(id) {
    for (var i = 1; i <= 3; i++) {
        document.getElementById("light-" + i).checked = false;
        document.getElementById("light-" + i).removeAttribute("class");
        document.getElementById("light-" + i).classList.add("size-check");
    }
    document.getElementById(id).checked = true;
    document.getElementById(id).classList.add(selectedColor);
    selectedSize = id;
    document.getElementById("edit-bulb").removeAttribute("class");
    document.getElementById("edit-bulb").classList.add("circle", selectedColor, selectedSize);
}

function lightsOn() {
    //remove EDIT + REMOVE
    let lights = document.getElementsByClassName('circle');
    let lightContainer = document.getElementById('lights-container');
    let button = document.getElementById("lights-on");
    lightContainer.classList.toggle("glowing");

    if (lightContainer.classList.value === "glowing") {
        let bulbId;
        for (var i = 0; i < lights.length; i++) {
            lights[i].classList.forEach(el => {
                if (/^bulb/.test(el)) {
                    bulbId = el;
                }
            })
            let glowClass = bulbId + "-active";
            lights[i].classList.add(glowClass);
            lights[i].childNodes.forEach(el => {
                if (el.classList) {
                    el.classList.add("hidden")
                }
            })
        }
        button.innerHTML = "PAUSE + EDIT";
        document.getElementById("add-bulb").disabled = true;
    }

    else {
        for (var i = 0; i < lights.length; i++) {
            lights[i].classList.forEach(el => {
                if (/-active$/.test(el)) {
                    lights[i].classList.remove(el);
                }
                lights[i].childNodes.forEach(el => {
                    if (el.classList) {
                        el.classList.remove("hidden")
                    }
                })
            })
        }
        button.innerHTML = "START";
        document.getElementById("add-bulb").disabled = false;
    }

};

function addBulb() {
    let bulbCont = document.getElementById("lights-container");
    let bulbNew = document.createElement("div");
    let newColor = 'bulb-' + (Math.floor(Math.random() * 10) + 1);

    let bulbId = "bulb-" + (document.getElementsByClassName('circle').length + 1);
    bulbNew.id = bulbId;
    bulbNew.classList.add("circle", "light-1", newColor);
    bulbCont.appendChild(bulbNew);

    let editBtn = document.createElement("div");
    let editText = document.createTextNode("EDIT");
    editBtn.setAttribute('onclick', 'openColorModal(event)');
    editBtn.classList.add("btn-util");
    editBtn.appendChild(editText);
    bulbNew.appendChild(editBtn);

    let deleteBtn = document.createElement("div");
    let deleteText = document.createTextNode("REMOVE");
    deleteBtn.setAttribute('onclick', 'removeBulb(event)');
    deleteBtn.classList.add("btn-util");
    deleteBtn.appendChild(deleteText);
    bulbNew.appendChild(deleteBtn);
}

function removeBulb(e) {
    let parentId = e.target.parentNode.id
    document.getElementById(parentId).remove()
}
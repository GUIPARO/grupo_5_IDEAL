

window.addEventListener("load", function () {

    let form = document.querySelector("#form");
    let name = document.querySelector("#fullName");
    let image = document.querySelector("#image");
    let fullname_error = document.querySelector("#fullName_error");
    let image_error = document.querySelector("#image_error");
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let errors = {};
        
        let extensionValidate = image.value.includes(".jpg") || image.value.includes(".jpeg") || image.value.includes(".png") || image.value.includes(".gif");
    

        if (name.value.length == "") {
            errors.name = "Debe ingresar un nombre de producto";
        }

        if (!extensionValidate) {
            errors.image = "Las extensiones de archivo permitidas son JPG, JPEG, PNG, GIF."
        }

        if(Object.keys(errors).length >= 1) {
            fullname_error.innerText = errors.name ? errors.name : "";
            image_error.innerText = errors.image ? errors.image : "";
            fullname_error.classList.add("danger_text");
            image_error.classList.add("danger_text");
        } else {
            form.submit();
        }
    })
})
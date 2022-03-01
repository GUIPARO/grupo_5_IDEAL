
window.addEventListener("load", function () {

    let name = document.querySelector("#name");
    let lastName = document.querySelector("#lastName");
    let password = document.querySelector("#password");
    let confirm_password = document.querySelector("#confirm_password");
    let email = document.querySelector("#email");
    let image = document.querySelector("#image");
    let form = document.querySelector("#form");

    let error_name = document.querySelector("#error_name");
    let error_lastName = document.querySelector("#error_lastName");
    let error_email = document.querySelector("#error_email");
    let error_password = document.querySelector("#error_password");
    let error_passwordConfirm = document.querySelector("#error_passwordConfirm");
    let error_image = document.querySelector("#error_image");

    
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let errors = {};
        
        if(name.value == "") {
            errors.name = "El campo nombre no puede estar vacío"
        } else if (name.value.length <= 1) {
            errors.name = "El campo nombre debe tener al menos 2 caracteres"
        }

        if(lastName.value === "") {
            errors.lastName = "El campo apellido no puede estar vacío"
        } else if (lastName.value.length <= 1) {
            errors.lastName = "El campo apellido debe tener al menos 2 caracteres"
        }

        if(password.value.length == 0) {
            errors.password = "Debe ingresar una contraseña";
        } else if (password.value.length < 8) {
            errors.password = "La contraseña debe tener al menos 8 caractéres";
        }

        if(email.value == "") {
            errors.email = "Agregar un email válido";
        }

        if(confirm_password.value.length == 0) {
            errors.passwordConfirm = "Debe confirmar la contraseña";
        } else if (confirm_password.value.length < 8) {
            errors.passwordConfirm = "La confirmación de la contraseña debe tener al menos 8 caractéres";
        }

        let extensionValidate = image.value.includes(".jpg") || image.value.includes(".jpeg") || image.value.includes(".png") || image.value.includes(".gif");

        switch (extensionValidate) {
            case true:
                break;      
            default:
                errors.image = "Las extensiones de archivo permitidas son JPG, JPEG, PNG, GIF."
                break;
        }

        if(Object.keys(errors).length >= 1) {
            error_name.innerText = errors.name ? errors.name : "";
            error_lastName.innerText = errors.lastName ? errors.lastName : "";
            error_password.innerText = errors.password ? errors.password : "";
            error_passwordConfirm.innerText = errors.passwordConfirm ? errors.passwordConfirm : "";
            error_email.innerText = errors.email ? errors.email : "";
            error_image.innerText = errors.image ? errors.image : "";
            
            error_name.classList.add("danger_text")
            error_lastName.classList.add("danger_text")
            error_email.classList.add("danger_text")
            error_password.classList.add("danger_text")
            error_passwordConfirm.classList.add("danger_text")
            error_image.classList.add("danger_text")
        } else {
            form.submit();
        }
    
    });
})
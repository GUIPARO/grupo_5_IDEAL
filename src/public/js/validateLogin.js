
window.addEventListener("load", function () {

    let email = document.querySelector("#input_login");
    let password = document.querySelector("#input_password");    
    let credentials = document.querySelector("#credentials_front");;
    let form = document.querySelector("#login_form");

    
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let errors = {};
    

        if (email.value == "") {
            errors.email = "Credenciales invalidas";
        }

        if (password.value.length == 0) {
            errors.password = "Credenciales invalidas";
        }

        if (Object.keys(errors).length >= 1) {
            credentials.innerText = errors.email || errors.password ? errors.email || errors.password  : "";
            credentials.classList.add("danger_text");
        } else {
            form.submit();
        }
    })
})
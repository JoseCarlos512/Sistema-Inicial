// Call the dataTables jQuery plugin
$(document).ready(function() {
    /**
     *  Onready
     */
});

async function iniciarSesion() {

    let datos = {};
    datos.email            = document.getElementById("txtEmail").value;
    datos.password         = document.getElementById("txtPassword").value;

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos) /*Agarrar cualquier objeto de Js y convertirlo en Json*/
    });

    const response = await request.text();

    if (response != "fail") {
        localStorage.token = response;
        localStorage.email = datos.email;

        window.location.href = 'usuarios.html';
    } else {
        alert("Las credenciales son incorrectas, intentelo nuevamente!");
    }

}

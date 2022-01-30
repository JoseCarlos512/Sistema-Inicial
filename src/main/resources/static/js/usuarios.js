// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
  actualizarDatosUsuario();
});

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}

async function cargarUsuarios() {

  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers:  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  });
  const usuarios = await request.json();

  let listadoHTML = '';

  for (let usuario of usuarios) {
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonEditar   =  '<a href="#" onclick="editarUsuario(' + usuario.id + ')" class="btn btn-secondary btn-circle btn-sm" data-toggle="modal" data-target="#editUserModal"><i class="fas fa-pen"></i></a>';
    let usuarioHTML = `<tr>
                            <td>${usuario.id}</td>
                            <td>${usuario.nombre}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.telefono != null? usuario.telefono : "-"}</td>
                            <td>${botonEliminar} ${botonEditar}</td>
                       </tr>`;
    listadoHTML += usuarioHTML;
  }

  document.querySelector("#usuarios tbody").outerHTML = listadoHTML;

}


async function eliminarUsuario(id) {

  if (!confirm('Desea eliminar este usuario?')){
    return;
  }

  await fetch('api/usuarios/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  }).then(() => {
    cargarUsuarios()
  }).catch((error) => {
    console.error(error)
  });


}
async function editarUsuario(id) {

  const request = await fetch('api/usuario/' + id, {
    method: 'GET',
    headers: getHeaders()
  });

  const json = await request.json();
  document.getElementById("txtId").value = json.id;
  document.getElementById("txtNombre").value = json.nombre;
  document.getElementById("txtApellido").value = json.apellido;
  document.getElementById("txtTelefono").value = json.telefono;
  document.getElementById("txtEmail").value = json.email;
  // document.getElementById("txtPassword").value = json.password;
  // document.getElementById("txtRepetirPassword").value = json.password;

  //location.reload();
}

async  function updateUsuarios() {

  let datos = {};
  datos.id = document.getElementById("txtId").value;
  datos.nombre = document.getElementById("txtNombre").value;
  datos.apellido = document.getElementById("txtApellido").value;
  datos.email = document.getElementById("txtEmail").value;
  datos.telefono = document.getElementById("txtTelefono").value;

  await fetch('api/usuario', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(datos) /*Agarrar cualquier objeto de Js y convertirlo en Json*/
  }).then(() => {
    cargarUsuarios();
  }).catch((error) => {
    console.error(error)
  });
}

function actualizarDatosUsuario() {
   document.getElementById("txt_email_usuario").outerHTML = localStorage.email;
}
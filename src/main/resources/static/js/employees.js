// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarEmployee();
  $('#employees').DataTable();
});

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}

async function cargarEmployee() {

  const request = await fetch('api/employees', {
    method: 'GET',
    headers:  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  });
  const employees = await request.json();

  let listadoHTML = '';

  for (let employee of employees) {
    let botonEliminar = '<a href="#" onclick="eliminarEmployee(' + employee[0] + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonEditar   =  '<a href="#" onclick="editarEmployee(' + employee[0] + ')" class="btn btn-secondary btn-circle btn-sm" data-toggle="modal" data-target="#editUserModal"><i class="fas fa-pen"></i></a>';
    let employeeHTML = `<tr>
                            <td>${employee[0]}</td>
                            <td>${employee[1]} ${employee[2]}</td>
                            <td>${employee[3]}</td>
                            <td>${employee[4]}</td>
                            <td>${botonEliminar} ${botonEditar}</td>
                       </tr>`;
    listadoHTML += employeeHTML;
  }
  document.querySelector("#employees tbody").outerHTML = listadoHTML;
}


async function eliminarEmployee(id) {

  if (!confirm('Esta seguro de eliminar el empleado?')) {
    return;
  }

  await fetch('api/employee/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  }).then(() => {
    cargarEmployee()
  }).catch((error) => {
    console.error(error)
  });
}

async function editarEmployee(id) {

  const request = await fetch('api/employee/' + id, {
    method: 'GET',
    headers: getHeaders()
  });

  const json = await request.json();
  document.getElementById("txtId").value = json.id;
  if (json.user_employee) {
    document.getElementById("txtNombre").value = json.user_employee.nombre;
    document.getElementById("txtApellido").value = json.user_employee.apellido;
  }
  document.getElementById("txtTelefono").value = json.departamento;
  document.getElementById("txtEmail").value = json.sueldo;
  // document.getElementById("txtPassword").value = json.password;
  // document.getElementById("txtRepetirPassword").value = json.password;

  //location.reload();
}

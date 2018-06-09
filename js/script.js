fetch("html/home.html").then(
  function(response){
    response.text().then(
      function(texto){
        document.querySelector(".container").innerHTML = texto;
      });
  }
);

  /*partial render*/
function loadClick(event){
let urls = this.getAttribute('href');
let contenedor = document.querySelector(".container");
  event.preventDefault();
  fetch(urls).then( function(response){
    console.log("ok");
    console.log(response);
    if (response.ok) {
    response.text().then(t=> {
      contenedor.innerHTML = t;
      document.querySelector("#enviar-coment").addEventListener("click", enviarComentario);
      document.querySelector("#reset-coment").addEventListener("click", resetComentarios);
      // document.querySelector("#eliminar-coment").addEventListener("click", eliminarComentario(this))

      if (contenedor.querySelector(".tabla-foro")) {
          loadComentario();
        }
      });
    }else{
      contenedor.innerHTML = "<h1> Error... </h1>";
    }
  });
}

let jsloads = document.querySelectorAll(".nav-item");
jsloads.forEach(e=> e.addEventListener("click", loadClick));

let urlAPI = 'http://web-unicen.herokuapp.com/api/groups/400/probando_grupo40';

/*funcion para enviar los comentarios*/
function enviarComentario(){
  event.preventDefault();
  let comentarios = {
    'nombre' : document.getElementById("js-input-nombre").value,
    'comentario' : document.getElementById("js-input-comentario").value,
  }
  let info = {
    thing: comentarios
  };
  if (comentarios) {
    fetch(urlAPI,{
      method: 'POST',
      mode: "cors", //el modo a utilizar por la petición
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }).then( r => loadComentario()) // para q me refresque el onload sin tener q actualizar la pag
  }
}

function loadComentario(){//funcion onload
  let contenidoComentario = document.querySelector('#template');
  console.log(contenidoComentario);
  fetch(urlAPI,{
    method :'GET',
  }).then(r => r.json())
    .then(JSON => MostrarComentarios(JSON))
    .catch(error => console.log(error))
    console.log(contenidoComentario);
}
function MostrarComentarios(JSON){
  console.log("entre");
  let html = " ";
  for (var i = 0; i < JSON.probando_grupo40.length; i++) {
    html += "<tr id= '" + JSON.probando_grupo40[i]._id + "'>";
    html += "<td class ='name-foro'>" + JSON.probando_grupo40[i].thing['nombre'] + "</td>";
    html += "<td class ='comentario-foro'>" + JSON.probando_grupo40[i].thing['comentario'] + "</td>";
    html += "<td> <ul>";
    html += "<li><button class='btn btn-outline-secondary' id='eliminar-coment' onclick='eliminarComentario(this)' result-id='"+ JSON.probando_grupo40[i]._id +"'>X</button></li>";
    html += "<li><button class='btn btn-outline-secondary' id='editar-coment' onclick='editarComentario(this)' result-id = '"+ JSON.probando_grupo40[i]._id +"'>Editar</button></li>";
    html += "</ul></td></tr>";
  }
    document.querySelector('#template').innerHTML = html;
  console.log(html);
}
/* Funcion para eliminar comentarios buscados por su id */
function eliminarComentario(element){//quitar onclick del boton en la linea 78
  console.log(element);
  let _id = element.getAttribute('result-id');
  let urlDelet = urlAPI + "/"+ _id;
  fetch(urlDelet,{
    method : 'DELETE',
    headers: { "Content-Type": "application/json" },
  }).then(r => loadComentario()) // para q me refresque el onload sin tener q actualizar la pag
}
/* funcion para editar los comentarios buscados por "se supone que por id" */
function editarComentario(element){//quitar onclick del boton en la linea 79
  console.log("hola");
  let _id = element.getAttribute('result-id');
  let urlEdit = urlAPI + "/"+ _id;
  fetch(urlEdit,{
    method : 'PUT',
    headers : {"Content-Type": "application/json"},
    body : JSON.stringify(element), //ver como se hace la funcion que continua de aca para poder
  }).then(r => console.log(r))//editar los comentarios
//tiene que traer lo que esta dentro de ese thing y bajarlo al form para poder editarlo
}

/* Mis 3 comentarios por defecto */
let comentariosDefecto =[
  {
    "nombre" : 'Legend',
    "comentario" : 'Este es un comentario.',
  },{
    "nombre" :'Yuna',
    "comentario" : 'Este es un comentario.',
  },{
    "nombre" :'Tidus',
    "comentario" : 'Este es un comentario.',
  }
];
/*function de reset. Carga mis 3 comentarios por defecto en la tabla */
function resetComentarios(){
  for (let i = 0; i < comentariosDefecto.length; i++) {
    let objeto = {
      "thing" : comentariosDefecto[i]
    }
    fetch(urlAPI, {
      method : 'POST',
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify(objeto)
    }).then( r => loadComentario()) // para q me refresque el onload sin tener q actualizar la pag
  }
}

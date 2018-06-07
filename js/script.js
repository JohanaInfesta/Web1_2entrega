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
    // let url = document.querySelectorAll('href'); //hay que ver como hacer que vaya al html designado
  event.preventDefault();
  fetch(urls).then( function(response){
    console.log("ok");
    console.log(response);
    if (response.ok) {
    response.text().then(t=> {
      contenedor.innerHTML = t;

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

function enviarComentario(){
  event.preventDefault();
  let comentarios = {
    'nombre' : document.getElementById("js-input-nombre").value,
    'comentario' : document.getElementById("js-input-comentario").value,
  }
  let info = {
    thing: comentarios //puede ser un objeto JSON!
  };
  if (comentarios) {
    fetch(urlAPI,{
      method: 'POST',
      mode: "cors", //el modo a utilizar por la petición
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }).then( r => console.log(r))
  loadComentario();
  }
}

function loadComentario(){
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
    html += "<td class ='comentario-foro'>" + JSON.probando_grupo40[i].thing['comentario'] + "</td></tr>";
    document.querySelector('#template').innerHTML = html;
  }
  console.log(html);
}

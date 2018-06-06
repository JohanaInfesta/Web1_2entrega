fetch("html/foro.html").then(
  function(response){
    response.text().then(
      function(texto){
        document.querySelector(".container").innerHTML = texto;
      });
  }
);

  /*partial render*/
function loadClick(event){
    // let url = document.querySelectorAll('href'); //hay que ver como hacer que vaya al html designado
  event.preventDefault();
  fetch('html/anime.html').then( function(response){
    console.log("ok");
    console.log(response);
    response.text().then(t=> document.querySelector(".container").innerHTML = t);
  });
}

let jsloads = document.querySelectorAll(".nav-item");
jsloads.forEach(e=> e.addEventListener("click", loadClick));

let url = 'http://web-unicen.herokuapp.com/api/groups/400/probando_grupo40';

function enviarComentario(){
  event.preventDefault();
  let comentarios = {
    'nombre' : $(".js-input-nombre").val(),
    'comentario' : $(".js-input-comentario").val(),
  }
  let info = {
    thing: comentarios //puede ser un objeto JSON!
  };
  if (comentarios) {
    fetch(url,{
      method: 'POST',
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }).then( r => console.log(r))
  }
}

function resetComentarios(){
  let contenidoComentario = document.querySelector('#template');
  console.log(contenidoComentario);
  fetch(url,{
    method :'GET'
  }).then(r => r.JSON())
    .then(JSON => MostrarComentarios(contenidoComentario, JSON))
    .catch(error => contenidoComentario.innerHTML)
    console.log(contenidoComentario);
}
function MostrarComentarios(contenido, JSON){
  let html = " "
  for (var i = 0; i < JSON.probando_grupo40.length; i++) {
    html = "<tr id= '" + JSON.probando_grupo40[i]._id + "'>";
    html += "<td>" + JSON.probando_grupo40[i].thing['nombre'] + "</td>";
    html += "<td>" + JSON.probando_grupo40[i].thing['comentario'] + "</td></tr>";
  }
console.log(html);
  contenido.innerHTML = html;
}

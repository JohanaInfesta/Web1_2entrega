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


  // let groupID = 400;
  // let url = 'http://web-unicen.herokuapp.com/api/groups/';

  function enviarComentario(){
    event.preventDefault();
    let comentarios = {
      'nombre' : $(".js-input-nombre").val(),
      'comentario' : $(".js-input-comentario").val(),
    }
    // let comentario = {
    //   "nombre" : document.querySelector(".js-input-nombre").value,
    //   "comentario" :document.querySelector(".js-input-comentario").value,
    // }
    let info = {
      thing: comentarios //puede ser un objeto JSON!
    };
    if (comentarios) {
      fetch('http://web-unicen.herokuapp.com/api/groups/400/probando_grupo40',{
        method: 'POST',
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      }).then( r => console.log(r))
    }
  }
  // function loadComentario(){
  //   event.preventDefault();
  //   let contenedor = document.querySelector("#template");
  //   contenedor.innerHTML = "Cargando....";
  //   fetch(url + groupID +'/' + 'probando_grupo40')
  //   .then(r => r.JSON())
  //   .then(JSON => Mostrar(contenedor, JSON)
  //   .catch(error => contenedor.innerHTML))
  // }
  //
  // function Mostrar(contenedor, JSON){
  //   for (var i = 0; i < JSON.probando_grupo40.length; i++) {
  //     let nombre = JSON.probando_grupo40[i].thing.nombre;
  //     let comentario = JSON.probando_grupo40[i].thing.comentario;
  //     let html = "<tr>";
  //     html += "<td>" + nombre + "</td>";
  //     html += "<td>" + comentario + "</td>";
  //   }
  //   html += "</tr>";
  //   contenedor.innerHTML = html;
  // }

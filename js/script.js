fetch("html/home.html").then(
  function(response){
    response.text().then(
      function(texto){
        document.querySelector(".container").innerHTML = texto;
      });
  }
);

  /*partial render*/
let jsloads = document.querySelectorAll(".navigate");
jsloads.forEach(e=> e.addEventListener("click", loadClick));

function loadClick(event)
{
  event.preventDefault();
  fetch("html/anime.html").then( function(response){
      console.log("ok");
      console.log(response);
      response.text().then(t=> document.querySelector(".container").innerHTML = t);
    });
}

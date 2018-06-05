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

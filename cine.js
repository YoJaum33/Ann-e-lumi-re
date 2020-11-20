"use strict";

// définir votre clé d'accès à l'API de OMDb
let APIkey = "d1a145f0";

// création d'une fonction `dbSearch`
let dbSearch = async function(movieTitle) {
  try { 
    let url = `https://www.omdbapi.com/?apikey=${APIkey}&t=${movieTitle}&plot=full`;
    let response = await fetch(url, { cache: "no-cache" });
    let json = await response.json();
    if (json.Response != "False") {
      document.querySelector(".resultat").innerHTML =
        `<fieldset>`
       +`<legend>Résultat de la recherche "${movieTitle}"</legend>`
       +`<h1>${json.Title}</h1>`
       +`<img src="${json.Poster}" alt="affiche du film">`
       +`<ul>`
       +`<li>Réalisateur : ${json.Director}</li>`
       +`<li>Année de sortie : ${json.Year}</li>`
       +`<li>Durée : ${json.Runtime}</li>`
       +`<li>Avec : ${json.Actors}</li>`
       +`<li>Genre (en anglais) : ${json.Genre}</li>`
       +`<li>Intrigue (en anglais) : ${json.Plot}</li>`
       +`</ul>`
       +`</fieldset>`;
    } else {
      document.querySelector(".resultat").innerHTML =
        `<fieldset>`
       +`<legend>Résultat de la recherche "${movieTitle}"</legend>`
       +`<p>Désolé mais je n'ai pas de résultat pour cette recherche (${json.Error})</p>`
       +`</fieldset>`;
    }
  } catch (error) {
    alert(`Aïe!\nZut!\nUne erreur (diabolique, forcément) est survenue :\n${error}`);
  }
}

// écoute l'envoi du formulaire
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // bloque l'envoi par défaut
  dbSearch(event.target[0].value); // récupère la valeur du premier élément et la transmet à notre fonction `dbSearch`
});


document.querySelector("body > div:nth-of-type(3)").addEventListener("click",(event) => {document.getElementById("search").style.display == "block";});

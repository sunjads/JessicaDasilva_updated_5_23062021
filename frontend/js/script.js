const container = document.getElementById("card-container");
//fonction pour afficher les données de l'API dans une structure html
getAPI = () => {
  fetch("http://localhost:3000/api/cameras/")
    .then((res) => res.json())
    .then((data) => {
      output = "";
      for (let i = 0; i < data.length; i++) {
        // utilisation de template literals pour afficher les données dans une structure html
        output += `
    <div class="col-12 col-lg-4 mt-5 mb-2">
    <div class="card border-white shadow ">
    
    <img class="card-img-top" src=" ${data[i].imageUrl}" alt="" />
    <div class="card-body" >
    <h5 class="card-title font-weight-bold">${data[i].name}</h5>
    <p class="card-text"> Prix : ${data[i].price / 100}€</p>
    <p class="card-text" >${data[i].description}</p>
    </div>
     <a  href="produit.html?id= ${
       data[i]._id
     }" class="button"> Voir le produit </a>
    </div>
    </div>
    `;

        //faire apparaitre les données dans la div card-container
        container.innerHTML = output;
      }
    })
    //faire afficher un message d'erreur s'il y a un problème
    .catch(function () {
      document.getElementById("erreur").innerHTML =
        "<strong>Erreur de chargement</strong>";
    });
};
getAPI();

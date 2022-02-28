let cart = JSON.parse(localStorage.getItem("produit"));

/**************affichage des produits du LS dans le panier***********/
//selection du ul où il faut injecter le html
let ul = document.querySelector(".list-group");
// creation du tableau afin d'initier une boucle et recuperer les produits du LS
let output = [];

function afficherCameraDansPanier(i) {
  //creation de la classe où il faut injecter le html
  let li = document.createElement("li");
  // Création des éléments
  let nom = document.createElement("h6"),
    option = document.createElement("h6"),
    prix = document.createElement("p"),
    input = document.createElement("input"),
    bouton = document.createElement("button");
  iconebouton = document.createElement("i");
  // Remplissage des éléments
  nom.appendChild(document.createTextNode(cart[i].nomproduit));
  option.appendChild(document.createTextNode(cart[i].optionproduit));
  prix.appendChild(document.createTextNode(cart[i].prix + " €"));
  li.classList.add("list-group-item", "d-flex", "justify-content-between");
  nom.classList.add("my-0");
  option.classList.add("my-0", "option");
  prix.classList.add("affichage_prix");
  bouton.classList.add("btn_supprimer_article");
  iconebouton.classList.add("fas", "fa-times");
  input.classList.add("quantite");
  input.setAttribute("value", cart[i].quantite);
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute(
    "onkeypress",
    "return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 49 && event.charCode <= 57"
  );

  //Placement des éléments
  ul.appendChild(li);
  li.appendChild(nom);
  li.appendChild(option);
  li.appendChild(prix);
  li.appendChild(input);
  li.appendChild(bouton);
  bouton.appendChild(iconebouton);
}
// creer une condition pour vérifier si le panier est vide ou non
function panierVide() {
  if (cart === null || cart == 0) {
    //si il est vide,inserer la structure html ci-dessus dans le ul
    const panierVide = `
    <div class="container-panier-vide">
    <div> Votre panier est actuellement vide.</div>
    </div>`;
    //inserer la structure html ci-dessus dans le ul (le panier)
    ul.innerHTML = panierVide;
  } else {
    //sinon, il faut ajouter les produits du LS au ul (le panier)
    for (i = 0; i < cart.length; i++) {
      afficherCameraDansPanier(i);
    }
    //afficher le total dans une structure html & creation du bouton
    let affichagePrixTotal = `
<div id="total">
</div>`;
    //insertion dans la structure html et en dernière position
    ul.insertAdjacentHTML("beforeend", affichagePrixTotal);
  }
}
panierVide();

/**********************modifier la quantité de produits************************/
let li = document.querySelectorAll(".list-group-item");
for (let i = 0; i < li.length; i++) {
  var liiterate = li[i];
  //ecouter l'évenement change de l'input qui va lancer la fonction updateQuantity(
  liiterate.addEventListener("change", updateQuantity);
}
function updateQuantity() {
  //recuperer le container de li, getElementByClassName renvoie un array,
  //on veut recuperer le premier element de cet array
  let licontainer = document.getElementsByClassName("list-group")[0];
  //recuperer les li avec cette classe "list-group-item" dans le ul
  let cartRows = licontainer.getElementsByClassName("list-group-item");

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let quantiteElement = cartRow.getElementsByClassName("quantite")[0];
    let nomElement = cartRow.getElementsByClassName("my-0")[0].innerText;
    let optionElement = cartRow.getElementsByClassName("option")[0].innerText;
    let quantite = quantiteElement.value;

    if (
      cart[i].optionproduit == optionElement &&
      cart[i].nomproduit == nomElement
    ) {
      cart[i].quantite = quantite;
    }

    if (cart[i].quantite < 0) {
      console.log("la quantite est inferieure à 0");
    }
    /*if (cart[i].quantite < 0 && cart[i].quantite === null) {
      console.log("la qauntite est null ou inferieur à zero");
    }*/
    //envoyer en format JSON dans la key "produit" dans le LS
    localStorage.setItem("produit", JSON.stringify(cart));
    calculPrixTotal();
  }
}

/***************** calcul du prix total ***************/
function calculPrixTotal() {
  let calculPrixTotal = 0;
  //recuperer les prix du panier
  for (let i in cart) {
    calculPrixTotal += cart[i].prix * cart[i].quantite;
  }
  if (document.querySelector(".affichage_prix") != null) {
    document.getElementById("total").innerHTML = `<strong>Total</strong>
<strong>${calculPrixTotal} €</strong>`;
    //envoyer le prix total dans le Ls
    localStorage.setItem("prixTotal", JSON.stringify(calculPrixTotal));
  }
}
calculPrixTotal();

/**********************supprimer produits********************/
function supprimerProduit() {
  let btnsupprimer = document.querySelectorAll(".btn_supprimer_article");
  for (let i = 0; i < btnsupprimer.length; i++) {
    // ecouter l'evenement clique du bouton
    btnsupprimer[i].addEventListener("click", (event) => {
      event.preventDefault();
      // au clique du bouton, affichage de l'id du produit
      let nomasupprimer = cart[i].nomproduit;
      let optionasupprimer = cart[i].optionproduit;
      //supprimer l'élément cliqué et garder les autres avec la methode filter
      cart = cart.filter(
        (element) =>
          element.optionproduit !== optionasupprimer &&
          element.idproduit !== nomasupprimer
      );
      //envoyer en format JSON le panier dans la key "produit" dans le LS
      localStorage.setItem("produit", JSON.stringify(cart));
      alert("l'article a bien été supprimé");
      window.location.href = "panier.html";
    });
  }
}
supprimerProduit();

/************* creation du bouton "vider le panier"*************/
function viderPanier() {
  let btnToutSuppHtml = `
<button id="remove_all_button" class="primary" > Vider le panier</button>`;
  ul.insertAdjacentHTML("beforeend", btnToutSuppHtml);
  //recuperation du bouton
  let btnToutSuppPanier = document.getElementById("remove_all_button");
  //suppression de la key produit du LS pour supprimer entièrement le panier
  btnToutSuppPanier.addEventListener("click", (e) => {
    e.preventDefault();
    //vider le panier
    localStorage.removeItem("produit");
    alert("Le panier a bien été vidé");
    window.location.href = "panier.html";
  });
}
viderPanier();

/************recuperation valeurs formulaire pour envoyer dans le LS et envoie des données au serveur**********/
function validationFinale() {
  const btnValiderPanier = document.querySelector(".btn-block");
  // ecouter l'évènement clique du bouton "valider le panier"
  btnValiderPanier.addEventListener("click", (e) => {
    e.preventDefault();
    //mettre les valeurs du formulaire dans un objet contact
    let contact = {
      lastName: document.getElementById("lastName").value,
      firstName: document.getElementById("firstName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    //fonctions pour initialiser les textes d'alerte + les regex
    const textAlert = (value) => {
      return ` ${value} : les chiffres ou symboles ne sont pas autorisés.\n Minimum 2 caractères, ne pas dépasser 20.`;
    };
    // regex pour le prénom,nom,et la ville
    const regexEmail = (value) => {
      return /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i.test(value);
    };
    const regexTest = (value) => {
      return /^([A-Za-z0-9_\s\-'\u00C0-\u024F]){2,20}$/.test(value);
    };
    //controle de validité du prénom
    function ValidFirstName() {
      const firstName = contact.firstName;
      if (regexTest(firstName)) {
        document.getElementById("invalid-feedback-firstName").textContent = "";
        return true;
      } else {
        document.getElementById("invalid-feedback-firstName").textContent =
          "Veuillez entrer un prénom valide";
        alert(textAlert("Votre prénom"));
        return false;
      }
    }
    //controle de validité du nom de famille
    function ValidLastName() {
      const lastName = contact.lastName;
      if (regexTest(lastName)) {
        document.getElementById("invalid-feedback-lastName").textContent = "";
        return true;
      } else {
        document.getElementById("invalid-feedback-lastName").textContent =
          "Veuillez entrer un nom valide";
        alert(textAlert("Votre nom de famille"));
        return false;
      }
    }
    //controle de validité de la ville
    function ValidCity() {
      const city = contact.city;
      if (regexTest(city)) {
        document.getElementById("invalid-feedback-city").textContent = "";
        return true;
      } else {
        document.getElementById("invalid-feedback-city").textContent =
          "Veuillez entrer une adresse pour valider votre commande";
        alert(textAlert("La ville"));
        return false;
      }
    }
    //controle de validité de l'e-mail
    function ValidEmail() {
      const email = contact.email;
      if (regexEmail(email)) {
        document.getElementById("invalid-feedback-email").textContent = "";
        return true;
      } else {
        document.getElementById("invalid-feedback-email").textContent =
          "Veuillez entrer une adresse e-mail valide";
        alert("L'adresse e-mail est invalide.");
        return false;
      }
    }
    //controle de validité de l'adresse
    function ValidAddress() {
      const address = contact.address;
      if (regexTest(address)) {
        document.getElementById("invalid-feedback-address").textContent = "";
        return true;
      } else {
        document.getElementById("invalid-feedback-address").textContent =
          "Veuillez entrer une adresse valide";
        alert("L'adresse est invalide.");
        return false;
      }
    }
    //envoyer l'objet contact au LS si c'est ok
    if (
      ValidFirstName() &&
      ValidLastName() &&
      ValidCity() &&
      ValidEmail() &&
      ValidAddress()
    ) {
      localStorage.setItem("contact", JSON.stringify(contact));
    }

    //permettre de conserver les valeurs du formulaire après avoir rafraichi, ou changer de page
    //recuperer l'objet contact du LS, étant donnée qu'on est hors addEventListener
    const recupContact = localStorage.getItem("contact");
    //convertir la chaine de caractères en objet javascript
    const recupContactObjet = JSON.parse(recupContact);
    // remettre les valeurs de contact du LS dans les champs du formulaire
    document.getElementById("lastName").value = recupContactObjet.lastName;
    document.getElementById("firstName").value = recupContactObjet.firstName;
    document.getElementById("address").value = recupContactObjet.address;
    document.getElementById("city").value = recupContactObjet.city;
    document.getElementById("email").value = recupContactObjet.email;

    /********Envoi des données contact + produits au serveur avec la methode POST ********/
    //recupération de chaque produit
    function envoiDonnees() {
      let products = [];
      for (let i of cart) {
        let productId = i.idproduit;
        products.push(productId);
      }
      //mettre contact et produits dans un objet à envoyer au serveur
      const commande = {
        contact,
        products,
      };
      //envoyer l'objet avec fetch et method POST et recuperer l'orderID de la commande
      fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
          //pour prevenir le serveur qu'il va recevoir du JSON avec les headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commande),
      })
        .then((res) => res.json())
        .then((order) => {
          //envoyer au LS l'orderId et le prénom
          localStorage.setItem("orderId", order.orderId);
          localStorage.setItem("firstName", contact.firstName);
          window.location.href = "confirmation.html";
        })
        .catch(function (error) {
          document.getElementById("erreur").innerHTML =
            "<strong>Erreur de chargement</strong>";
        });
    }
    envoiDonnees();
  });
}
validationFinale();

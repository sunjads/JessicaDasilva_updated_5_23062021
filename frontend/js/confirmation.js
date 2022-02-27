let col = document.getElementById("container-confirmation");

//recuperer le numero de commande, le prenom et le prix total du LS
let confirmation = `
<h1>Bonjour ${localStorage.firstName} ,</h1>
        <p>Merci de vos achats sur Orinocameras.</p>
        <p>Nous avons bien reçu votre commande n° <strong>${localStorage.orderId}</strong> pour un montant total de <strong>${localStorage.prixTotal}€ </strong> </p>
        <p>Nous vous contacterons une fois que votre colis sera expédié.</br>
        A bientôt !</p>
        
    `;
col.innerHTML = confirmation;
localStorage.clear();

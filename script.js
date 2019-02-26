document.addEventListener('DOMContentLoaded', function()
{
	// création du panier
	initPanier();

	// conteneur du DOM qui recevra les éléments créés dynamiquement
	var DOMContainer = document.getElementById('voyageContainer');
	if(!DOMContainer)
		return;

	// Création et append dynamique des éléments de la page d'accueil
	for(var i = 0 ; i <  destinationArray.length ; i++)
	{
		// lorsqu'un block de voyage est cliqué, on redirige l'user vers la page de réservation
		var voyageBlock = document.createElement('section');
		voyageBlock.classList.add('voyageBlock');

			var imgDestination = document.createElement('img');
			imgDestination.classList.add('destinationImage');
			imgDestination.src = imagePathArray[i];

			var nomDestination = document.createElement('p');
			nomDestination.classList.add('nomDestination');
			nomDestination.innerHTML = destinationArray[i];

			var voyageInformations = document.createElement('div');
			voyageInformations.classList.add('voyageInformations');

				var destinationMetaData = document.createElement('div');
				destinationMetaData.classList.add('destinationMetaData');

					var duree = document.createElement('p');
					var prix = document.createElement('p');
					duree.innerHTML = dureeArray[i];
					prix.innerHTML = prixArray[i] + '€ / jour';

				var descriptionVoyage = document.createElement('div');
				destinationMetaData.classList.add('descriptionVoyage');

					var description = document.createElement('p');
					description.innerHTML = descriptionArray[i];

			var goToReservationButton = document.createElement('a');
			goToReservationButton.href = "reservation.html?name=" + destinationArray[i] + '&prix=' + prixArray[i];
			goToReservationButton.classList.add('reserverButton');
			goToReservationButton.innerHTML = "Réserver";

		descriptionVoyage.appendChild(description);
		destinationMetaData.appendChild(duree);
		destinationMetaData.appendChild(prix);
		voyageInformations.appendChild(destinationMetaData);
		voyageInformations.appendChild(descriptionVoyage);
		voyageBlock.appendChild(imgDestination);
		voyageBlock.appendChild(nomDestination);
		voyageBlock.appendChild(voyageInformations);
		voyageBlock.appendChild(goToReservationButton);
		DOMContainer.appendChild(voyageBlock);
	}

}, false);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Listen for click events
// Permet d'activer ou de désactiver la visibilité du password dans le champ
document.addEventListener('click', function (event)
{
	console.log("L'évènement est lancé");
	var x = document.getElementById("user_password");
	
	if (x.type === "password" && event.target.name == "ShowPassword")
	{
		x.type = "text";
	}
	else if (x.type != "password" && event.target.name == "ShowPassword")
	{
	    x.type = "password";
	}
	else
	{
		console.log("Le bouton n'a pas été reconnu");
	}
}
, false);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Fonction appelée lors du clic sur l'icône de panier : elle crée un récapitulatif de commande sous l'icône de panier, permettant de visualiser
// les éléments désirés, mais aussi de les supprimer ou bien de modifier leur quantité (WIP)
function onclickPanier(event)
{
	// si le récapitulatif est déjà affiché, on le supprime... Sinon, on l'ajoute !
	var recap = document.getElementById("recapitulatifPanier");
	if(recap != null)
		recap.remove();
	else
		document.getElementsByTagName("body")[0].appendChild(createRecapitulatifPanier()); 
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
// Ce récapitulatif d'un bloc positionné au-dessus de tout autre contenu, activé lors du clic et désactivé lors d'un nouveau clic
function createRecapitulatifPanier()
{
	var panierImg = document.getElementById("imgPanier");
	var panierImgBoundingRect = panierImg.getBoundingClientRect(); // get bounding rect for further positioning purpose (note : je commente souvent en anglais, ce n'est pas nécessairement du code pompé sur Internet :)

	// création du récapitulatif de panier
	var recapitulatifPanier = document.createElement("div");
	recapitulatifPanier.id ="recapitulatifPanier";

	// styling
	recapitulatifPanier.style.position = "absolute";
	recapitulatifPanier.style.width = "30%";
	recapitulatifPanier.style.backgroundColor = "white";
	recapitulatifPanier.style.border = "1px solid gray";
	recapitulatifPanier.style.boxShadow = "10px 20px 20px 0px rgba(0,0,0,0.75)";

	// positioning 
	recapitulatifPanier.style.top = panierImgBoundingRect.bottom + 20 + "px";
	recapitulatifPanier.style.right = window.innerWidth - (panierImgBoundingRect.right + panierImg.offsetWidth) + "px";

	// adding content
	var panier = localStorage.getItem('panier');
	for(var i = 0 ; i < panier.length ; i++){
		var index = panier[i];
		recapitulatifPanier.appendChild(createRecapitulatifVoyageBlock(
			destinationArray[index].toUpperCase(), // [in] nom de la destination
			dureeArray[index], // [in] durée du séjour
			nbPersonneReservationArray[index] // [in] nombre de personnes incluses dans le voyage
		));
	}

	return recapitulatifPanier;
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Crée un block affiché dans le récapitulatif des commandes, affichant les informations élémentaires d'un voyage commandé. Ce block comprend
// une icône de suppression dudit block (c'est une image de poubelle)
// @note
//  Informations affichées : destination, durée, prix, nbPersonnes
function createRecapitulatifVoyageBlock(
	dest, // [in] nom de la destination
	dur, // [in] durée du séjour
	pers // [in] nombre de personnes incluses dans le voyage
)
{
	var block = document.createElement("div");
	block.classList.add("recapitulatifVoyageBlock");

	var destination = document.createElement("span");
	destination.classList.add("panierRecapitulatifDestination");
	destination.innerHTML = dest;

	var duree = document.createElement("span");
	duree.classList.add("panierRecapitulatifDuree");
	duree.innerHTML = dur;

	var nbPersonnes = document.createElement("span");
	nbPersonnes.classList.add("panierRecapitulatifNBPersonnes");
	nbPersonnes.innerHTML = pers;

	// icône de poubelle + click handler
	var poubelle = document.createElement("img");
	poubelle.classList.add("imgPoubelle");
	poubelle.src = "img/poubelle.png";
	poubelle.addEventListener("click", function(){ // onclick = remove the whole block
		this.parentNode.remove();
	});

	block.appendChild(destination);
	block.appendChild(duree);
	block.appendChild(nbPersonnes);
	block.appendChild(poubelle);

	return block;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Listen for click events
// Permet d'activer ou de désactiver la visibilité du password dans le champ
document.addEventListener('click', function (event)
{
	console.log("L'évènement est lancé");
	var x = document.getElementById("user_password");
	
	if (x.type === "password" && event.target.name == "ShowPassword")
	{
		x.type = "text";
	}
	else if (x.type != "password" && event.target.name == "ShowPassword")
	{
	    x.type = "password";
	}
	else
	{
		console.log("Le bouton n'a pas été reconnu");
	}
}
, false);


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Initialise le panier
function initPanier(){
	var panier = localStorage.getItem('panier');
	if(panier === null){
		var panier = [];
		localStorage.setItem('panier', panier);
	}
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Sauvegarde une nouvelle réservation dans le panier de façon durable, grâce au local storage
function addElementToPanier(element){
	var panier = localStorage.getItem('panier');
	panier.push(element);
	localStorage.setItem('panier', panier);
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Supprime une réservation du panier, grâce au local storage
// @note
//  'element' doit être le nom de la destination à supprimer
function removeElementFromPanier(element){
	var panier = localStorage.getItem('panier');
	var index = destinationMap.get(element);
	panier.remove(index);
	localStorage.setItem('panier', panier);
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Permet de vérifier si l'utilisateur a rentré de bons mots de passe/login et de l'identifier (virtuellement). 
// La fonction va renvoyer 0 si le login n'est pas dans la base de donnée, 1 si le mot de passe est faux et 2 si l'utilisateur est log correctement.
function logchecker(login, mdp)
{
	var login_number = 3;
	var i = 0;

	// Cette boucle permet de voir si le login est dans la base de donnée
	while (i < 3){
		if (login == loginArray[i])
			login_number = i;

		i++;
	}

	if (login_number != 3)//Si le login est dans la base
	{
		if (passwordArray[login_number] == mdp)//On vérifie que le mot de passe soit bon
			document.getElementById("error_login").innerHTML = "Vous êtes maintenant identifié en tant que " + login + ".";
		else
			document.getElementById("error_login").innerHTML = "Votre mot de passe pour le nom d'utilisateur " + login + " n'est pas correct.";
	}
	else
		document.getElementById("error_login").innerHTML = "Le nom d'utilisateur "+login+" n'existe pas.";
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
// Permet de créer une fenêtre pop-up destinée au login
function login(url, title, w, h){
	popupwindow("login.html","Identifiez-vous !",900,500);
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
// Permet de créer une fenêtre pop-up centrée
function popupwindow(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Affiche le message d'erreur 'errorMessage' afin que l'utilisateur soit au courant de ce qu'il se passe 
displayErrorMessage = function(errorMessage){
	document.getElementById('errorMessage').style.display = "block";
	document.getElementById('errorMessage').innerHTML = errorMessage;
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Cache le message d'erreur 'errorMessage'
hideErrorMessage = function(){
	document.getElementById('errorMessage').innerHTML = "";
	document.getElementById('errorMessage').style.display = "none";
}











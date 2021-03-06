document.addEventListener('DOMContentLoaded', function()
{
	// création du panier
	initPanier();

	// init filter's <select>
	populateFiltrage();

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

					var depart = document.createElement("p");
					depart.classList +="dateDepart";
					depart.innerHTML = dateArray[i].toLocaleDateString();

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
		destinationMetaData.appendChild(depart);
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
// @brief
//  Dans la page home.html, cette fonction analyse l'ensemble des annonces disponibles et rempli le champs des filtres possibles des différents
// mois disponibles, ordonnés dans l'ordre croissant
function populateFiltrage()
{
	var DOMSelect = document.getElementById("filtreSelect");

	// ajout de la valeur par défaut du <select>
	var option = document.createElement("option");
	option.value = "Date indifférente";
	option.text = "Date indifférente";
	DOMSelect.appendChild(option);
	DOMSelect.selectedIndex = 1;

	// récupération des différentes dates disponibles, en ne gardant que les mois
	var availableDates = [];
	for(var date of dateArray)
	{
		// if the date hasn't already been found, add it
		var stringifiedDate = date.toLocaleDateString();
		var addableDate = stringifiedDate.split("/")[0] + "/" + stringifiedDate.split("/")[2];
		if(availableDates.indexOf(addableDate) == -1)
			availableDates.push(addableDate);
	}

	// sort les mois par ordre croissant
	availableDates.sort(function(a, b){
		var monthA = toLiteral( a.split("/")[0] );
		var monthB = toLiteral( b.split("/")[0] );

		var monthWeight = { "Janvier": 0, "Février": 1, "Mars": 2, "Avril": 3, "Mai": 4, "Juin": 5, "Juillet": 6, "Août": 7, "Septembre": 8, "Octobre": 9, "Novembre": 10, "Décembre": 11 };
    		return monthWeight[monthA] - monthWeight[monthB];
	});

	// ajout des options au DOM
	for(var date of availableDates){
		var option = document.createElement("option");
		var month = toLiteral( date.split("/")[0] );
		var year = date.split("/")[1];
		option.value = month + " " + year;
		option.text = month + " " + year;
		DOMSelect.appendChild(option);
	}
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Transforme un mois de l'année exprimé par le chiffre 'n' allant de 1 à 12, en son équivalent en français
function toLiteral(n){
	switch(parseInt(n)){
		case 1: return "Janvier";	case 4 : return "Avril";		case 7 : return "Juillet";		case 10 : return "Octobre";
		case 2: return "Février";	case 5 : return "Mai";		case 8 : return "Août";			case 11 : return "Novembre";
		case 3: return "Mars";		case 6 : return "Juin";		case 9 : return "Septembre";		case 12 : return "Décembre";
	}
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Listen for click events
// Permet d'activer ou de désactiver la visibilité du password dans le champ
document.addEventListener('click', function (event)
{
	var x = document.getElementById("user_password");
	if (x.type === "password" && event.target.name == "ShowPassword")
		x.type = "text";
	else if (x.type != "password" && event.target.name == "ShowPassword")
	    x.type = "password";
}
, false);


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Fonction appelée lors du clic sur l'icône de panier : elle crée un récapitulatif de commande sous l'icône de panier, permettant de visualiser
// les éléments désirés, mais aussi de les supprimer ou bien de modifier leur quantité
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
// Crée le récapitulatif d'un bloc positionné au-dessus de tout autre contenu, activé lors du clic et désactivé lors d'un clic répété
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
	var indexes = panier.split("-");
	for(var i = 0 ; i < indexes.length ; i++){
		var index = indexes[i];
		if(index != ""){
			recapitulatifPanier.appendChild(createRecapitulatifVoyageBlock(
				destinationArray[index], // [in] nom de la destination
				dureeArray[index], // [in] durée du séjour
				localStorage.getItem("nbPersonneReservation#" + index) + " personnes" // [in] nombre de personnes incluses dans le voyage
			));
		}	
	}

	return recapitulatifPanier;
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Crée un block affiché dans le récapitulatif des commandes (le panier), affichant les informations élémentaires d'un voyage commandé. 
// Ce block comprend une icône de suppression dudit block (c'est une image de poubelle)
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
		removeElementFromPanier(dest);
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
document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector("#ShowPassword");
    _selector.addEventListener('change', function (event) {
    	var champ_password = document.getElementById("user_password");
        if (_selector.checked) {
            champ_password.type = "text";
        } else {
            champ_password.type = "password";
        }
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Initialise le panier
function initPanier(){
	//localStorage.setItem("panier", "");
	var panier = localStorage.getItem('panier');
	if(panier == null || panier.length === 0)
		localStorage.setItem('panier', "");
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Sauvegarde une nouvelle réservation dans le panier de façon durable, grâce au local storage
// @note
//  Les index sont stockés de telle façon que chaque index est séparé par un tiret. Par exemple : "3-1-2"
function addElementToPanier(element){
	var panier = localStorage.getItem('panier');
	var index = destinationMap.get(element);

	// on n'ajoute un tiret que si il y a déjà des index. Sinon, simplement l'index :-)
	if(panier.length === 0)
		panier += index;
	else
		panier += "-" + index;

	localStorage.setItem('panier', panier);
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
//  Supprime une réservation du panier, grâce au local storage
// @note
//  'element' doit être le nom de la destination à supprimer
function removeElementFromPanier(element){
	var panier = localStorage.getItem('panier');
	var indexToRemove = destinationMap.get(element);

	var reconstructedPanier = "";
	for(var index of panier.split("-")){
		if(index != indexToRemove)
			reconstructedPanier += index + "-"; 
	}

	// suppression du dernier tiret
	reconstructedPanier = reconstructedPanier.substring(0, reconstructedPanier.length - 1);
	localStorage.setItem('panier', reconstructedPanier);
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
			{
				document.getElementById("error_login").classList = "greencolor";
				document.getElementById("error_login").innerHTML = "Vous êtes maintenant identifié en tant que " + login + ".";
			}
		else

		{
			document.getElementById("error_login").innerHTML = "Votre mot de passe pour le nom d'utilisateur " + login + " n'est pas correct.";
		}
	}
	else
	{
		document.getElementById("error_login").innerHTML = "Le nom d'utilisateur "+login+" n'existe pas.";
	}
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// @brief
// Permet de créer une fenêtre pop-up destinée au login
function login(url, title, w, h){
	popupwindow("login.html","Identifiez-vous !",600,330);
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











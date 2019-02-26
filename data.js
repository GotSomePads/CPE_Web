// Données de login factices
var loginArray = ["admin", "guest", "test"];
var passwordArray = ["admin", "password", "12345"];

// données brutes de remplissage de la page d'accueil
var destinationArray = [
	"Meulin", 
	"Pierre Latte", 
	"Lyon", 
	"New York", 
	"Brasilia", 
	"Singapour"
];

// map utilisée lors d'un ajout d'un élément dans un panier. A un nom de destination, correspond son indice dans l'array de l'ensemble des données
// (puisqu'un indice dans un tableau est commun à tout les autres : à destinationArray[0] correspond dureeArray[0] par exemple)
var destinationMap = new Map( );
for(var i = 0 ; i < destinationArray.length ; i++)
	destinationMap.set(destinationArray[i], i);

// le panier contient les indices des commandes passées. Grâce à ces indices, on peut facilement accéder à l'ensemble de leurs informations
//Ex : 1 -> Pierre Latte.
var panierArray;

var imagePathArray = [
	"img/meulin.jpg", 
	"img/pierrelatte.jpg", 
	"img/lyon.jpg", 
	"img/ny.jpeg", 
	"img/brasilia.jpg", 
	"img/singapour.gif"
];

// date format : year, month, day, hour, minute
var dateArray = [
	new Date(Date.UTC(2019, 2, 21, 20, 30)),
	new Date(Date.UTC(2019, 3, 1, 10, 00)),
	new Date(Date.UTC(2019, 4, 2, 9, 00)),
	new Date(Date.UTC(2019, 3, 15, 2, 15)),
	new Date(Date.UTC(2019, 5, 25, 23, 23)),
	new Date(Date.UTC(2019, 1, 12, 15, 49))
];

var dureeArray = [
	"10 minutes", 
	"4 jours", 
	"4 ans", 
	"10 heures", 
	"3 jours", 
	"40 ans"
];

var prixArray = [
	960, 
	10, 
	1000, 
	54, 
	0, 
	1054
];

var descriptionArray = [
	"Ballade champêtre dans la capitale des gaules Meulin : une formidable épopée vous attend durant ces dix minutes de ballade au coeur du centre ville. Activités pour toute la famille !", 
	"Venez découvrir le fabuleux centre nucléaire et la faune atypique l'environant. Encerclés mais dorlotés, vous saurez apprécier.", 
	"Lyon c'est beau et c'est grand, nous vous invitons à venir très vite et très longtemps.",
	"New York c'est très beau et c'est très grand et puis il y a un parc gigantesque ça va être super je vous en prie n'hésitez pas à vous joindre à notre super team pour un... SUPER voyage !",
	"Brasilia es una gran ciudad realmente es genial lo que espero veros muy, muy, muy, muy muchos y el traductor entenderá bien lo que yo digo que es genial porque es un performa.",
	"Здесь должен происходить перевод? Я жду твоего ответа, и мои деньги, сердечно."
];
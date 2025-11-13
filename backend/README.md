# API REST Backend App Gestion des notes avec NodeJS Express MongoDB

## Présentation
C'est une API faite pour la gestions des notes avec une authentification qui utilise JWT (JsonWebToken) et bcryptjs


Il est développer avec le framework **Express JS** pour sa simple utilisation et d'autres librairies.

La gestion des erreur est faite grace aux codes d'état (200, 400 et 500)

## Installation du projet 
1- Cloner le projet sur votre machine en tapant cette commande 
```bash
git clone https://github.com/bkrfeveo/note-management-app.git
```
2- Initialiser npm et installer les dépendances
```bash
cd backend/
npm init -y
npm install 
```
3- Lancer le serveur node js
```bash
cd src/
node app.js
```
4- Utiliser ce collection postman pour les test [Collection Postman de tests](https://www.postman.com/restless-equinox-22834/workspace/public-workspace/collection/38778849-ac4eb506-3f09-4b4b-8dc7-ee2bdef22161?action=share&creator=38778849)


## Endpoint 
Nous avons les endpoints CRUD et ceux d'authentification dans l'API :

+ **GET ```/api/notes```** - Pour récupérer toutes les tâches
+ **GET ```/api/notes/:id```** - Pour récupérer une tâche par ID
+ **POST ```/api/notes```** - Pour créer une nouvelle tâche
+ **PUT ```/api/notes/:id```** - Pour mettre à jour une tâche en utilisant son ID
+ **DELETE ```/api/notes/:id```** - Pour supprimer une tâche en utilisant son ID

+ **POST ```/api/auth/register```** - Inscription
+ **POST ```/api/auth/login```** - connexion


Apres connexion un token est genere ce qui vous permettra de faire les opérations CRUD


## Code d'état utilisés dans ce projet

+ ```200```: La requête a été traitée avec succès
+ ```201```: La requête a réussi et une nouvelle ressource a été créée
+ ```400```: La requête du client est mal formée
+ ```403```: Non autorisé à recevoir la requête demandée
+ ```404```: La ressource demandée n'a pas pu être trouvée sur le serveur.
+ ```500```: Erreur cote serveur lors du traitement des données.


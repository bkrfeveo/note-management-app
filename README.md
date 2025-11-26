# note-management-app
## Description
Ce projet est une application de gestion de notes avec authentification conçue pour créer, lire, modifier et supprimer des notes via une interface web. Le frontend est fait avec Vite + React déployé sur Vercel et le backend est avec NodeJS, ExpessJS et documentée avec Swagger.

## Fonctionnalités
- Authentification JWT (Inscription, Connexion, Deconnecion)
- Création, lecture, mise à jour et suppression de notes
- Recherche et filtrage en temps réel
- Theme mode sombre/clair
- Uploader des document ou images
- API RESTful documentée (Swagger)

## Lien utiles
- Documentation API (Swagger) : [https://app.swaggerhub.com/apis/feveo/api-note-management/1.0.0](https://app.swaggerhub.com/apis/feveo/api-note-management/1.0.0)
- Application déployée (Vercel) : [https://note-management-app-omega.vercel.app/](https://note-management-app-omega.vercel.app/)

## Stack technique (exemple)
- Frontend : Vite + React
- Backend : Node.js / Express
- Base de données : MongoDB
- Déploiement : Vercel (frontend)
- Docker 

## Installation (local)
1. Cloner le dépôt

```bash
    git clone https://github.com/bkrfeveo/note-management-app.git
```
2. Installer les dépendances et lancer les serveurs 

  - Frontend
    ```bash
      cd ./frontend
      npm install
      npm run dev
    ```
  - Backend
    ```bash
      cd ./backend
      npm install
      node app.js
    ```


## Structure du projet

```
├── note-management-app
│   ├── /frontend
|   |   ├── /public
|   |   ├── /src
|   |   |  ├── /assets
|   |   |  ├── /components
|   |   |  ├── /context
|   |   |  ├── /services
|   |   |  ├── /utils
|   |   |  ├── App.css
|   |   |  ├── App.jsx
|   |   |  ├── index.css
|   |   |  ├── main.jsx
│   │   ├── .gitignore
│   │   ├── Dockerfile
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── vercel.json
│   │   └── vite.config.js
│   ├── /backend
│   │   ├── /src
│   │   │   ├── /config
│   │   │   ├── /controllers
│   │   │   ├── /middleware
│   │   │   ├── /models
│   │   │   ├── /routes
│   │   │   └── /services
│   │   ├── /test
│   │   ├── /uploads
│   │   ├── .gitignore
│   │   ├── app.js
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── README.md
|   ├── docker-compose.yml
|   └── README.md


```


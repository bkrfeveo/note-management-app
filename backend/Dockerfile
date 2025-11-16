FROM node:20-alpine

WORKDIR /note-management-app/backend

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande de démarrage
CMD ["node", "app.js"]
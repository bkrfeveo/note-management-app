const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

/**
 * les méthodes statiques pour manipuler et traiter des 
 * images avec la bibliothèque Sharp en convertissant 
 * de grandes images dans des formats courants en 
 * images JPEG.
*/

class ImageService {
    // Redimensionner et convertir une image
    static async processImage(filePath, options = {}) {
        const { 
            width = 800,
            height = 600, 
            quality = 80, 
            format = 'jpeg' // Format de sortie
        } = options;

        const outputDir = path.dirname(filePath);
        const originalExt = path.extname(filePath);
        const baseName = path.basename(filePath, originalExt);

        const processedFilename = `${baseName}_processed.${format}`;
        const processedPath = path.join(outputDir, processedFilename);

        try {
            // Traitement de l'image avec Sharp
            await sharp(filePath)
                .resize(width, height, {
                    fit: 'inside',  // Maintient les proportions
                    withoutEnlargement: true  // N'agrandit pas les petites images
                })[format]({ quality })
                .toFile(processedPath)
            
            return {
                processedPath,
                processedFilename, 
                originalPath: filePath
            };
        } catch (err) {
            throw new Error(`Erreur lors du traitement de l'image: ${err.message}`);
        }
    }   


    // Créer une miniature carrée pour qu'il se charge en 1er avant le vrai image
    static async generateThumbnail(filePath, size = 200) {
        const outputDir = path.dirname(filePath);
        const originalExt = path.extname(filePath);
        const baseName = path.basename(filePath, originalExt);
        
        const thumbnailPath = path.join(outputDir, `${baseName}_thumb${originalExt}`);

        try {
        await sharp(filePath)
            .resize(size, size, {
            fit: 'cover',   // Remplit tout l'espace (recadrage) au lieu de maintenir le proportions
            position: 'center'
            })
            .jpeg({ quality: 70 })  // reduire la qualite a 70 pour les miniatures
            .toFile(thumbnailPath);

        return thumbnailPath;
        } catch (error) {
        throw new Error(`Erreur lors de la création de la miniature: ${error.message}`);
        }
    }


    //  Extraire les informations techniques (metadonnees)
    static async getImageMetadata(filePath) {
        try {
        const metadata = await sharp(filePath).metadata();
        return {
            width: metadata.width,
            height: metadata.height,  
            format: metadata.format,
            space: metadata.space,  // Espace colorimétrique
            channels: metadata.channels,    // 3 (RGB) ou 4 (RGBA)
            density: metadata.density   // Résolution en DPI
        };
        } catch (error) {
        return null;
        }
    }
}

module.exports = ImageService;
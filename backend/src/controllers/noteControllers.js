const Note = require('../models/Note');

// Recuperer toutes les notes créées par l'utilisateur qui l'a créé
exports.getAllNotes = async (req, res) => {
    try {
        // Pagination
        const { page = 1, limit = 10 } = req.query;
        // console.log(req.user);
        
        const filter = { createdBy: req.user._id };
        const notes = await Note.find(filter)
        // du plus recent au plus ancien
        .sort({ createdAt: -1 })
        // afficher les taches par groupe de 10 taches
        .limit(limit * 1)
        // sauter les taches des pages precedentes
        .skip((page - 1) * limit);

        // le nombre de taches trouvees
        const total = await Note.countDocuments(filter);

        res.status(200).json({
            notes,
            user: req.user,
            // Math.ceil pour arrondir a l'entier superieur
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la recuperation des notes',
            error: err.message
        });
    }
};

// Voir une note specifique grace a son ID
exports.getNoteId = async (req, res) => {
    try {
        const idParams = req.params.id;

        const noteId = await Note.findById(idParams)
        // ajouter dans champ createdBy avec les informations de l'utilisateur (name et email)
        .populate('createdBy', 'name email') || undefined;
        
        console.log(noteId);
        
        // Verifier si la note demandee existe
        if (!noteId || noteId === undefined)
             return res.status(404).json({ message: "Note demandée introuvable "});

        // Verifier si la note demandee appartient au user qui le demande
        if (noteId.createdBy._id.toString() !== req.user._id.toString()) 
            return res.status(403).json({ message: 'Accès refusé, cette ressource ne vous appartient pas' });

        res.status(200).json({
            message: "Note recupérée avec succès ",
            noteId: noteId
        });
    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la recuperation de la note specifiee',
            error: err.message
        });
    }
};

// Creer une nouvelle note
exports.createNote = async (req, res) => {
    try {
        const { title, content, categorie } = req.body;
        const createdBy = req.user._id;

        if(!title || title === "") 
            res.status(400).json({ message: "Le titre est requis" });

        if(!content || content === "") 
            res.status(400).json({ message: "Le contenu est requis" });

        // Creer une nouvelle note
        const newNote = new Note({ title, content, categorie, createdBy });

        // Enregistrer la note
        await newNote.save();

        res.status(201).json({
            message: "Note créée avec succès !",
            note: newNote
        });
    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la creation de la note',
            err: err.message
        });
    }
};

// Mettre a jour une note
exports.updateNote = async (req, res) => {
    try {
        const idParams = req.params.id;
        const { title, content, categorie } = req.body;

        const noteId = await Note.findById(idParams);
        console.log(noteId);
        
        // Verifier si la note demandee existe
        if (!noteId)
            res.status(404).json({ message: "Note demandée non trouvée" });

        // Verifier si la note demandee appartient au user qui le demande
        if (noteId.createdBy._id.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Accès refusé, cette ressource ne vous appartient pas' });

        // Effectuer la mise a jour
        const noteUpdated = {
            title: title || noteId.title,
            content: content || noteId.content,
            categorie: categorie || noteId.categorie,
        };

        await Note.findByIdAndUpdate(
            idParams,
            noteUpdated
        ).populate('createdBy', 'name email');

        res.status(200).json({ 
            message: "Tache mise à jour avec succès", 
            noteUpdated: noteUpdated,
        });

    } catch (err) { 
        res.status(500).json({
            message: 'Erreur lors de la mise a jour de la tache',
            error: err.message
        }); 
    }
};

// Supprimer une note
exports.deleteNote = async (req, res) => {
    try {
        const idParams = req.params.id;
        const noteId = await Note.findById(idParams);

        // Verifier si la note demandee existe
        if (!noteId)
            res.status(404).json({ message: "Note demandée non trouvée" });

        // Verifier si la note demandee appartient au user qui le demande
        if (noteId.createdBy._id.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Accès refusé, cette ressource ne vous appartient pas' });

        // Supprimer la tache si y'a pas de probleme
        await Note.findByIdAndDelete(idParams);

        // Message de succes de la suppression
        res.status(200).json({ message: "Tache supprimée avec succès" });
    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de la tache',
            error: err.message
        });
    }
}
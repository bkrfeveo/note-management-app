

export default function NoteStatistic({ notes }) {
    const totalNotes = notes?.length;
    // const favoriteNotes = notes?.filter(note => note.isFavorite).length;
    const notesReunion = notes?.filter(note => note.category === 'reunion').length;
    const notesUrgentes = notes?.filter(note => note.category === 'urgentes').length;
    const notesTravail = notes?.filter(note => note.category === 'travail').length;
    const notesPersonnel = notes?.filter(note => note.category === 'personnel').length;
    const notesAutre = notes?.filter(note => note.category === 'autres').length;

    return (
        <div className="p-4 border border-gray-400 rounded-lg shadow-md mb-2">
            <h2 className="text-xl themeApp font-bold mb-4 text-gray-800">Vos Statistiques</h2>
            {notes?.length > 0 && 
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-8 justify-between">
                <div className="text-center bg-gray-600/40 p-2 rounded-lg">
                    <p className="bg-transparent font-medium">Total Notes</p>
                    <p className="text-3xl font-bold">{totalNotes}</p>
                </div>  
                <div className="text-center bg-blue-500/40 p-2 rounded-lg">
                    <p className="bg-transparent font-medium">Notes Personnels</p>
                    <p className="text-3xl font-bold text-blue-500">{notesPersonnel}</p>
                </div>
                <div className="text-center bg-yellow-500/40 p-2 rounded-lg">
                    <p className="bg-transparent font-medium">Notes Réunion</p>
                    <p className="text-3xl font-bold text-yellow-500">{notesReunion}</p>
                </div>
                <div className="text-center bg-green-500/40 p-2 rounded-lg">
                    <p className="bg-transparent font-medium">Notes Urgentes</p>
                    <p className="text-3xl font-bold text-green-500">{notesUrgentes}</p>
                </div>
                <div className="text-center bg-purple-500/40 p-2 rounded-lg">
                    <p className="bg-transparent font-medium">Notes Travail</p>
                    <p className="text-3xl font-bold text-purple-500">{notesTravail}</p>
                </div>
                <div className="text-center bg-pink-500/40 p-2 rounded-lg">
                    <p className="bg-transparent font-medium">Autres Notes</p>
                    <p className="text-3xl font-bold text-pink-500">{notesAutre}</p>
                </div>
            </div>}
            {(!notes?.length  || notes?.length === 0 )&& <p className="themeApp text-gray-600 text-center py-10">Aucun note disponible pour afficher les statistiques.</p>}
        </div>
    );
}
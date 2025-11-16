import { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';
import logoutService from '../services/logout';
import { useNavigate } from 'react-router-dom';
import getAllNotesService from '../services/getAllNotes';
import { LogOut, Plus } from 'lucide-react';


export default function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [addNewNote, setAddNewNote] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }, [notes]);
    
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await getAllNotesService();
            console.log(fetchedNotes);
            setNotes(fetchedNotes.notes);
        };
        fetchNotes();
    }, []);

    const handleLogout = () => {
        logoutService();
        navigate('/connexion');
    };


    return (
        <div className="bg-white from-blue-50 to-purple-50 p-8 md:px-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className='flex justify-between'>
                    <div className="mb-8 flex flex-col gap-3">
                        <h1 className="md:text-6xl text-4xl font-bold text-gray-800 mb-2">📝 Mes Notes</h1>
                        <p className="text-gray-600 text-xl font-medium">Organisez vos idées simplement</p>
                    </div>
                    <button
                        className="bg-red-500/30 hover:bg-red-600/35 duration-200 active:bg-red-300 text-red-500 font-medium w-fit h-fit p-2 rounded-md"
                        title='Déconnecter'
                        onClick={handleLogout}
                    ><LogOut /></button>
                </div>
                <div className="flex flex-col gap-10 mb-8">
                    <div>
                        <h2 className="text-gray-700 text-left mb-4 font-medium text-2xl">Filtrer vos recherches</h2>
                        <div className="flex md:flex-row flex-col-reverse gap-4 justify-between">
                            <input
                                className="px-4 md:w-1/2 text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                                // value={searchTask}
                                // onChange={(e) => setSearchTask(e.target.value)}
                                type="search"
                                placeholder="Recherchez ici"
                                name="searchTask"
                                id="searchTask"
                            />
                            
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-3 w-full">
                        <div className="w-full grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                            <select
                                className="px-4 text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                                // onChange={(e) => setLevelPriority(e.target.value)}
                                name="filterPriority"
                                id="filterPriority"
                            >
                                <option value="">Catégorie</option>
                                <option value="personnel">Personnel</option>
                                <option value="travail">Travail</option>
                                <option value="urgent">Urgent</option>
                                <option value="reunion">Reunion</option>
                                <option value="autres">Autres</option>
                            </select>
                            <input
                                className="px-4 text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                                // value={searchTask}
                                // onChange={(e) => setSearchTask(e.target.value)}
                                type="date"
                                placeholder="Recherchez ici"
                                name="searchTask"
                                id="searchTask"
                            />
                            <input
                                className="border border-blue-400 hover:bg-blue-400 hover:text-white active:text-white duration-200 active:bg-blue-500 text-gray-700 font-medium py-2 px-6 rounded-[10px]"
                                type="reset"
                                // onClick={handleReset}
                                value="Reinitialiser"
                            />
                            {/* Formulaire de création */}
                            <button
                                className="flex items-center gap-3 justify-center bg-blue-500 hover:bg-blue-600 text-white duration-200 active:bg-blue-700 font-medium py-2 px-6 rounded-[10px]"
                                onClick={() => { setAddNewNote(!addNewNote); setIsFinish(false);}}
                            >
                                {!addNewNote ? 
                                <>
                                    <Plus />
                                    <span>Nouveau note</span>
                                </>
                                :
                                <>
                                    <span>Annuler</span>
                                </>}
                            </button>
                        </div>
                    </div>
                </div>
                {addNewNote && <NoteForm isOpen={addNewNote} />}   
                {/* Grille de notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.map(note => (
                    <>
                        {/* <NoteItem note={note} /> */}
                        <NoteCard key={note.id} note={note} />
                    </>
                ))}
                </div>

                {notes.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <p className="text-2xl font-semibold">Aucune note pour le moment</p>
                    <p className="text-md mt-2">Créez votre première note ci-dessus !</p>
                </div>
                )}
            </div>
        </div>
    );
}
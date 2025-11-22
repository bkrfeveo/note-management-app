import { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';
import { useNavigate } from 'react-router-dom';
import { LogOut, Moon, Plus, Sun } from 'lucide-react';
import EditNoteForm from './EditNoteForm';
import { getAllNotesService } from '../services/noteServices';
import { logoutService } from '../services/authServices';
import { useTheme } from '../context/themeProvider';
import NoteStatistic from './NoteStatistic';
import { EditProvider, useEdit } from '../context/EditContext';


export default function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [userInfos, setUserInfos] = useState({});
    const [addNewNote, setAddNewNote] = useState(false);

    // States de recherches et de filtres
    const [searchNote, setSearchNote] = useState("");
    const [category, setcategory] = useState("");
    const [dateNote, setDateNote] = useState("");
    // Variable theme sombre/clair
    const { toggleTheme, darkMode } = useTheme();

    const navigate = useNavigate();
    const legendcategory = [
        { category: 'personnel', class: 'w-5 h-5 bg-blue-300 rounded-sm' },
        { category: 'travail', class: 'w-5 h-5 bg-purple-300 rounded-sm' },
        { category: 'reunion', class: 'w-5 h-5 bg-yellow-300 rounded-sm' },
        { category: 'urgent', class: 'w-5 h-5 bg-green-300 rounded-sm' },
        { category: 'autres', class: 'w-5 h-5 bg-pink-300 rounded-sm' },
    ]

    
    useEffect(() => {
        // S'il y a des note on le stocke dans le localStorage 
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
        // Recuperer toutes les notes de l'utilisateur
        const fetchNotes = async () => {
            const fetchedNotes = await getAllNotesService();
            console.log(fetchedNotes);
            setNotes(fetchedNotes.notes);
            setUserInfos(fetchedNotes.user);
        };
        fetchNotes();
    }, []);
    // console.log(notes);
    

    const filteredNotes = notes.filter((note) => {
        // recuperer les donnees recherchees tout en prenant en compte la sensibilite a la casse
        const matchesSearch = note.content.toLowerCase().includes(searchNote.toLowerCase())
        && note.category?.toString().includes(category.toString())
        && note.createdAt?.toString().includes(dateNote.toString());

        return matchesSearch;
    });

    // Deconnexion
    const handleLogout = () => {
        logoutService();
        navigate('/connexion');
    };

    // Reinitialiser les recherches
    function handleReset () {
        setSearchNote("");
        setcategory("");
        setDateNote("");
    };


    return (
        <EditProvider>
            <div className="w-full themeApp py-8 md:px-12 px-4">
                <div className='flex justify-between'>
                    <div className="mb-8 flex flex-col gap-3">
                        <h1 style={{ fontSize: '40px' }} className="font-bold themeApp text-gray-800 mb-2">📝 Mes Notes</h1>
                        <p className="text-gray-600 mt-4 themeApp text-xl font-medium">Organisez vos idées simplement</p>
                    </div>
                    <div className='flex flex-row gap-4 items-start'>
                        <p className='mt-2 text-lg'>Bienvenue <strong>{userInfos?.name?.split(' ')[0]}</strong></p>
                        <button
                            className='bg-blue-500/30 hover:bg-blue-600/35 duration-200 active:bg-blue-300 text-blue-500 w-fit h-fit p-2 rounded-md'
                            onClick={toggleTheme}
                        >
                            {darkMode ? <Moon /> : <Sun />}
                        </button>
                        <button
                            className="bg-red-500/30 hover:bg-red-600/35 duration-200 active:bg-red-300 text-red-500 font-medium w-fit h-fit p-2 rounded-md"
                            title='Déconnecter'
                            onClick={handleLogout}
                        ><LogOut /></button>
                    </div>
                </div>
                <div className="flex flex-col gap-10 mb-4">
                    <NoteStatistic notes={notes} />
                    <div>
                        <h2 className="text-gray-700 themeApp text-left mb-4 font-medium text-2xl">Filtrer vos recherches</h2>
                        <div className="flex md:flex-row flex-col-reverse gap-4 justify-between">
                            <input
                                className="px-4 w-full themeApp text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                                value={searchNote}
                                onChange={(e) => setSearchNote(e.target.value)}
                                type="search"
                                placeholder="Recherchez ici"
                                name="searchNote"
                                id="searchNote"
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-3 w-full">
                        <div className="w-full grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                            <select
                                className="px-4 themeApp text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                                onChange={(e) => setcategory(e.target.value)}
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
                                className="px-4 themeApp text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                                onChange={(e) => setDateNote(e.target.value)}
                                value={dateNote}
                                type="date"
                                name="dateNote"
                                id="dateNote"
                            />
                            <input
                                className="border themeApp border-blue-400 hover:bg-blue-500 hover:text-white active:text-white duration-200 active:bg-blue-600 text-gray-700 font-medium py-2 px-6 rounded-[10px]"
                                type="reset"
                                onClick={handleReset}
                                value="Reinitialiser"
                            />
                            {/* Formulaire de création */}
                            <button
                                className="flex items-center gap-3 justify-center bg-blue-500 hover:bg-blue-600 text-white duration-200 active:bg-blue-700 font-medium py-2 px-6 rounded-[10px]"
                                onClick={() => setAddNewNote(!addNewNote)}
                            >
                                <Plus />
                                <span>Nouvelle note</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-8 mb-4 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 justify-between'>
                    {legendcategory.map((legend) => (<div className='flex flex-row gap-2 items-center'>
                        <div className={legend.class}></div>
                        <p className='themeApp text-gray-600 font-medium'>{legend.category}</p>
                    </div>)
                    )}
                </div>
                <EditNoteForm />
                {addNewNote && <NoteForm isOpen={addNewNote} />}
                {/* Grille de notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNotes.map(note => (
                    <>
                        <NoteCard
                            key={note.id}
                            note={note}
                        />
                    </>
                ))}
                </div>
                {filteredNotes.length === 0 && (
                <div className="text-center py-16 text-gray-600">
                    <p className="text-2xl font-semibold">Aucune note trouvée</p>
                </div>
                )}
            </div>
        </EditProvider>
    );
}
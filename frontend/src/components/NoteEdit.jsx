import { useState } from "react";
import { COLORS } from "../utils/themeNote";
import { Edit2, Lock, Plus, Star, X } from "lucide-react";
import { Button, Dialog, Spinner } from "@radix-ui/themes";
import addNewNoteService from "../services/addNewNote";
import updateNoteService from "../services/updateNote";


export default function NoteEdit({ note }) {
    const [loading, setLoading] = useState(false);
    const [newNote, setNewNote] = useState({ 
        title: note.title, 
        content: note.content, 
        // color: 0, 
        // isPrivate: false, 
        // isFavorite: false, 
        categorie: note.categorie
    });

    const handleSubmit = async () => {
      try{
          const noteUpdated = {
            title: newNote.title,
            content: newNote.content,
            // isPrivate: newNote.isPrivate,
            // isFavorite: newNote.isFavorite,
            categorie: newNote.categorie,
          };
          setLoading(true);
          await updateNoteService(noteUpdated, note._id);
          console.log("Note mise a jour avec success !");
          
          // setNotes([note, ...notes]);
          setNewNote({ 
            title: '', 
            content: '', 
            isPrivate: false, 
            isFavorite: false, 
            categorie: '' 
          });
      } catch (err) { 
        console.error("Erreur cote client : ", err);
      } finally {
        setLoading(false)
      }
    };

    return (
      <Dialog.Root>
            <Dialog.Trigger>
                <button
                    className="p-2 bg-white/50 rounded hover:bg-blue-500 hover:text-white"
                    title="Éditer"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
            </Dialog.Trigger>
            <Dialog.Content>
                <div className="rounded-lg p-6 mb-8">
                    <div className="flex flex-row justify-between">
                        <Dialog.Title>
                            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Modifier une note</h2>
                        </Dialog.Title>
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                <X />
                            </Button>
                        </Dialog.Close>
                    </div>
                    <div className="space-y-3 flex flex-col gap-8 justify-around">
                    <div className="flex flex-col gap-5">
                        <input
                        type="text"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        placeholder="Titre de la note..."
                        className="w-full px-4 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                        <textarea
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        placeholder="Contenu de la note..."
                        className="w-full px-4 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none min-h-32"
                        />
                        <input
                        type="text"
                        value={newNote.categorie}
                        onChange={(e) => setNewNote({ ...newNote, categorie: e.target.value })}
                        placeholder="categorie (ex: travail, personnel, idées...)"
                        className="w-full px-4 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                        <div className="flex justify-around items-center gap-4 flex-wrap">
                        <button
                            onClick={() => setNewNote({ ...newNote, isPrivate: !newNote.isPrivate })}
                            className={`flex items-center gap-2 px-4 py-2 border border-gray-500 rounded-lg ${newNote.isPrivate ? 'bg-red-500 text-white border-none' : 'bg-white'}`}
                        >
                            <Lock className="w-4 h-4" />
                            Privé
                        </button>
                        <button
                            onClick={() => setNewNote({ ...newNote, isFavorite: !newNote.isFavorite })}
                            className={`flex items-center gap-2 px-4 py-2 border border-gray-500 rounded-lg ${newNote.isFavorite ? 'bg-yellow-500 text-white border-none' : 'bg-white'}`}
                        >
                            <Star className="w-4 h-4" />
                            Favori
                        </button>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className={`w-full ${loading && "pointer-events-none opacity-50"} flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold`}
                    >
                        {loading ?
                        <>
                            <Spinner />
                            Patientez
                        </>
                        :
                            "Modifier la note"
                        }
                    </button>
                    </div>
                </div>
            </Dialog.Content>
      </Dialog.Root>
    )
}
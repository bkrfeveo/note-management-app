import { useState } from "react";
import { COLORS } from "../utils/themeNote";
import { Lock, Plus, Star, X } from "lucide-react";
import { Button, Dialog, Spinner } from "@radix-ui/themes";
import addNewNoteService from "../services/addNewNote";
import EditorComponent from "./Editor";


export default function NoteForm() {
    const [loading, setLoading] = useState(false);
    const [newNote, setNewNote] = useState({ 
        title: '', 
        content: '', 
        // color: 0, 
        isPrivate: false, 
        isFavorite: false, 
        categorie: '' 
    });


    const handleSubmit = async () => {
      console.log(newNote);
      
      try{
        if (newNote.title.trim() || newNote.content.trim()) {
          const note = {
            title: newNote.title || 'Sans titre',
            content: newNote.content,
            // isPrivate: newNote.isPrivate,
            // isFavorite: newNote.isFavorite,
            categorie: newNote.categorie,
          };
          setLoading(true);
          // await addNewNoteService(note);
          console.log("Note ajoutee avec succes !");
          // setNotes([note, ...notes]);
          setNewNote({ 
            title: '', 
            content: '', 
            isPrivate: false, 
            isFavorite: false, 
            categorie: '' 
          });
        };
      } catch (err) { 
        console.error("Erreur cote client : ", err);
      } finally {
        setLoading(false)
      }
    };

    return (
      <Dialog.Root>
	      <Dialog.Trigger>
          <Button color="blue" size="4">
            Nouveau note
          </Button>
        </Dialog.Trigger>
          <Dialog.Content maxWidth="1000px">
            <div className={`rounded-lg p-6 mb-8`}>
              <div className="flex flex-row justify-between">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">Créer une nouvelle note</h2>
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                        <X />
                    </Button>
                </Dialog.Close>
              </div>
              <div className="space-y-3 flex flex-col gap-8 justify-around">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-medium text-lg text-gray-600">Titre de votre note</label>
                    <input
                      type="text"
                      id="title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Titre de la note..."
                      className="w-full px-4 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  {/* <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Contenu de la note..."
                    className="w-full px-4 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none min-h-32"
                  /> */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-medium text-lg text-gray-600">Contenu de votre note</label>
                    <EditorComponent content={newNote.content} />
                  </div>
                  <select
                      className="px-4 text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setNewNote({ ...newNote, categorie: e.target.value })}
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
                  className={`md:w-1/3 ${loading && "pointer-events-none opacity-50"} flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold`}
                >
                  {loading ?
                    <>
                      <Spinner />
                      Patientez
                    </>
                  :
                    <>
                      <Plus className="w-5 h-5" />
                      Ajouter la note
                    </>
                  }
                </button>
              </div>
            </div>
          </Dialog.Content>
      </Dialog.Root>
    )
}
import { useState } from "react";
import { COLORS } from "../utils/themeNote";
import { Plus, Star } from "lucide-react";
import { Spinner } from "@radix-ui/themes";
import addNewNoteService from "../services/addNewNote";
import EditorComponent from "./Editor";


export default function NoteForm({isOpen}) {
    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [newNote, setNewNote] = useState({ 
        title: '', 
        content: '', 
        isFavorite: false, 
        categorie: '' 
    });
    
    
    const handleSubmit = async () => {  
      try{
        if (!newNote.title.trim() || !newNote.content.trim()) {
          setMessageError(true);
        } else {
          setMessageError(false);
          setLoading(true);
          await addNewNoteService(newNote);
          console.log("Note ajoutee avec succes !\n", newNote);;
          setIsFinish(true);
          setNewNote({ 
            title: '', 
            content: '', 
            isFavorite: false, 
            categorie: '' 
          });
        };
      } catch (err) { 
        console.error("Erreur cote client : ", err);
      } finally {
        // console.log(newNote);
        setLoading(false);
      }
    };

    return (
      <div>
          {(isOpen && !isFinish) &&
            <div className={`rounded-lg p-6 mb-8 border`}>
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Créer une nouvelle note</h2>
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
                  <div className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-medium text-lg text-gray-600">Contenu de votre note</label>
                    <EditorComponent
                      onContentChange={(content) => setNewNote(prev => ({ ...prev, content }))}
                    />
                  </div>
                  <select
                      className="px-4 text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      value={newNote.categorie}
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
                  <button
                    onClick={() => setNewNote({ ...newNote, isFavorite: !newNote.isFavorite })}
                    className={`flex items-center w-fit gap-2 px-4 py-2 border border-gray-500 rounded-lg ${newNote.isFavorite ? 'bg-yellow-500 text-white border-none' : 'bg-white'}`}
                  >
                    <Star className="w-4 h-4" />
                    Mettre en favori
                  </button>
                </div>
                {messageError && 
                  <p className="text-red-500 -my-4 text-lg">
                    Le titre et le contenu sont obligatoires
                  </p>
                }
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
          }
      </div>
    )
}
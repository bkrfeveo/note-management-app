import { useState } from "react";
import { Edit2, Star} from "lucide-react";
import { Spinner } from "@radix-ui/themes";
import EditorComponent from "./Editor";
import { updateNoteService } from "../services/noteServices";
import { useEffect } from "react";
import { useEdit } from "../context/EditContext";


export default function EditNoteForm() {
    const { isEditing, editingItem, stopEditing } = useEdit()

    const [loading, setLoading] = useState(false);
    const [noteUpdate, setNoteUpdate] = useState({ ...editingItem });

    console.log("Note a modifier dans editForn : ", editingItem);
    // console.log("Note updated: ", noteUpdate);
    
    // Mettre à jour le formData quand l'item change
    useEffect(() => {
      if (editingItem) {
        setNoteUpdate(editingItem);
      }
    }, [editingItem]);

    
    const handleSubmit = async (e) => {  
      e.preventDefault();
      stopEditing();
      try{
        const noteUpdated = {
            content: noteUpdate.content,
            isFavorite: noteUpdate.isFavorite,
            category: noteUpdate.category,
        };
        setLoading(true);
        await updateNoteService(noteUpdated, noteUpdate._id);
        console.log("Note mise a jour avec success !", noteUpdated);
        
        setNoteUpdate({ 
            content: '', 
            isFavorite: false, 
            category: '' 
        });
      } catch (err) { 
        console.error("Erreur cote client : ", err);
      } finally {
        setLoading(false);
      }
    };

    const handleReset = () => {
      if (noteUpdate) {
        setNoteUpdate({
          content: noteUpdate.content || '',
          isFavorite: noteUpdate.isFavorite || false,
          category: noteUpdate.category || ''
        });
      }
      stopEditing()
    };

    return (
      <div>
          {(isEditing) && <div className={`rounded-lg p-6 mb-8 border`}>
              <h2 className="text-3xl themeApp font-semibold mb-4 text-gray-800">Modifier la note</h2>
              <div className="space-y-3 flex flex-col gap-8 justify-around">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-medium themeApp text-lg text-gray-600">Contenu de votre note</label>
                    <EditorComponent
                      onContentChange={(content) => setNoteUpdate(prev => ({ ...prev, content }))}
                    />
                  </div>
                  <div className="flex sm:flex-row flex-col gap-4 justify-between">
                    <select
                        className="px-4 themeApp text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={noteUpdate.category}
                        onChange={(e) => setNoteUpdate({ ...noteUpdate, category: e.target.value })}
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
                      onClick={() => setNoteUpdate({ ...noteUpdate, isFavorite: !noteUpdate.isFavorite })}
                      className={`flex themeApp items-center w-fit gap-2 px-4 py-2 border border-gray-500 rounded-lg ${noteUpdate.isFavorite ? 'bg-yellow-500 border border-yellow-500 text-white' : 'bg-white'}`}
                    >
                      <Star className="w-4 h-4" />
                      Mettre en favori
                    </button>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-4 justify-between">
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
                        <Edit2 className="w-5 h-5" />
                        Modifier la note
                      </>
                    }
                  </button>
                  <button
                    className="md:w-1/4 border themeApp border-blue-400 hover:bg-blue-500 hover:text-white active:text-white duration-200 active:bg-blue-600 text-gray-700 font-medium py-2 px-6 rounded-[10px]"
                    onClick={handleReset}
                  >Annuler</button>
                </div>
              </div>
            </div>
          }
      </div>
    )
}
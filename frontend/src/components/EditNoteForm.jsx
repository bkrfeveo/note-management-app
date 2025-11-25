import { useState } from "react";
import { Edit2, Star} from "lucide-react";
import { Spinner } from "@radix-ui/themes";
import { updateNoteService } from "../services/noteServices";
import { useEffect } from "react";
import { useEdit } from "../context/EditContext";
import EditorEditNoteForm from "./EditorEditNoteForm";
import { uploadFileService } from "../services/fileServices";


export default function EditNoteForm() {
    const { isEditing, editingItem, stopEditing } = useEdit();

    const [loading, setLoading] = useState(false);
    const [noteUpdate, setNoteUpdate] = useState({ ...editingItem });
    const [favorite, setFavorite] = useState(false);
    console.log("Note a modifier dans editForn : ", editingItem);
    const [fileNote, setFileNote] = useState({ file: '', noteId: '' });
    console.log('FileNote : ', fileNote);
    
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
            isFavori: favorite,
            category: noteUpdate.category,
        };
        setLoading(true);
        await updateNoteService(noteUpdated, noteUpdate._id);
        console.log("Note mise a jour avec success !", noteUpdated);
        
        // En cas d'ajout de fichier lors de la modification
        // setFileNote({...fileNote, noteId: `${noteUpdate._id}`});
        if (fileNote){
          try{
            console.log('FileNote dans le bloc try : ', fileNote);
            await uploadFileService(fileNote);
            console.log("Fichier ajoute avec success \n");
            setFileNote({ file: '', noteId: '' });
          } catch (err) {
            console.error("Erreur lors de l'ajout du fichier : ", err?.message);
            setFileNote({ file: '', noteId: '' });
          }
        };

        setNoteUpdate({ 
            content: '', 
            isFavori: false, 
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
          isFavori: noteUpdate.isFavori || false,
          category: noteUpdate.category || ''
        });
      }
      stopEditing();
    };

    return (
      <div>
          {isEditing && <div className={`rounded-lg p-6 mb-8 border`}>
              <h2 className="text-3xl themeApp font-semibold mb-4 text-gray-800">Modifier la note</h2>
              <div className="space-y-3 flex flex-col gap-8 justify-around">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-medium themeApp text-lg text-gray-600">Contenu de votre note</label>
                    <EditorEditNoteForm
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
                      className={`flex items-center w-fit gap-2 px-4 py-2 border border-gray-500 rounded-lg ${favorite ? 'bg-yellow-500 text-white border-none' : 'bg-white'}`}
                      onClick={() => setFavorite(!favorite)}
                    >
                      <Star className="w-4 h-4" />
                      Mettre en favori
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="fileNote" className="themeApp font-medium text-lg text-gray-600">Ajouter d'autres pièces jointes</label>
                  <input
                    type="file"
                    id="fileNote"
                    onChange={(e) => setFileNote(e.target.files[0] ? {file: e.target.files[0], noteId: noteUpdate?._id} : {...fileNote, file: ''})}
                    className="w-full px-4 bg-gray-100 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex sm:flex-row flex-col gap-4 justify-between">
                  <button
                    type="submit"
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
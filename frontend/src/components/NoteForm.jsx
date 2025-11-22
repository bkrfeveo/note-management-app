import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { Spinner } from "@radix-ui/themes";
import EditorComponent from "./Editor";
import { addNewNoteService } from "../services/noteServices";
import { uploadFileService } from "../services/fileServices";


export default function NoteForm({isOpen}) {
    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [newNote, setNewNote] = useState({ 
        // title: '', 
        content: '', 
        isFavorite: false, 
        category: '' 
    });
    const [fileNote, setFileNote] = useState({ path: '', idNote: ''});
    
    // console.log("hors fonction submit : ", fileNote);
    
    const handleSubmit = async () => {  
      try{
        if (!newNote.content.trim()) {
          setMessageError(true);
        } else {
          setMessageError(false);
          setLoading(true);
          const newNoteResponse = await addNewNoteService(newNote);
          console.log("Response : ", newNoteResponse.note._id);
          
          setFileNote({...fileNote, idNote: newNoteResponse.note._id});
          if (fileNote){
            console.log(fileNote);
            await uploadFileService(fileNote);
            console.log("Fichier ajoute avec succes \n");
          };
          console.log("hors if : ", fileNote);
          
          console.log("Note ajoutee avec succes !\n", newNote);;
          setIsFinish(true);
          setNewNote({ 
            // title: '', 
            content: '', 
            isFavorite: false, 
            category: '' 
          });
        };
      } catch (err) { 
        console.error("Erreur lors de l'ajout de la note : ", err);
      } finally {
        // console.log(newNote);
        setLoading(false);
      }
    };

    return (
      <div>
          {(isOpen && !isFinish) &&
            <div className={`rounded-lg sm:p-6 p-3 mb-8 border border-gray-400`}>
              <h2 className="text-3xl themeApp font-semibold mb-4 text-gray-800">Créer une nouvelle note</h2>
              <div className="space-y-3 flex flex-col gap-8 justify-around">
                <div className="flex flex-col gap-4">
                  {/* <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-medium text-lg text-gray-600">Titre de votre note</label>
                    <input
                      type="text"
                      id="title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Titre de la note..."
                      className="w-full px-4 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div> */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-medium themeApp text-lg text-gray-600">Contenu de votre note</label>
                    <EditorComponent
                      onContentChange={(content) => setNewNote(prev => ({ ...prev, content }))}
                    />
                  </div>
                  <div className="flex flex-row justify-between">
                    <select
                        className="sm:w-1/3 sm:px-4 px-0 themeApp text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={newNote.category}
                        onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
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
                      onClick={() => setNewNote({ ...newNote, isFavorite: true })}
                      className={`flex items-center w-fit gap-2 px-4 py-2 border border-gray-500 rounded-lg ${newNote.isFavorite ? 'bg-yellow-500 text-white border-none' : 'bg-white'}`}
                    >
                      <Star className="w-4 h-4" />
                      Mettre en favori
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="fileNote" className="themeApp font-medium text-lg text-gray-600">Pièces jointes (cliquez dans le champ pour ajouter)</label>
                  <input
                    type="file"
                    id="fileNote"
                    value={fileNote.path}
                    onChange={(e) => setFileNote({...fileNote, path: e.target.value})}
                    className="w-full px-4 bg-gray-100 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                {messageError && 
                  <p className="text-red-500 -my-4 text-lg">
                    Le titre et le contenu sont obligatoires
                  </p>
                }
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
                        <Plus className="w-5 h-5" />
                        Ajouter la note
                      </>
                    }
                  </button>
                  <button
                    className="md:w-1/4 border themeApp border-blue-400 hover:bg-blue-500 hover:text-white active:text-white duration-200 active:bg-blue-600 text-gray-700 font-medium py-2 px-6 rounded-[10px]"
                    onClick={() => setIsFinish(true)}
                  >Annuler</button>
                </div>
              </div>
            </div>
          }
      </div>
    )
}
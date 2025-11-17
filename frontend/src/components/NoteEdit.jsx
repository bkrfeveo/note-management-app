import { useState } from "react";
import { COLORS } from "../utils/themeNote";
import { Plus, Star} from "lucide-react";
import { Spinner } from "@radix-ui/themes";
import EditorComponent from "./Editor";
import updateNoteService from "../services/updateNote";


export default function NoteEdit({note, isOpen}) {
    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [noteUpdate, setNoteUpdate] = useState({ 
        // title: note.title, 
        content: note.content, 
        isFavorite: note.isFavorite, 
        categorie: note.categorie
    });
    
    
    const handleSubmit = async () => {  
      try{
        const noteUpdated = {
            // title: noteUpdate.title,
            content: noteUpdate.content,
            // isPrivate: noteUpdate.isPrivate,
            // isFavorite: noteUpdate.isFavorite,
            categorie: noteUpdate.categorie,
        };
        setLoading(true);
        await updateNoteService(noteUpdated, note._id);
        console.log("Note mise a jour avec success !");
        
        setNoteUpdate({ 
            // title: '', 
            content: '', 
            isFavorite: false, 
            categorie: '' 
        });
      } catch (err) { 
        console.error("Erreur cote client : ", err);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
          {(isOpen && !isFinish) &&
            <div className={`rounded-lg p-6 mb-8 border`}>
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Modifier la note</h2>
              <div className="space-y-3 flex flex-col gap-8 justify-around">
                <div className="flex flex-col gap-4">
                  {/* <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-medium text-lg text-gray-600">Titre de votre note</label>
                    <input
                      type="text"
                      id="title"
                      value={noteUpdate.title}
                      onChange={(e) => setNoteUpdate({ ...noteUpdate, title: e.target.value })}
                      placeholder="Titre de la note..."
                      className="w-full px-4 text-gray-800 py-3 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div> */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-medium text-lg text-gray-600">Contenu de votre note</label>
                    <EditorComponent
                      onContentChange={(content) => setNoteUpdate(prev => ({ ...prev, content }))}
                    />
                  </div>
                  <select
                      className="px-4 text-gray-800 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      value={noteUpdate.categorie}
                      onChange={(e) => setNoteUpdate({ ...noteUpdate, categorie: e.target.value })}
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
                    className={`flex items-center w-fit gap-2 px-4 py-2 border border-gray-500 rounded-lg ${noteUpdate.isFavorite ? 'bg-yellow-500 text-white border-none' : 'bg-white'}`}
                  >
                    <Star className="w-4 h-4" />
                    Mettre en favori
                  </button>
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
                      Modifier la note
                    </>
                  }
                </button>
              </div>
            </div>
          }
      </div>
    )
}
import { Edit2, Star, Trash2, } from "lucide-react";
import { useEffect, useState } from "react";
import { COLORS } from "../utils/themeNote";
import NoteItem from "./NoteItem";
import { Spinner } from "@radix-ui/themes";
import ParsingHTML from "./ParsingContent";
import { deleteNoteService } from "../services/noteServices";
import { useEdit } from "../context/EditContext";


const NoteCard = ({ note }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const { startEditing } = useEdit();

    // catégoriser les notes avec des couleurs
    const themeNote = COLORS;
    const themeBycategory = 
      note.category === 'personnel' && themeNote[0] || // bleu
      note.category === 'travail' && themeNote[1] ||  // purple
      note.category === 'reunion' && themeNote[3] || // jaune
      note.category === 'urgent' && themeNote[4] ||  //  vert
      themeNote[5];   // pink ou rose

    // console.log(themeBycategory,);  
    

    const toggleFavorite = (id) => {
        setNotes(notes.map(note => note.id === id ? { ...note, isFavorite: !note.isFavorite } : note));
    };


    const deleteNote = async (id) => {
        // setNotes(notes.filter(note => note.id !== id));
        try{
          setLoading(true);
          await deleteNoteService(id);
          console.log("Note supprimee avec succes !");
          
        } catch (err) { 
          console.error("Erreur cote client : ", err);
        } finally {
          setLoading(false)
        }
    };  


    return (
      <div className={`${themeBycategory.class} justify-center rounded-4xl rounded-tl-none px-4 py-5 boxShadowCSS transition-all hover:shadow-lg relative group`}>
        {note.isFavorite && (
          <Star className="absolute top-6 right-2 w-5 h-5 fill-yellow-500 text-yellow-500" />
        )}
        {/* <div className="flex items-start justify-between mb-2">
          <h3 className={`text-lg font-bold ${themeBycategory.text}`}>{note.title}</h3>
        </div> */}
        <div className={`-mt-2 line-clamp-6 ${themeBycategory.text}`}>
          {/* {note.content} */}
          <ParsingHTML html={note.content} />
        </div>
        <div className="flex flex-col my-6 gap-2">
            {note.files?.length > 0 ? 
              <p className={`${themeBycategory.text} text-sm font-medium mt-2`}>
                {note.files?.length} pieces jointes
              </p>
            : <p className="my-4"></p>
          }
          <p className={`${themeBycategory.text} text-sm flex items-center font-medium gap-0`}>
              <span className="w-fit">note créée le</span>
              <span>
                {new Date(note.createdAt).toLocaleDateString('fr-FR')}
              </span>
          </p>
        </div>
        <div className="flex gap-2">
          {/* Voir les details */}
          <NoteItem note={note} />
          <button
            onClick={() => toggleFavorite(note.id)}
            className={`p-2 rounded ${note.isFavorite ? 'bg-yellow-500 text-white' : 'bg-white/50'} hover:bg-yellow-500 hover:text-white`}
            title="Favori"
          >
            <Star className="w-4 h-4" />
          </button>
          <button
            onClick={() => startEditing(note)}
            className="p-2 bg-white/50 rounded hover:bg-blue-500 hover:text-white"
            title="Éditer"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {/* <NoteEdit note={note} /> */}
          <button
            onClick={() => deleteNote(note._id)}
            className="p-2 bg-white/50 rounded hover:bg-red-500 hover:text-white"
            title="Supprimer"
          >
            {loading ? 
              <Spinner />
            :
              <Trash2 className="w-4 h-4" />
            }
          </button>
        </div>
      </div>
    );
};

export default NoteCard;
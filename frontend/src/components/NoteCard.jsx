import { Clock, Edit2, Lock, Save, Star, Tag, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { COLORS } from "../utils/themeNote";
import NoteItem from "./NoteItem";
import { Spinner } from "@radix-ui/themes";
import deleteNoteService from "../services/deleteNote";
import NoteEdit from "./NoteEdit";


const NoteCard = ({ note }) => {
    const [notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editContent, setEditContent] = useState({ title: note.title, content: note.content, tags: note.tags });

    const themeNote = COLORS;

    useEffect(() => {
      setEditing(editingId === note.id);
    }, [editingId]);

    const saveEdit = (id, updatedNote) => {
        setNotes(notes.map(note => note.id === id ? { ...note, ...updatedNote } : note));
        setEditingId(null);
    };

    const togglePrivate = (id) => {
        setNotes(notes.map(note => note.id === id ? { ...note, isPrivate: !note.isPrivate } : note));
    };

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

    const startEditing = (note) => {
        setEditingId(note.id);
    };

    const handleSave = () => {
      saveEdit(note.id, editContent);
      setEditing(false);
    };

    return (
      <div className={`${themeNote[0].class} rounded-lg p-6 shadow-md transition-all hover:shadow-lg relative group`}>
        {note.isFavorite && (
          <Star className="absolute top-6 right-2 w-5 h-5 fill-yellow-500 text-yellow-500" />
        )}
        
        {editing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editContent.title}
              onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
              className={`w-full px-3 py-2 rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none ${themeNote[0].class}`}
              placeholder="Titre"
            />
            <textarea
              value={editContent.content}
              onChange={(e) => setEditContent({ ...editContent, content: e.target.value })}
              className={`w-full px-3 py-2 rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none min-h-32 ${themeNote[0].class}`}
              placeholder="Contenu de la note..."
            />
            <input
              type="text"
              value={editContent.tags}
              onChange={(e) => setEditContent({ ...editContent, tags: e.target.value })}
              className={`w-full px-3 py-2 rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none ${themeNote[0].class}`}
              placeholder="Tags (séparés par des virgules)"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                <Save className="w-4 h-4" />
                Sauvegarder
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
              >
                <X className="w-4 h-4" />
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-2">
              <h3 className={`text-lg font-bold ${themeNote[0].text}`}>{note.title}</h3>
            </div>
            <p className={`text-sm mb-3 whitespace-pre-wrap line-clamp-5 ${themeNote[0].text}`}>{note.content}</p>
            
            {note.tags && (
              <div className="flex items-center gap-1 mb-3 text-xs">
                <Tag className="w-3 h-3" />
                <span className={themeNote[0].text}>{note.tags}</span>
              </div>
            )}

            <div className="flex items-center font-medium gap-1 text-xs mb-3">
              <Clock className="w-4 h-4" />
              <span className={themeNote[0].text}>
                {new Date(note.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                onClick={() => togglePrivate(note.id)}
                className={`p-2 rounded ${note.isPrivate ? 'bg-red-500 text-white' : 'bg-white/50'} hover:bg-red-500 hover:text-white`}
                title="Privé"
              >
                <Lock className="w-4 h-4" />
              </button>
              {/* <button
                onClick={() => startEditing(note)}
                className="p-2 bg-white/50 rounded hover:bg-blue-500 hover:text-white"
                title="Éditer"
              >
                <Edit2 className="w-4 h-4" />
              </button> */}
              <NoteEdit note={note} />
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
          </>
        )}

        {note.isPrivate && !editing && (
          <div className="absolute bottom-2 right-2">
            <Lock className="w-4 h-4 text-red-600" />
          </div>
        )}
      </div>
    );
};

export default NoteCard;
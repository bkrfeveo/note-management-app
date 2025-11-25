import { Button, Dialog, Flex, Spinner,  } from "@radix-ui/themes";
import { Delete, Eye, Trash2 } from "lucide-react";
import ParsingHTML from "./ParsingContent";
import { COLORS } from "../utils/themeNote";
import { useState } from "react";
import { deleteFileService } from "../services/fileServices";


const NoteItem = ({ note }) => {
    const dateCreatedNote = new Date(note.createdAt).toLocaleDateString('fr-FR')
    const [loading, setLoading] = useState(false);

     const themeBycategory = 
      note.category === 'personnel' && COLORS[0] || // bleu
      note.category === 'travail' && COLORS[1] ||  // purple
      note.category === 'reunion' && COLORS[3] || // jaune
      note.category === 'urgent' && COLORS[4] ||  //  vert
      COLORS[5]   // pink ou rose

    //   console.log("Note item : ", note);
      

    const deleteFile = async (id) => {
        // setNotes(notes.filter(note => note.id !== id));
        try{
          setLoading(true);
          await deleteFileService(id);
          console.log("Fichier supprime avec succes !");
          alert("Fichier supprime avec succes !");
          
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
                    className={`bg-white/50 p-2 rounded hover:bg-white`}
                    title="Détail"
                >
                    <Eye className="w-4 h-4" />
                </button>
            </Dialog.Trigger>
            <Dialog.Content color="none">
                {/* <Dialog.Title>{note.title}</Dialog.Title> */}
                <Dialog.Description>
                    <div className="absolute top-5 right-6 flex justify-end">
                        <p className={`${themeBycategory.class} p-1.5 text-xs font-medium rounded-lg w-fit`}>
                            {note.category}
                        </p>
                    </div>
                    <ParsingHTML className="flex flex-col gap-6 mt-10" html={note.content} />
                    <h3 className="text-md font-medium my-3">Pièces jointes</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {note.files?.map((file) => (
                            <div className="flex flex-col gap-2">
                                {/* <img 
                                    // src={`${file?.url}`} 
                                    src="/images/savane.webp"
                                    className="w-full h-28 object-cover rounded-lg hover:opacity-80 active:opacity-75 cursor-pointer "
                                    onClick={openImage}
                                    alt={file?.originalName} 
                                /> */}
                                <Dialog.Root>
                                    <Dialog.Trigger>
                                        <img 
                                            // src='/images/savane.webp'
                                            src={`${file?.url}`} 
                                            className="w-full h-28 object-cover rounded-lg cursor-pointer"
                                            alt={file?.originalName} 
                                        />
                                    </Dialog.Trigger>
                                    <Dialog.Content color="none">
                                        <img 
                                            src={`${file?.url}`} 
                                            // src='/images/savane.webp'
                                            className="w-full h-full object-cover rounded-lg mb-6"
                                            alt={file?.originalName} 
                                        />
                                        <Flex gap="3" justify="end">
                                            <Dialog.Close>
                                                <Button variant="soft" color="gray">
                                                    Fermer
                                                </Button>
                                            </Dialog.Close>
                                        </Flex>
                                    </Dialog.Content>
                                </Dialog.Root>
                                <button
                                    onClick={() => deleteFile(file._id)}
                                    className="w-fit p-2 bg-red-500/30 text-red-500 rounded hover:bg-red-500/50 duration-300"
                                    title="Supprimer"
                                >
                                    {loading ? 
                                    
                                    <Spinner />
                                    :
                                    <Trash2 className="w-4 h-4" />
                                    }
                                </button>
                            </div>
                        ))}
                    </div>
                    {note.files?.length === 0 && <p className="text-gray-400 text-center font-medium">Pas de pièces jointes</p>}
                    <div className="border-t border-gray-400 pt-5 mt-10">
                        <p className="font-medium text-gray-600 text-md">Note créée le {dateCreatedNote}</p>
                    </div>
                </Dialog.Description>
                <Flex gap="3" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Fermer
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    )
};

export default NoteItem;
import { Button, Dialog, Flex,  } from "@radix-ui/themes";
import { Eye } from "lucide-react";
import ParsingHTML from "./ParsingContent";
import { COLORS } from "../utils/themeNote";


const NoteItem = ({ note }) => {
    const dateCreatedNote = new Date(note.createdAt).toLocaleDateString('fr-FR')

     const themeBycategory = 
      note.category === 'personnel' && COLORS[0] || // bleu
      note.category === 'travail' && COLORS[1] ||  // purple
      note.category === 'reunion' && COLORS[3] || // jaune
      note.category === 'urgent' && COLORS[4] ||  //  vert
      COLORS[5]   // pink ou rose

    //   console.log("Note item : ", note);
      

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
                    <div className="grid grid-cols-2">
                        {note.files?.map((file) => (
                            <img src={`../../backend/${file?.path}`} alt={file?.originalName} />
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
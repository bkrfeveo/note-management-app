import { Button, Dialog, Flex,  } from "@radix-ui/themes";
import { Eye } from "lucide-react";
import ParsingHTML from "./ParsingContent";
import { COLORS } from "../utils/themeNote";


const NoteItem = ({ note }) => {
    const dateCreatedNote = new Date(note.createdAt).toLocaleDateString('fr-FR')

     const themeByCategorie = 
      note.categorie === 'personnel' && COLORS[0] || // bleu
      note.categorie === 'travail' && COLORS[1] ||  // purple
      note.categorie === 'reunion' && COLORS[3] || // jaune
      note.categorie === 'urgent' && COLORS[4] ||  //  vert
      COLORS[5]   // pink ou rose


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
                        <p className={`${themeByCategorie.class} p-1.5 text-xs font-medium rounded-lg w-fit`}>
                            {note.categorie}
                        </p>
                    </div>
                    <ParsingHTML className="flex flex-col gap-6 mt-10" html={note.content} />
                    <div className="border-t border-gray-400 pt-5 mt-10">
                        <p className="font-medium text-gray-600 text-md">note créée le {dateCreatedNote}</p>
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
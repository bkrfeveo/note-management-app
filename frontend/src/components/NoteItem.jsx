import { Button, Dialog, Flex,  } from "@radix-ui/themes";
import { Eye } from "lucide-react";


const NoteItem = ({ note }) => {

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
                <Dialog.Title>{note.title}</Dialog.Title>
                <Dialog.Description>
                    {note.content}
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
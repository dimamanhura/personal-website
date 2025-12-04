'use client';

import { getErrorMessage } from "@/utils/get-error-message";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useTransition } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

interface DeleteItemButtonProps {
  isIconOnly?: boolean;
  onDelete: () => Promise<void>;
};

export const DeleteItemButton = ({ isIconOnly = true, onDelete }: DeleteItemButtonProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await onDelete();
        onClose();
        toast.success('Successfully deleted');
      } catch (err: unknown) {
        toast.error(getErrorMessage(err));
      }
    });
  };

  return (
    <>
      <Button isIconOnly={isIconOnly} color="danger" variant="flat" onClick={onOpen}>
        {isIconOnly ? <FaTrash /> : 'Delete'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" disabled={isPending} onPress={handleDelete}>
                {isPending ? 'Loading...' : 'Confirm'}
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

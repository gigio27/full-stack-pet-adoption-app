import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    useDisclosure,
    Button,
  } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useMemo } from "react";

const DeleteAlert = ({ handleClick, isLoading, isUser }) => {

  const cancelRef = React.useRef();
  const user = useMemo(() => isUser, [isUser])
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton colorScheme="red" onClick={onOpen}>
        <DeleteIcon />
      </IconButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {user? 'user' : 'pet'}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this {user? 'user' : 'pet'}? This action is definitive. All of this {user? `user's` : `pet's`} data will be deleted.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="ghost"
                isLoading={isLoading}
                colorScheme="red"
                onClick={() => {
                  handleClick();
                  onClose();
                }}
                ml={3}
              >
                Delete forever
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;

import { ModalFooter, ModalBody, ModalCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, useDisclosure, Button } from "@chakra-ui/react";

const { default: UsersList } = require("./UsersList");

const UsersListModal = ({ allUsers, isLoading , deleteUser, allUsersQuery}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} bgColor={"grey.200"}  mt={0} borderRadius={6}  align="center" _hover={{ backgroundColor: "blue.100" }} fontSize="lm">
        View All Users{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registered Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UsersList allUsers={allUsers} deleteUser={deleteUser} allUserQuery={allUsersQuery} isLoading={isLoading} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UsersListModal;

import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, Button, Flex } from "@chakra-ui/react";
import PetCard from "./PetCard";

const PetModal = ({ thisPet, updateInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} bgColor={"white"} padding={2} borderRadius={6} mr={15} w="fit-content" align="center" _hover={{ backgroundColor: "green.100", transform: "scale(1.5)" }} backgroundColor="blue.200">
        View Pet{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />

        <ModalContent w="fit-content" h="fit-content">
          <Flex width="100%" alignItems="flex-start" justifyContent="left">
            <ModalCloseButton fontSize="sm" textAlign="center">
              Back
            </ModalCloseButton>
          </Flex>

          <PetCard id={thisPet.id} hypoallergenic={thisPet.hypoallergenic} height={thisPet.height} name={thisPet.name} weight={thisPet.weight} imageSource={thisPet.imageSource} modal={false} color={thisPet.color} type={thisPet.type} updateInfo={updateInfo} bio={thisPet.bio} diet={thisPet.diet} breed={thisPet.breed} status={thisPet.status} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PetModal;

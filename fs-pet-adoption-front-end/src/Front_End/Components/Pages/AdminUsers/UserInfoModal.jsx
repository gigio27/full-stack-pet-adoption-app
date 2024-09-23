import { useDisclosure, Box, Modal, ModalOverlay, ModalContent, Flex, ModalBody, ModalCloseButton, Button, ModalHeader, Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import DeleteAlert from "../../Alerts/Alert";
import UserPetCard from "./UserPetCard";


const moment = require("moment");

const UserInfoModal = ({ user, deleteUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const allOwnedPets = useMemo(() => {
    return [...user.fosteredPets, ...user.adoptedPets];
  }, [user]);

  return (
    <div>
      <Button onClick={onOpen} bgColor={"grey.200"} mt={1} borderRadius={6} align="center" _hover={{ backgroundColor: "blue.100" }} fontSize="lm">
        View User Info{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent maxW="65rem">
          <ModalHeader fontSize="2xl" w="100%">
            <Flex gap={4}>
              <Box> User Info:</Box>
              <Box color="blue.500">
                {user.firstName} {user.lastName}
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <Stack>
              <Stack>
                <Flex gap={5}>
                  <Box>
                    <b>Access Level : </b>
                    {user.accessLevel}{" "}
                  </Box>
                  <Box>
                    <b>Email : </b>
                    {user.email}
                  </Box>
                  <Box>
                    <b>Phone : </b>
                    {user.phone}
                  </Box>
                </Flex>
                <Box>
                  <b>Bio:</b>
                  {user.bio ? user.bio : <i>There is no bio</i>}
                </Box>

                <Flex gap={5}>
                  <Flex>
                    <Box>
                      <b>Account created:</b>{" "} {moment(user?.createdAt).fromNow()}
                    </Box>
                  </Flex>
                  <Flex>
                    <Box>
                      <b>Last updated:</b> {moment(user?.updatedAt).fromNow()}
                    </Box>
                  </Flex>
                </Flex>
              </Stack>
              <Box>
                <b>Saved Pets: </b>
                <Flex gap={3}>
                  {user.savedPets?.map((pet) => (
                    <UserPetCard key={pet._id} name={pet.name} status={pet.status} imageSource={pet.image} type={pet.type} />
                  ))}
                  {user.savedPets.length === 0 ? (<Box>No Pets to Display</Box> ) : null}
                </Flex>
              </Box>

              <Box>
                <b>Owned Pets: </b>
                <Flex gap={3}>
                  {allOwnedPets?.map((pet) => (
                    <UserPetCard key={pet._id} name={pet.name} status={pet.status} imageSource={pet.image} type={pet.type} />
                  ))}
                  {allOwnedPets.length === 0 ? <Box>No Pets to Display</Box> : null}
                </Flex>
              </Box>
            </Stack>
            <Flex width="100%" justifyContent="center" mt={5}>
              <DeleteAlert
                handleClick={() => {
                    deleteUser.mutate(user._id);
                  onClose();
                }}
                isUser={true}
              />{" "}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserInfoModal;
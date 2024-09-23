import { Image, Box, Heading, Flex, Text, Stack, Button } from "@chakra-ui/react";
import { useMemo, useContext, useCallback } from "react";
import AuthContext from "../../Contexts/AuthContext";
import usePet from "../../Hooks/usePet";
import DeleteAlert from "../Alerts/Alert";
import PetModal from "./PetModal";
import UpdatePetModal from "./UpdatePetModal";

const PetCard = ({ id, name, height, weight, status, imageSource, modal, diet, breed, hypoallergenic, color, type, updateInfo, bio }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { deletePet, updateStatus } = usePet(id);

  const isAdmin = useMemo(() => isLoggedIn.accessLevel === "admin", [isLoggedIn]);

  const handleSavePet = useCallback(
    async (id) => {
      updateInfo.mutate({
        savedPets: isLoggedIn.savedPets.includes(id) ? isLoggedIn.savedPets.filter((petId) => petId !== id) : [...isLoggedIn.savedPets, id],
      });
    },
    [isLoggedIn, updateInfo]
  );

  const changeStatus = useCallback(
    (newStatus) => {
      updateStatus.mutate({ status: newStatus });
    },
    [updateStatus]
  );

  const petIsAssignedToUser = useMemo(() => {
    if (isLoggedIn) {
      return (
        isLoggedIn.fosteredPets.find((p) => p === id) || isLoggedIn.adoptedPets.find((p) => p === id)
      );
    }
  }, [id, isLoggedIn]);

  const petType = useMemo(() => {
    if (type === "bird") {
      return <Text>Bird</Text>;
    } else if (type === "cat") {
      return <Text>Cat</Text>;
    } else {
      return <Text>Dog</Text>;
    }
  }, [type]);

  return (
    <Stack bgColor="blue.50" border="blue solid 1 pt" p={5} borderRadius={10} w={modal ? 300 : 350} h="fit" align="center" justify="space-between">
      <Flex justifyContent="space-between" w="100%" gap={10} alignItems="center">
        <Box borderRadius={20} bgColor={status === "adopted" ? "red.100" : "green.100"} p={2}>
          {status}
        </Box>
        {modal && (
          <Box display="inline-flex" opacity={1}>
          {" "}
          Type:&nbsp;{petType}
        </Box>
        )}
        {isLoggedIn && (
          <Button
            mr={10}
            _hover={{ transform: "scale(1.5" }}
            fontSize="2xl"
            bgColor="blue.50"
            onClick={async () => {
              await handleSavePet(id);
            }}
          >
            {isLoggedIn?.savedPets?.includes(id) ? "❤️" : "🤍"}{" "}
          </Button>
        )}
      </Flex>

      <Heading>{name}</Heading>
      {imageSource ? <Image borderRadius={20} h="auto" w="50%" maxW="300px" objectFit="contain" alt="image of pet" src={imageSource}></Image> : <Box fontSize="x-large">No Image</Box>}

      {!modal ? (
        <Stack gap={1.5} fontSize="0.7rem" textAlign="center">
          <Flex gap={30}>
            <Box>
              <b>Type:</b> {type}
            </Box>
            <Box>
              <b>Hypoallergenic: </b>
              {hypoallergenic ? "Yes" : "No"}
            </Box>
            <Box>
              <b>Dietary Restrictions : </b>
              {diet.includes("none") ? <span> {diet} </span> : diet.map((restriction) => <span key={`${id}${restriction}`}> {restriction}</span>)}
            </Box>
          </Flex>

          <Flex gap={3}>
            {" "}
            <Box>
              <b>Height:</b> {height} cm
            </Box>
            <Box>
              <b>Weight:</b> {weight} kg
            </Box>
            <Box>
              <b>Breed:</b> {breed}
            </Box>
            <Box>
              <b>Color:</b> {color}
            </Box>
          </Flex>
          <Box>
            <b>Bio :</b>
            {bio.length > 0 ? <span>{bio}</span> : "No bio available"}
          </Box>
        </Stack>
      ) : null}

      <Flex gap={5} justifyContent="space-between">
        {modal ? <PetModal updateInfo={updateInfo} thisPet={{ id, name, height, weight, status, imageSource, modal, bio, diet, breed, hypoallergenic, color, type }} /> : null}
      </Flex>
      <Stack alignItems="center" justifyContent="center">
        {isAdmin && !modal ? (
          <Flex gap={5}>
            <UpdatePetModal updateInfo={updateInfo} thisPet={{ id, name, height, weight, status, imageSource, modal, bio, diet, breed, hypoallergenic, color, type }} />

            <DeleteAlert handleClick={() => deletePet.mutate(id)} isUser={false} isLoading={deletePet.isLoading} />
          </Flex>
        ) : null}

       {isLoggedIn && !modal ? (
          <Stack alignItems="center">
            <Flex gap={2} alignItems="center">
              {status === "available" && (
                <Button bgColor="teal.100" onClick={() => changeStatus("fostered")}>
                  Foster
                </Button>
              )}
              {status !== "available" && petIsAssignedToUser && (
                <Button bgColor="orange.100" onClick={() => changeStatus("available")} isLoading={updateStatus.isLoading}>
                  Return Pet
                </Button>
              )}
              {status !== "adopted" && petIsAssignedToUser && (
                <Button bgColor="green.100" onClick={() => changeStatus("adopted")}>
                  Adopt
                </Button>
              )}
              {status === "available" && !petIsAssignedToUser && (
                <Button bgColor="green.100" onClick={() => changeStatus("adopted")}>
                  Adopt
                </Button>
              )}
            </Flex>
            <Flex alignItems="center" gap={3}></Flex>
          </Stack>
        ) : null}
        {!isLoggedIn && !modal ? <Text color="red.300">You must be logged in to adopt or foster a pet</Text> : null}
      </Stack>
    </Stack>
  );
};

export default PetCard;

import { Box, Flex, Text, Spinner, Stack, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState, useCallback, useContext, useMemo } from "react";
import AuthContext from "../../Contexts/AuthContext";
import usePets from "../../Hooks/usePets";
import PetList from "./PetList";


const Pets = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isShowingSaved, setIsShowingSaved] = useState(false);
  const { data, refetchPets, isFetching: isLoading } = usePets();



  useEffect(() => {
    refetchPets();
  }, [refetchPets]);

  const [petsToDisplay, setPetsToDisplay] = useState(null);
  const [isDisplayingAdminPets, setIsDisplayingAdminPets] = useState(false);

  const isAdmin = useMemo(() => isLoggedIn.accessLevel === "admin", [isLoggedIn]);

  const finalList = useMemo(
    () =>
      data.filter((pet) =>
        isShowingSaved === true
          ? isLoggedIn.savedPets.includes(pet._id)
          : isLoggedIn.adoptedPets.includes(pet._id) ||
            isLoggedIn.fosteredPets.includes(pet._id)
      ),
    [isLoggedIn, data, isShowingSaved]
  );

  const ownedPets = [...isLoggedIn.fosteredPets, ...isLoggedIn.adoptedPets];


  const displayMyPets = useCallback(() => {
    setIsShowingSaved(!isShowingSaved);

    if (isShowingSaved === true && ownedPets.length === 0) {
      setPetsToDisplay(
        <Text color="red.300" fontSize="lm" mt={5} textAlign="center">
          You don't have any owned or fostered pets
        </Text>
      );
    } else if (isLoggedIn.savedPets.length === 0 && isShowingSaved === false) {
      setPetsToDisplay(
        <Text color="red.300" fontSize="lm" mt={5} textAlign="center">
          You dont' have any saved pets to display
        </Text>
      );
    } else {
      setPetsToDisplay(null);
    }
  }, [isShowingSaved, isLoggedIn.savedPets.length, ownedPets.length]);

  return (
    <Box position="fixed" zIndex={0} mt="100" w="100%" h="100%" bgColor="white" pb={70} overflowY="scroll" textAlign="center">
      {isAdmin ? (
        <Button onClick={() => setIsDisplayingAdminPets(!isDisplayingAdminPets)} bgColor={isDisplayingAdminPets ? "grey.300" : "grey.500"} color={isDisplayingAdminPets ? "grey.300" : "orange.400"} pt={8} pb={8} fontSize="lm">
          {" "}
          {!isDisplayingAdminPets ? "Show All Pets for Edit" : "Show Only My Pets"}
        </Button>
      ) : null}

      {!isDisplayingAdminPets || !isAdmin ? (
        <Box>
          <Heading p={5} textAlign="center" fontSize="3xl">
            {isShowingSaved ? "My Saved Pets" : "My Adopted Pets"}
          </Heading>
          <Box m={10}>
            <Flex gap={5} alignItems="center" justifyContent={"center"}>
              <Button
                bgColor="blue.100"
                onClick={() => {
                  displayMyPets();
                }}
                mb={10}
              >
                {isShowingSaved ? "Show My Adopted Pets" : "Show My Saved Pets"}
              </Button>
            </Flex>
            {petsToDisplay}

            <PetList data={finalList} />
          </Box>{" "}
        </Box>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          {" "}
          <Heading textAlign="center" p={5} fontSize="3xl">
            All Pets
          </Heading>
          {isLoading ? <Spinner size="xl" /> : <PetList data={data} />}{" "}
        </Stack>
      )}
    </Box>
  );
};

export default Pets;

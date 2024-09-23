import { Box, Button, Heading, Flex, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import AuthContext from "../../../Contexts/AuthContext";
import useAdmin from "../../../Hooks/useAdmin";
import usePets from "../../../Hooks/usePets";
import AddPetModal from "../../Pets/AddPetModal";
import PetList from "../../Pets/PetList";
import UsersListModal from "../AdminUsers/UserListModal";
import AdminStats from "./AdminStats";





const Dashboard = () => {
  const { isLoggedIn: userInfo } = useContext(AuthContext);
  const [seeAllPets, setSeeAllPets] = useState(false);

  const { data, isFetching } = usePets();
  const { allUsers, deleteUser, allUsersQuery } = useAdmin();
  

  return (

    <Stack alignItems="center" justifyContent="flex-start" as="main" position="fixed" bgColor="blue.50" w="100%" h="100vh" p={100} pb={20} pt={50} overflow="scroll">
      <Flex justifyContent="center" gap={1} pb={5} mt={50} w="100%">
        <Heading mb={4} display="inline" >
          Welcome to the Admin Dashboard,{" "}
        </Heading>
        <Heading display="inline" color="blue.500">
          {userInfo.firstName} {userInfo.lastName}!
        </Heading>
      </Flex>
      <AdminStats
        totalPets={data.length}
        totalUsers={allUsers.length}
        isLoadingUsers={allUsersQuery.isLoading}
        isLoadingPets={isFetching}

      />{" "}
      <Stack alignItems="flex-start" justifyContent="flex-start" w="100%">
        <Stack bgColor="white" p={3} borderRadius={10} w="100%" gap={10}>
          <Heading size="lg" alignSelf="center" alignItems="center">
            Tasks
          </Heading>
          <Flex gap={10} flexFlow="center" alignSelf="center" alignItems="center" justifyContent="space-around" flexDirection={{ base: "column", md: "row" }} >

          <Box borderRadius={10}>

             {" "}
              <AddPetModal />

 
            </Box>

      
            <Box p={3} bgColor="grey.200" borderRadius={10} >
              <UsersListModal
                allUsers={allUsers}
                deleteUser={deleteUser}
                isLoading={allUsersQuery.isLoading}
                allUsersQuery={allUsersQuery}

              />

            </Box>
            <Box bgColor="grey.500" borderRadius={10}>
              {" "}
              <Button fontSize="lm" _hover={{ bgColor: "blue.100", opacity: 1 }} onClick={() => setSeeAllPets(!seeAllPets)}>
                {!seeAllPets ? "Display Pet List" : "Hide Pet List"}
              </Button>
            </Box>
          </Flex>
        </Stack>
        {seeAllPets && (
          <Box p={2} bgColor="white" borderRadius={10} w="100%">
            <Heading pl={2} >
              All Pets
            </Heading>
            <Heading pl={2} pb={2} size="sm" color="blue.300">
              For update or delete a pet, please click on a pet to view details.
            </Heading>
            <PetList data={data} />
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default Dashboard;

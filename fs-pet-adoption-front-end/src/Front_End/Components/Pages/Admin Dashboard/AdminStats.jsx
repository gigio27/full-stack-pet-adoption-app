import { Box, Flex, Spinner, Heading } from "@chakra-ui/react";
import CountUp from "react-countup";

const AdminStats = ({ isLoadingUsers, isLoadingPets, totalPets, totalUsers, }) => {

  <CountUp end={totalPets} />;

  return (
    <Box bgColor="white" p={3} borderRadius={10} w="100%" gap={10}>
      <Heading color="green.300" textAlign="center" size="lg">
        Admin Stats Dashboard
      </Heading>
      <Flex justifyContent="space-around">
        <Box pl={2} pb={2} color="green.300" fontSize="x-large">
          Total Pets: {isLoadingPets ? <Spinner /> : <CountUp end={totalPets} />}
        </Box>
        <Box pl={2} pb={2} fontSize="x-large" color="blue.300">
          Total Users: {isLoadingUsers ? <Spinner /> : <CountUp end={totalUsers} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminStats;

import { Box, Flex, Text, Heading, Center } from "@chakra-ui/react";
import BigLogo from "../../Logo/BigLogo";
import volunteer from "../../Logo/volunteer-dog.jpg"

const Home = () => {
  return (
    <Box bgColor="white" w="100%" h="100%" d="flex" alignItems="center" justifyContent="center" position="absolute">
      <Center>
        <Box maxW="35rem" marginTop="100px">
          <BigLogo width="40%" height="50%"  />
          <Heading mb={7}>Welcome to Helping Paw</Heading>

          <Text fontSize="xl">Helping Paw is the place to connects animals lover and their future animal. Here you can foster & adopt an animal in one click</Text>
        </Box>
      </Center>

    <Flex marginTop="20px">
    <img mt="30px" width="100%" src={volunteer} alt="volunteer-dog" />
    </Flex>
    </Box>



  );
};

export default Home;

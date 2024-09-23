import { Box, Heading, Text, Stack, Center, Flex } from "@chakra-ui/react";
import BigLogo from "../../Logo/BigLogo";
import { useContext, useEffect } from "react";
import AuthContext from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import volunteer from "../../Logo/volunteer-dog.jpg";

const HomeLoggedIn = () => {
  const { isLoggedIn: userInfo, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box d="flex" alignItems="center" justifyContent="center" as="main" position="absolute" mt="50" bgColor="white" h="100%" w="100%" p={20}>
      <Center>
        <Box>
          <Box textAlign="-webkit-center">
            <BigLogo width="30%" />

            <Heading mb={4}>
              <Stack gap={2}>
                <Text>Welcome to your Helping Paw Account,</Text>
                <Text color="blue.500">
                  {" "}
                  {userInfo.firstName} {userInfo.lastName}
                </Text>
              </Stack>
            </Heading>
            <Text fontSize="xl">Edit your profile, view your current animals, save animals for later, look for animals, or foster and adopt animals.</Text>
          </Box>
          <Box>
          <Flex marginTop="20px">
            <img mt="30px" width="100%" src={volunteer} alt="volunteer-dog" />
          </Flex>
          </Box>

        </Box>
      </Center>
    </Box>
  );
};

export default HomeLoggedIn;

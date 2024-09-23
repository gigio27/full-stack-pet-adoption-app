import { Image, Box, Heading, Flex, Stack } from "@chakra-ui/react";
import { useMemo } from "react";

const UserPetCard = ({ name, status, imageSource, type }) => {
  const petType = useMemo(() => {
    if (type === "bird") {
      return <Box>Bird</Box>;
    } else if (type === "cat") {
      return <Box>Cat</Box>;
    } else {
      return <Box>Dog</Box>;
    }
  }, [type]);

  return (
    <Stack bgColor="blue.50" border="blue solid 1 pt" p={5} borderRadius={10} w={350} h="fit" align="center" justify="space-between">
      <Flex justifyContent="space-between" gap={10} alignItems="center" w="100%">
        <Box borderRadius={20} bgColor={status === "adopted" ? "red.100" : "teal.100"} padding={2} fontSize="small">
          {status}
        </Box>
        <Box opacity={1}>{petType}</Box>
      </Flex>
      {imageSource ? <Image borderRadius={10} w="50%" maxW="300px" objectFit="contain" alt="image of pet" src={imageSource}></Image> : <Box fontSize="x-large">No image</Box>}
      <Heading fontSize="small">{name}</Heading>
    </Stack>
  );
};

export default UserPetCard;

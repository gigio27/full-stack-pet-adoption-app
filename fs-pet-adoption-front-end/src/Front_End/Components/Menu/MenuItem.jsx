import { Flex } from "@chakra-ui/react";
import { Link, useMatch } from "react-router-dom";

const MenuItem = ({ icon = null, to, label }) => {
  const match = useMatch(to);
  return (
    <Flex height="100%" padding={2} borderRadius={6} mr={15} gap={3} as={Link} to={to} bgColor={match ? "blue.50" : "whiteAlpha.900"} w="fit-content" align="center" _hover={{ backgroundColor: "blue.200" }}>
      {icon}
      {label}
    </Flex>
  );
};

export default MenuItem;

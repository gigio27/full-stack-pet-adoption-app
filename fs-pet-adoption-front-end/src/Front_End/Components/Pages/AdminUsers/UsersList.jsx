import { Flex, Text, Spinner, Box } from "@chakra-ui/react";
import UserInfoModal from "./UserInfoModal";

const UsersList = ({ allUsers, deleteUser, isLoading }) => {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString();

  return (
    <Flex flexFlow="column wrap" gap={5} alignItems="center" width="100%">
      {isLoading ? <Spinner /> : null}
      {allUsers &&
        allUsers.map((user) => {
          return (
            <Flex
              gap={5}
              key={`${currentDateString}+${user.lastName}`}
              width="100%"
              p={5}
              borderRadius={10}
              alignItems="center"
              justifyContent="space-between"
              bgColor="blue.50"
            >
              <Box>
                <Text
                  fontSize="small"
                  color={user.accessLevel === "admin" ? "red.300" : "green.300"}
                >
                  {user.accessLevel}
                </Text>
                <Text color="blue" display="inline">
                  {user.lastName}, {user.firstName}{" "}
                </Text>
              </Box>
              <UserInfoModal user={user} deleteUser={deleteUser} />
            </Flex>
          );
        })}
    </Flex>
  );
};

export default UsersList;

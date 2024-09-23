import { Flex, Button, Text } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SmallLogo from "../Logo/SmallLogo";
import MenuItem from "./MenuItem";
import routes from "../../Constants/routes";
import LoginSignupModal from "../Pages/LoginandSignup/LoginSignupModal";
import AuthContext from "../../Contexts/AuthContext";
import MenuDrawer from "./MenuDrawer";

const NavBar = () => {
  const { isLoggedIn, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = useMemo(() => isLoggedIn.accessLevel === "admin", [isLoggedIn]);

  const filterNav = useMemo(() => {
    if (isAdmin) return (route) => route.protected || route.admin;
    if (isLoggedIn) return (route) => route.protected && !route.admin;
    return (route) => !route.protected;
  }, [isAdmin, isLoggedIn]);

  return (
    <Flex as="header" position="fixed" backgroundColor="white" borderBottomWidth={5} borderBottomColor="blue.100" w="100%" h="80px" gap={20} pl={10} alignItems="center" justifyContent="left" zIndex={10}>
      <Flex align="center" gap={10}>
        <MenuDrawer />
        <SmallLogo />
        {isLoggedIn ? (
          <Flex alignItems="center" gap={5}>
            <Flex gap={2}>
              Welcome, <Text as="b">{isLoggedIn.firstName}</Text>
            </Flex>
            <Button
              onClick={() => {
                signout.mutate();
                navigate("/");
              }}
            >
              Log Out
            </Button>
          </Flex>
        ) : (
          <LoginSignupModal />
        )}
      </Flex>

      <Flex gap={[5, 10, 15, 20]} width="fit-content" align="center" display={["none", "none", "none", "none", "flex"]}>
        {routes.filter(filterNav).map((route) => (
          <MenuItem key={route.path} to={route.path} label={route.label} icon={route.icon} />
        ))}
      </Flex>
    </Flex>
  );
};

export default NavBar;

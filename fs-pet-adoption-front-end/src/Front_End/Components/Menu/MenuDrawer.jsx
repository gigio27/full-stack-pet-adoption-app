import { useRef, useContext, useMemo } from "react";
import MenuItem from "./MenuItem";
import routes from "../../Constants/routes";
import AuthContext from "../../Contexts/AuthContext";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, useDisclosure, Stack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SmallLogo from "../Logo/SmallLogo";



const MenuDrawer = () => {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { isLoggedIn } = useContext(AuthContext);

  const isAdmin = useMemo(
    () => isLoggedIn.accessLevel === "admin",
    [isLoggedIn]
  );



  const filterNav = useMemo(() => {
    if (isAdmin) return (route) => route.protected || route.admin;
    if (isLoggedIn) return (route) => route.protected && !route.admin;
    return (route) => !route.protected;
  }, [isAdmin, isLoggedIn]);

  return (
    <>
      <IconButton onClick={onOpen} ref={btnRef} aria-label="Menu" icon={<HamburgerIcon />} _hover={{ backgroundColor: "blue.200" }} bgColor="white" />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {" "}
            <SmallLogo />
          </DrawerHeader>
          <DrawerBody>
            <Stack gap={5}>
              {routes.filter(filterNav).map((route) => (
                <MenuItem key={route.path} to={route.path} label={route.label} icon={route.icon} />
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;

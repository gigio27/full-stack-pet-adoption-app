import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";

const LoginSignupModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button bgColor={"white"} height="100%" borderRadius={6} padding={2} mr={15} w={"fit-content"} align="center" _hover={{ backgroundColor: "blue.200" }} onClick={onOpen}>
        Login/Signup
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <SignUp onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ModalBody />
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginSignupModal;

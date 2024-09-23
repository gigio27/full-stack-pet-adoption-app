import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import SignUp from "./SignUp";
import Login from "./Login";

const LoginSignupModalTabs = () => {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <SignUp />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoginSignupModalTabs;

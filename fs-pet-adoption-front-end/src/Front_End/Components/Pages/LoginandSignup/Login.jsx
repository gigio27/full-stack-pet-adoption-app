import AuthContext from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Input, FormControl, FormLabel, useToast, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Login = ({ onClose }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setIsShowingPassword(!isShowingPassword);
  };



  return (
    <Box bgColor="white" p={0}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string().min(6, "Password must be at least 6 characteres"),
        })}
        onSubmit={(values, actions) => {
          login.mutate(values, {
            onSuccess: () => {
              toast({
                title: "Login Successful Welcome!",
                position: "top",
                description: "You have successfully logged in",
                status: "success",
                duration: 8000,
                isClosable: true,
              });
              onClose();
              navigate("/");
            },
          });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="loginemail">
                    Email
                  </FormLabel>
                  <Input {...field} type="email" id="loginemail" placeholder="email" />
                  <ErrorMessage name="loginemail" />
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="loginpassword">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input {...field} type={isShowingPassword ? "text" : "password"} placeholder="password" id="loginpassword" />
                    <InputRightElement height={"100%"}>
                      <IconButton aria-label="Call Sage" fontSize="20px" icon={!isShowingPassword ? <HiEyeSlash /> : <HiEye />} onClick={() => togglePasswordVisibility()} />
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="loginpassword" />
                </FormControl>
              )}
            </Field>

            <Button type="submit" mt={5} isDisabled={Object.keys(errors).length !== 0} isLoading={login.isLoading}>
              Login{" "}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;

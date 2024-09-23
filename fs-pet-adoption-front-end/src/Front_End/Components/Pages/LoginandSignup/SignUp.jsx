import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AuthContext from "../../../Contexts/AuthContext";

const SignUp = ({ onClose }) => {
  const { signup } = useContext(AuthContext);
  const toast = useToast();

  return (
    <Box bgColor="white" p={0}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          repassword: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string(),
          lastName: Yup.string(),
          phoneNumber: Yup.number(),
          email: Yup.string().email("Invalid email address"),
          password: Yup.string().min(6, "Must be at least 6 characters"),
          repassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
        })}
        onSubmit={(values, actions) => {
          signup.mutate(values, {
            onSettled: () => {
              actions.setSubmitting(false);
            },
            onSuccess: () => {
              toast({
                position: "top",
                title: "Account created.",
                description:
                  "You are signed up! Welcome to your Hepling Paw Account",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              onClose();
            },
          });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Field name="firstName">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="firstName">
                    First Name
                  </FormLabel>
                  <Input {...field} id="firstName" />
                  <ErrorMessage name="firstName" />
                </FormControl>
              )}
            </Field>

            <Field name="lastName">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="lastName">
                    Last Name
                  </FormLabel>
                  <Input {...field} id="lastName" />
                  <ErrorMessage name="lastName" />
                </FormControl>
              )}
            </Field>

            <Field name="phone">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="phone">
                    Phone
                  </FormLabel>
                  <Input {...field} type="number" id="phone" />
                  <ErrorMessage name="phone" />
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="email">
                    Email
                  </FormLabel>
                  <Input {...field} type="email" id="email" />
                  <ErrorMessage name="email" />
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="password">
                    Password
                  </FormLabel>
                  <Input {...field} type="password" id="password" />
                  <ErrorMessage name="password" />
                </FormControl>
              )}
            </Field>

            <Field name="repassword">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="repassword">
                    Confirm Password
                  </FormLabel>
                  <Input {...field} type="password" id="repassword" />
                  <ErrorMessage name="repassword" />
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              mt={5}
              isDisabled={Object.keys(errors).length !== 0}
              isLoading={signup.isLoading}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;

import { Box, useDisclosure, ModalHeader, Input, FormControl, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, FormLabel, useToast, RadioGroup, Stack, Radio, Textarea, CheckboxGroup, Checkbox } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import usePets from "../../Hooks/usePets";


const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddPetForm = ({ onClose }) => {
  const { addNewPet } = usePets();
  const toast = useToast();

  return (
    <Box bgColor="white" p={0}>
      <Formik
        initialValues={{
          type: "dog",
          name: "",
          status: "available",
          picture: null,
          height: "",
          weight: "",
          color: "",
          bio: "",
          hypoallergenic: 0,
          dietaryRestrictions: "none",
          breed: "",
        }}
        validationSchema={Yup.object({
          type: Yup.string(),
          name: Yup.string().required("Name is required"),
          status: Yup.string(),
          height: Yup.number().required("Height is required"),
          weight: Yup.number().required("Weight is required"),
          color: Yup.string(),
          bio: Yup.string(),
          hypoallergenic: Yup.string(),
          dietaryRestrictions: Yup.array().required("Diet restriction is required"),
          breed: Yup.string().required("Breed is required"),
        })}
        onSubmit={(values, actions) => {
          addNewPet.mutate(values, {
            onSettled: () => {
              actions.setSubmitting(false);
            },
            onSuccess: () => {
              toast({
                position: "top",
                title: "The new pet was added",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              onClose();
            },
            onError: () => {
              toast({
                position: "top",
                title: "Error",
                description:
                  "There was an issue adding the pet. Please try again",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            },
          });
        }}
      >
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form>
            <Field name="type">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="type">
                    Type
                  </FormLabel>
                  <RadioGroup defaultValue="dog" id="type">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="dog">
                        Dog
                      </Radio>
                      <Radio {...field} value="cat">
                        Cat
                      </Radio>
                      <Radio {...field} value="bird">
                        Bird
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="type" />
                </FormControl>
              )}
            </Field>

            <Field name="name">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="name">
                    Name
                  </FormLabel>
                  <Input {...field} id="name" />
                  <ErrorMessage name="name" />
                </FormControl>
              )}
            </Field>

            <Field name="height">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="height">
                    Height (cm)
                  </FormLabel>
                  <Input {...field} type="number" id="height" />
                  <ErrorMessage name="height" />
                </FormControl>
              )}
            </Field>

            <Field name="weight">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="weight">
                    Weight (kg)
                  </FormLabel>
                  <Input {...field} type="number" id="weight" />
                  <ErrorMessage name="weight" />
                </FormControl>
              )}
            </Field>

            <Field name="status">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="status">
                    Status
                  </FormLabel>
                  <RadioGroup defaultValue="available" id="status">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="available">
                        Available
                      </Radio>
                      <Radio {...field} value="adopted">
                        Adopted
                      </Radio>
                      <Radio {...field} value="fostered">
                        Fostered
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="status" />
                </FormControl>
              )}
            </Field>

            <Field name="picture">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="picture">
                    Photo
                  </FormLabel>
                  <Input
                    {...field}
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      toBase64(file).then((result) => {
                        setFieldValue("image", result);
                      });
                    }}
                    id="picture"
                    name="picture"
                  />
                  <ErrorMessage name="picture" />
                </FormControl>
              )}
            </Field>

            <Field name="color">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="color">
                    Color
                  </FormLabel>
                  <RadioGroup defaultValue="brown" id="color">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="brown">
                        brown
                      </Radio>
                      <Radio {...field} value="black">
                        black
                      </Radio>
                      <Radio {...field} value="white">
                        white
                      </Radio>
                      <Radio {...field} value="light brown">
                        light brown
                      </Radio>
                      <Radio {...field} value="multicolor">
                        multicolor
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="color" />
                </FormControl>
              )}
            </Field>

            <Field name="hypoallergenic">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="hypoallergenic">
                    Hypoallergenic
                  </FormLabel>
                  <RadioGroup defaultValue="no" id="hypoallergenic">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="no">
                        no
                      </Radio>
                      <Radio {...field} value="yes">
                        yes
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="hypoallergenic" />
                </FormControl>
              )}
            </Field>

            <Field name="breed">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="breed">
                    Breed
                  </FormLabel>
                  <Input {...field} id="breed" />
                  <ErrorMessage name="breed" />
                </FormControl>
              )}
            </Field>

            <Field name="dietaryRestrictions">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="dietaryRestrictions">
                    Dietary Restrictions{" "}
                  </FormLabel>
                  <CheckboxGroup id="dietaryRestrictions">
                    <Stack
                      spacing={4}
                      gap={5}
                      justifyContent="left"
                      alignContent="left"
                      direction="row"
                      flexFlow="wrap"
                    >
                      <Checkbox {...field} selected value="none">
                        none
                      </Checkbox>
                      <Checkbox {...field} value="lowCalorie">
                        low calorie
                      </Checkbox>
                      <Checkbox {...field} value="dairy">
                        dairy
                      </Checkbox>
                      <Checkbox {...field} value="shellfish">
                        shellfish
                      </Checkbox>
                      <Checkbox {...field} value="lowSalt">
                        low salt
                      </Checkbox>
                      <Checkbox {...field} value="gluten">
                        gluten
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>{" "}
                  <ErrorMessage name="dietaryRestrictions" />
                </FormControl>
              )}
            </Field>

            <Field name="bio">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="bio">
                    Bio
                  </FormLabel>
                  <Textarea {...field} type="text" id="bio" />
                  <ErrorMessage name="bio" />
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              mt={5}
              isDisabled={Object.keys(errors).length !== 0}
              isLoading={isSubmitting}
            >
              Add Pet
            </Button>
            {/* {JSON.stringify(errors)} */}
          </Form>
        )}
      </Formik>
    </Box>
  );
};



const AddPetModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} bgColor={"grey.200"} borderRadius={6} align="center" _hover={{ backgroundColor: "blue.50" }}>
        Add New Pet{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Pet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPetForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPetModal;

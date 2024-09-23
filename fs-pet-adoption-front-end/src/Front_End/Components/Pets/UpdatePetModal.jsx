import { Box, useDisclosure, ModalCloseButton, Button, ModalHeader, Input, FormControl, FormLabel, useToast, RadioGroup, Stack, Radio, Textarea, Modal, ModalOverlay, ModalContent, ModalBody, CheckboxGroup, Checkbox, IconButton } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { EditIcon } from "@chakra-ui/icons";
import usePet from "../../Hooks/usePet";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UpdatePetForm = ({ onClose, thisPet }) => {
  const { updatePet } = usePet(thisPet.id);

  const toast = useToast();

  return (
    <Box bgColor="white" p={0}>
      <Formik
        initialValues={{
          type: thisPet.type,
          name: thisPet.name,
          status: thisPet.status,
          picture: thisPet.picture,
          height: thisPet.height,
          weight: thisPet.weight,
          color: thisPet.color,
          bio: thisPet.bio,
          hypoallergenic: thisPet.hypoallergenic,
          dietaryRestrictions: thisPet.diet,
          breed: thisPet.breed,
        }}
        validationSchema={Yup.object({
          type: Yup.string(),
          name: Yup.string().required("Name is required"),
          status: Yup.string(),
          height: Yup.string().required("Height is required"),
          weight: Yup.string().required(" Weight is required"),
          color: Yup.string(),
          bio: Yup.string(),
          hypoallergenic: Yup.string(),
          dietaryRestrictions: Yup.array().min(1).of(Yup.string().required()).required("Please choose none if this pet has no dietary restrictions"),
          breed: Yup.string().required("Breed is required"),
        })}
        onSubmit={(values, actions) => {
          updatePet.mutate(values, {
            onSettled: () => {
              actions.setSubmitting(false);
            },
            onSuccess: () => {
              toast({
                title: "Pet Updated",
                position: "top",
                description: "Your pet has been updated",
                status: "success",
                duration: 8000,
                isClosable: true,
              });
              onClose();
            },
            onError: () => {
              toast({
                title: "Error",
                position: "top",
                description: "There was an error updating your pet, please try again",
                status: "error",
                duration: 8000,
                isClosable: true,
              });
            },
          });
        }}
      >
        {({ isSubmitting, setFieldValue, values, errors }) => (
          <Form>
            <Field name="type">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <RadioGroup {...field} id="type" defaultValue={values.type}>
                    <Stack direction="row" spacing={4}>
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
                  <FormLabel htmlFor="name" mt={5}>
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
                  <FormLabel htmlFor="height" mt={5}>
                    Height (cm)
                  </FormLabel>
                  <Input {...field} id="height" type="number" />
                  <ErrorMessage name="height" />
                </FormControl>
              )}
            </Field>
            <Field name="weight">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor="weight" mt={5}>
                    Weight (kg)
                  </FormLabel>
                  <Input {...field} id="weight" type="number" />
                  <ErrorMessage name="weight" />
                </FormControl>
              )}
            </Field>
            <Field name="picture">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel htmlFor="picture" mt={5}>
                    Picture
                  </FormLabel>
                  <Input
                    {...field}
                    id="picture"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      toBase64(file).then((result) => {
                        setFieldValue("image", result);
                      });
                    }}
                  />
                  <ErrorMessage name="picture" />
                </FormControl>
              )}
            </Field>
            <Field name="color">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor="color" mt={5}>
                    Color
                  </FormLabel>
                  <RadioGroup defaultValue={values.color} id="color">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="black">
                        Black
                      </Radio>
                      <Radio {...field} value="white">
                        White
                      </Radio>
                      <Radio {...field} value="brown">
                        Brown
                      </Radio>
                      <Radio {...field} value="lignt brown">
                        Lignt Brown
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
                  <FormLabel htmlFor="hypoallergenic" mt={5}>
                    Hypoallergenic
                  </FormLabel>
                  <RadioGroup defaultValue={values.hypoallergenic === false ? "no" : "yes"} id="hypoallergenic">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="yes">
                        Yes
                      </Radio>
                      <Radio {...field} value="no">
                        No
                      </Radio>
                    </Stack>
                    <ErrorMessage name="hypoallergenic" />
                  </RadioGroup>
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
                  <FormLabel htmlFor="dietaryRestrictions" mt={5}>
                    Dietary Restrictions{" "}
                  </FormLabel>
                  <CheckboxGroup id="dietaryRestrictions" defaultValue={values.dietaryRestrictions}>
                    <Stack spacing={4} gap={5} justifyContent="left" alignContent="left" direction="row" flexFlow="wrap">
                      <Checkbox {...field} value="none">
                        None
                      </Checkbox>
                      <Checkbox {...field} value="lowSalt">
                        Low salt
                      </Checkbox>
                      <Checkbox {...field} value="lowCalorie">
                        Low calorie
                      </Checkbox>
                      <Checkbox {...field} value="dairy">
                        Dairy
                      </Checkbox>
                      <Checkbox {...field} value="gluten" isChecked={values.dietaryRestrictions.includes("gluten")}>
                        gluten
                      </Checkbox>
                      <Checkbox {...field} value="shellfish">
                        shellfish
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                  <ErrorMessage name="dietaryRestrictions" />
                </FormControl>
              )}
            </Field>
            <Field name="bio">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel htmlFor="bio" mt={5}>
                    Bio
                  </FormLabel>
                  <Textarea {...field} id="bio" type="text" />
                  <ErrorMessage name="bio" />
                </FormControl>
              )}
            </Field>

            <Button type="submit" mt={5} isDisabled={Object.keys(errors).length !== 0} isLoading={isSubmitting}>
              Update Pet{" "}
            </Button>
            {/* {JSON.stringify(errors)} */}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const UpdatePetModal = ({ thisPet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} colorScheme="green" variant="ghost">
        {<EditIcon />}
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Pet Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdatePetForm onClose={onClose} thisPet={thisPet} />{" "}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePetModal;

import CONFIG_URLS from "../Config/urls";
import axios from "../Config/axios";
import { useMutation, useQueryClient } from "react-query";
import usePets from "./usePets";
import { useToast } from "@chakra-ui/react";


const usePet = (petId) => {

const { refetchPets } = usePets()
const toast = useToast();

const queryClient = useQueryClient();
    
    
   const updateStatus = useMutation(
        (d) => axios.post(`${CONFIG_URLS.base}/pets/${petId}/status`, d),  
      {
        onSuccess: () => {
          toast({
            title: "Pet status updated",
            status: "success",
            duration: 5000,
            description: "Pet status updated",
            position: "top",
            isClosable: true,
          });
          queryClient.refetchQueries(["user"], {exact: false})
          refetchPets();
          },

          onError: () => {
            toast({
              title: "Pet status not updated",
              status: "error",
              duration: 5000,
              description: "Pet status not updated",
              position: "top",
              isClosable: true,
            });
            queryClient.refetchQueries(["user"], {exact: false})
            refetchPets();
            },
      }     
   );

    const updatePet = useMutation(
      (petinfo) => axios.put(`${CONFIG_URLS.base}/pets/${petId}`, petinfo),
      {
        onMutate: (petinfo) => {},
        onSuccess: (response) => {
          refetchPets();
          toast({
            title: "Pet updated",
            status: "success",
            duration: 5000,
            description: "Pet updated",
            position: "top",
          })
        },
      }
    );

    const deletePet = useMutation(
      (petId) => axios.delete(`${CONFIG_URLS.base}/pets/${petId}`),
      {
        onSuccess: () => {
          toast({
            title: "Pet deleted",
            status: "success",
            duration: 5000,
            description: "Pet deleted",
            position: "top",
          });
          queryClient.refetchQueries(["user"], {exact: false})

          refetchPets();
        }
      }
    )

    return { updateStatus, updatePet, deletePet };
  
}


export default usePet;

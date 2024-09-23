import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import CONFIG_URLS from "../Config/urls";
import axios from "../Config/axios";

const usePets = () => {
  const [filter, setFilter] = useState([]);

  const {
    data,
    isFetching,
    refetch: refetchPets,
  } = useQuery(
    ["pets", filter.map((filtered) => ({ ...filtered, id: undefined }))],
    async () => {
      if (filter.length > 0) {
        const response = await axios.post(`${CONFIG_URLS.base}/pets/search`, filter);
        return response.data;
      }
      const response = await axios.get(`${CONFIG_URLS.base}/pets`);
      return response.data;
    },
    {
      placeholderData: [],
      cacheTime: 60 * 60 * 20,
      staleTime: 60 * 20 * 10,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      structuralSharing: false,
    }
  );

  const addNewPet = useMutation((data) => axios.post(`${CONFIG_URLS.base}/pets`, data), {
    onSuccess: (res) => {
      refetchPets();
    },
  });

  return {
    filter,
    setFilter,
    data,
    isFetching,
    addNewPet,
    refetchPets,
  };
};

export default usePets;

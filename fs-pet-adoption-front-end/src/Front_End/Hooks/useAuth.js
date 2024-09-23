import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import CONFIG_URLS from "../Config/urls";
import axios from "../Config/axios";

const useAuth = () => {const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const user = useQuery(
    "user",
    () => axios.get(`${CONFIG_URLS.base}/users/isLoggedIn`),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: ({ data }) => {
        setLoggedIn(data);
      },
      onError: (e) => {
        setLoggedIn(false);
      },
    }
  );

  const signup = useMutation(
    async (data) => axios.post(`${CONFIG_URLS.base}/users/signup`, data),
    {
      onSuccess: (response) => {
        user.refetch();
      },
    }
  );

  const login = useMutation(
    async (data) => axios.post(`${CONFIG_URLS.base}/users/login`, data),
    {
      onSuccess: (response) => {
        user.refetch();
      },
    }
  );

  const signout = useMutation(
    async () => axios.get(`${CONFIG_URLS.base}/users/logout`),
    {
      onSuccess: (response) => {
        user.refetch();
      },
    }
        );
      
        return {
          isLoggedIn,
          isAdmin,
          setIsAdmin,
          signup,
          login,
          signout,
        };
      };
      
      export default useAuth;
      
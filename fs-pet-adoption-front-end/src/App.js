import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Front_End/Components/Menu/NavBar";
import routes from "./Front_End/Constants/routes";
import { useMemo } from "react";
import AuthContext from "./Front_End/Contexts/AuthContext";
import useAuth from "./Front_End/Hooks/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { useToast } from "@chakra-ui/react";



const queryClient = new QueryClient();


function App() {
  const toast = useToast();

  queryClient.setDefaultOptions({
    mutations: {
      onError: (error) => {
        if (["FormError", "AccessError", "AuthError", "ValidationError"].includes(error.response?.data?.errorType)) {
          toast({
            title: error.response?.data?.errorType,
            status: "error",
            duration: 5000,
            description: error.response.data.error,
            position: "top",
            isClosable: true,
          });
        }

    },
  },
  queries: {
    onError: (error) => {
      if (["FormError", "AccessError", "AuthError", "ValidationError"].includes(error.response?.data?.errorType)) {
        toast({
          title: error.response?.data?.errorType,
          status: "error",
          duration: 5000,
          description: error.response.data.error,
          position: "top",
          isClosable: true,
        });
      }
    },
  },

  })


  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  )


}
  const InnerApp = () => {
    const auth = useAuth(); // { isLoggedIn}
    const { isLoggedIn } = auth;

    // console.log("isLoggedIn", auth);

  const filterNav = useMemo(() => {
    const isAdmin = isLoggedIn?.accessLevel === "admin";
    if (isAdmin) return (route) => route.protected || route.admin;
    if (isLoggedIn) return (route) => route.protected && !route.admin;
    return (route) => !route.protected;
  }, [isLoggedIn]);

 

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <NavBar mt="0" />
        <Routes>
          {routes.filter(filterNav).map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;

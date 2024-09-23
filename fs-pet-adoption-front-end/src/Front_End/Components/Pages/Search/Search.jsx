import { Spinner, Stack } from "@chakra-ui/react";
import PetList from "../../Pets/PetList";
import SearchComponent from "./SearchComponent";
import usePets from "../../../Hooks/usePets";


const Search = () => {

  const { setFilter, data, refetchPets, isFetching: isLoading } = usePets();

  return (
    <Stack zIndex={0} alignItems="center" justifyContent="center">
      <SearchComponent
              refetchPets={refetchPets}
              submitHandler={(e) => setFilter(e)}

      />
      {isLoading ? <Spinner size="xl" /> :  <PetList data={data} />}
    </Stack>
  );
};

export default Search;

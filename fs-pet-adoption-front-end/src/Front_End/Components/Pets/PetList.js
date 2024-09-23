import PetCard from "./PetCard";
import { Flex } from "@chakra-ui/react";
import { useUser } from "../../Hooks/useUser";


const PetList = ({ data, deletePet }) => {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString();

  const { updateInfo } = useUser();


  return (
    <Flex flexFlow="row wrap" gap={5} justifyContent="center">
      {data &&
        data.map((pet) => {
          return (
            <PetCard
              key={`${currentDateString}+${pet.name}`}
              id={pet._id}
              height={pet.height}
              name={pet.name}
              weight={pet.weight}
              status={pet.status}
              imageSource={pet.image}
              modal={true}
              bio={pet.bio}
              diet={pet.dietaryRestrictions}
              breed={pet.breed}
              hypoallergenic={pet.hypoallergenic}
              color={pet.color}
              type={pet.type}
              updateInfo={updateInfo}
              deletePet={deletePet}
            />
          );
        })}
    </Flex>
  );
};

export default PetList;

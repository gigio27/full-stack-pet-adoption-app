import { v4 as uuidv4 } from "uuid";
import { Box, Button, Select, Flex, Input, Stack, Heading } from "@chakra-ui/react";
import { useState, useMemo, useCallback } from "react";

const SearchComponent = ({ submitHandler, refetchPets }) => {
  const [filterLines, setFilterLines] = useState([]);

  const addLine = useCallback(() => {
    setFilterLines((curr) => [
      ...curr,
      {
        id: uuidv4(),
        field: "type",
        operator: "equal",
        value: "",
      },
    ]);
  }, []);

  const removeLine = useCallback((lineId) => {
    setFilterLines((curr) => curr.filter((line) => line.id !== lineId));
  }, []);

  const updateLine = useCallback(
    (lineId, key, value) => {
      const lines = JSON.parse(JSON.stringify(filterLines));
      const line = lines.find((line) => line.id === lineId);
      line[key] = value;
      setFilterLines(lines);
    },
    [filterLines]
  );

  const reset = useCallback(() => {
    setFilterLines([]);
    submitHandler([]);
  }, [submitHandler]);

  const isSubmitDisabled = useMemo(
    () =>
      filterLines.reduce((accumulator, currLine) => {
        if (!currLine.value) return true;
        return accumulator;
      }, false),
    [filterLines]
  );

  const errors = useMemo(() => {
    const obj = {};
    filterLines.forEach((line) => {
      if (!line.value) {
        obj[line.id] = "value";
      }
    });
    return obj;
  }, [filterLines]);

  const onSubmit = useCallback(() => {
    submitHandler(filterLines);
    refetchPets();
  }, [filterLines, submitHandler, refetchPets]);

  return (
    <Box w="100%" d="flex" justifyContent="center" mt="50px">
      <Stack spacing={3} justifyContent="top" position="relative" mt="50" bgColor="white" w="100%" p={5}>
        {" "}
        <Heading alignSelf="center">Search for a pet</Heading>
        <Button w="30%" alignSelf="center" bgColor="blue.100" p={4} onClick={addLine}>
          Add to Search
        </Button>
        {filterLines.map((line) => (
          <FilterLine key={line.id} line={line} removeLine={removeLine} updateLine={updateLine} errors={errors} />
        ))}
        {filterLines.length > 0 && (
          <Flex gap={10} alignItems="center" justifyContent="center">
            <Button onClick={onSubmit} disabled={isSubmitDisabled} bgColor="green.100">
              Search
            </Button>
            <Button bgColor="red.100" onClick={reset}>
              Reset Search
            </Button>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

const FilterLine = ({ updateLine, line, errors, removeLine }) => {
  const OperatorTemplate = useMemo(() => {
    if (line.field === "type") {
      return (
        <Select value={line.operator} onChange={(event) => updateLine(line.id, "operator", event.target.value)}>
          <option value="equal">is a</option>
          <option value="not-equal">is not a</option>
        </Select>
      );
    }
    if (line.field === "status") {
      return (
        <Select value={line.operator} onChange={(event) => updateLine(line.id, "operator", event.target.value)}>
          <option value="equal">is</option>
          <option value="not-equal">is not</option>
        </Select>
      );
    }
    if (line.field === "name") {
      return (
        <Select value={line.operator} onChange={(event) => updateLine(line.id, "operator", event.target.value)}>
          <option value="equal">is</option>
          <option value="not-equal">is not</option>
          <option value="contains">contains</option>
        </Select>
      );
    }
    if (line.field === "height" || line.field === "weight") {
      return (
        <Select value={line.operator} onChange={(event) => updateLine(line.id, "operator", event.target.value)}>
          <option value="equal">is exactly</option>
          <option value="more">is more than</option>
          <option value="less">is less than</option>
        </Select>
      );
    }
  }, [line.field, line.id, line.operator, updateLine]);

  const ValueTemplate = useMemo(() => {
    if (line.field === "type") {
      return (
        <Select value={line.value} onChange={(event) => updateLine(line.id, "value", event.target.value)}>
          <option value="" disabled>
            Select types
          </option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="Bird">Bird</option>
        </Select>
      );
    }

    if (line.field === "status") {
      return (
        <Select value={line.value} onChange={(event) => updateLine(line.id, "value", event.target.value)}>
          <option value="" disabled>
            Select status
          </option>
          <option value="available">Available</option>
          <option value="fostered">Fostered</option>
          <option value="adopted">Adopted</option>
        </Select>
      );
    }
    if (line.field === "name") {
      return <Input isInvalid={errors?.[line.id] === "value"} errorBorderColor="red.100" placeholder="Name" value={line.value} onChange={(event) => updateLine(line.id, "value", event.target.value)} />;
    }
    if (line.field === "height" || line.field === "weight") {
      return <Input isInvalid={errors?.[line.id] === "value"} errorBorderColor="red.100" placeholder="Enter a number" value={line.value} onChange={(event) => updateLine(line.id, "value", event.target.value)} type="number" />;
    }
    return <Input isInvalid={errors?.[line.id] === "value"} errorBorderColor="red.100" value={line.value} onChange={(event) => updateLine(line.id, "value", event.target.value)} />;
  }, [line, errors, updateLine]);

  return (
    <Box>
      <Flex key={line.id} gap={3}>
        <Select value={line.field} onChange={(event) => updateLine(line.id, "field", event.target.value)}>
          <option value="type">Type</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
          <option value="height">Height (cm)</option>
          <option value="weight">Weight (kg)</option>
        </Select>
        {OperatorTemplate}
        {ValueTemplate}
        <Button bgColor="white" color="white" onClick={() => removeLine(line.id)}></Button>
      </Flex>
    </Box>
  );
};

export default SearchComponent;

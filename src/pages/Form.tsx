import * as React from "react";
import { Text, Center } from "@chakra-ui/react";
export interface FormProps {}

const Form: React.FunctionComponent<FormProps> = () => {
  return (
    <Center height={"500px"}>
      <Text>Form</Text>
    </Center>
  );
};

export default Form;

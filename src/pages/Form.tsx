import * as React from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Formik, Form as FormikForm, Field } from "formik";
import { UserRecord } from "../store/slices/records";
import { useHistory } from "react-router-dom";
interface FormProps {}

const Form: React.FunctionComponent<FormProps> = () => {
  const history = useHistory();

  const validateBirthYear = (value: string) => {
    let error = "";
    value = value.trim();
    if (!value) {
      error = "Required";
    } else if (isNaN(Number(value)) || value.length > 4) {
      error = "Please enter a valid birth year";
    }
    return error;
  };
  const validateEmail = (value: string) => {
    let error = "";
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Please enter a valid email address";
    }
    return error;
  };

  const handleFormSubmit = (
    values: { email: string; birthYear: string },
    actions: any
  ) => {
    const user = {
      email: values.email,
      birthYear: Number(values.birthYear),
    };
    const records = localStorage.getItem("data");
    let parsedRecordsObj: UserRecord[] = [];
    if (records) {
      try {
        parsedRecordsObj = JSON.parse(records) as UserRecord[];
        if (parsedRecordsObj && Array.isArray(parsedRecordsObj)) {
          console.log("Parsed is array");
          parsedRecordsObj.push(user);
          console.log(parsedRecordsObj);
        }
        localStorage.setItem("data", JSON.stringify(parsedRecordsObj));
      } catch (e) {
        console.log(e);
        localStorage.setItem("data", JSON.stringify([user]));
      }
    } else {
      localStorage.setItem("data", JSON.stringify([user]));
    }
    actions.resetForm({});
    history.replace("/");
  };
  const checkForLocalStorageChange = React.useCallback(
    (event) => {
      if (event.newValue === "false") {
        history.replace("/login");
      }
    },
    [history]
  );
  React.useEffect(() => {
    window.addEventListener("storage", checkForLocalStorageChange);

    return () => {
      window.removeEventListener("storage", checkForLocalStorageChange);
    };
  }, [checkForLocalStorageChange]);
  return (
    <Center height={"500px"}>
      <Formik
        initialValues={{ email: "", birthYear: "" }}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <FormControl
              isRequired
              isInvalid={errors.birthYear && touched.birthYear ? true : false}
              my={2}
            >
              <FormLabel htmlFor="birthYear">Year of birth</FormLabel>
              <Field
                as={Input}
                id="birthYear"
                name="birthYear"
                placeholder="1990"
                validate={validateBirthYear}
              />
              <FormErrorMessage>{errors.birthYear}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errors.email && touched.email ? true : false}
              mt={2}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                validate={validateEmail}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="green" type="submit">
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Center>
  );
};

export default Form;

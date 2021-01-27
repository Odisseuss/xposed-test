import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Center,
} from "@chakra-ui/react";
import { UserRecord } from "../store/slices/records";
import { getRecordsFromStorage } from "../utils/getRecordsFromStorage";

export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  let [arrayOfRecords, setArrayOfRecords] = React.useState(
    new Array<UserRecord>()
  );

  // Initialize local state
  React.useEffect(() => {
    let records = getRecordsFromStorage();
    setArrayOfRecords(records);
  }, []);

  return (
    <React.Fragment>
      {/* Render table if records are present, and a message if not */}
      {arrayOfRecords && arrayOfRecords.length > 0 ? (
        <Center>
          <Table
            variant="simple"
            width="80%"
            style={{ border: "1px solid #eee" }}
          >
            <Thead>
              <Tr>
                <Th>Email</Th>
                <Th>Year of birth</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Generate table rows based on records state */}
              {arrayOfRecords.map((recordObj, index) => (
                <Tr key={index}>
                  <Td>{recordObj.email}</Td>
                  <Td>{recordObj.birthYear}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Center>
      ) : (
        <Center height={"500px"}>
          <Text>There are no records in the local storage!</Text>
        </Center>
      )}
    </React.Fragment>
  );
};

export default Home;

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

export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const records = localStorage.getItem("data");
  let [arrayOfRecords, setArrayOfRecords] = React.useState(
    new Array<UserRecord>()
  );

  React.useEffect(() => {
    if (records) {
      try {
        let parsedRecordsObj = JSON.parse(records) as UserRecord[];
        if (parsedRecordsObj) {
          setArrayOfRecords(parsedRecordsObj);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [records]);

  return (
    <React.Fragment>
      {records && arrayOfRecords && arrayOfRecords.length > 0 ? (
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

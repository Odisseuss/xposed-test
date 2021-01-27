import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Center,
} from "@chakra-ui/react";
export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const records = localStorage.getItem("data");
  const arrayOfRecords: string[][] = [];
  React.useEffect(() => {
    if (records) {
      let parsedRecordsObj = JSON.parse(records);
      for (let i in parsedRecordsObj) {
        arrayOfRecords.push([i, parsedRecordsObj[i]]);
      }
    }
  }, [records]);

  return records && arrayOfRecords ? (
    <Table variant="simple">
      <TableCaption>User Records</TableCaption>
      <Thead>
        <Tr>
          <Th>Email</Th>
          <Th>Year of birth</Th>
        </Tr>
      </Thead>
      <Tbody>
        {arrayOfRecords.map((recordPair) => (
          <Tr>
            <Td>{recordPair.pop()}</Td>
            <Td>{recordPair.pop()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ) : (
    <Center height={"500px"}>
      <Text>There are no records in the local storage!</Text>
    </Center>
  );
};

export default Home;

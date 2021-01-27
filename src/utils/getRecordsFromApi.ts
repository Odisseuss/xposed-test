import { UserRecord } from "../store/slices/records";
import axios from "axios";

// Try to parse api res data as array of users
// and return empty array if not possible
export function getRecordsFromApi() {
  return axios
    .get("/user-records")
    .then((apiRes) => {
      if (apiRes.data) {
        try {
          let parsedRecordsObj = apiRes.data as UserRecord[];
          if (parsedRecordsObj && Array.isArray(parsedRecordsObj)) {
            return parsedRecordsObj;
          }
        } catch (e) {
          console.log(e);
        }
      }
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

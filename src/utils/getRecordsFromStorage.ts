import { UserRecord } from "../store/slices/records";
// Try to parse local storage data as array of users
// and return empty array if not possible
export function getRecordsFromStorage() {
  const records = localStorage.getItem("data");
  let parsedRecordsObj = [];
  if (records) {
    try {
      parsedRecordsObj = JSON.parse(records) as UserRecord[];
      if (parsedRecordsObj && Array.isArray(parsedRecordsObj)) {
        return parsedRecordsObj;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return [];
}

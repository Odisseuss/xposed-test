import axios from "axios";

// Try to parse api res data as array of users
// and return empty array if not possible
export function getAuthFromApi() {
  return axios
    .get("/auth")
    .then((apiRes) => {
      if (apiRes.data) {
        return apiRes.data.isLoggedIn;
      }
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

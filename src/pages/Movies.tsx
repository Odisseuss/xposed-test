import * as React from "react";
import axios from "axios";
import {
  Table,
  Tr,
  Tbody,
  Thead,
  Th,
  Td,
  Spinner,
  TableCaption,
  Box,
} from "@chakra-ui/react";
import { MovieData } from "../types/IMovie.d";
export interface MoviesProps {}

const Movies: React.FunctionComponent<MoviesProps> = () => {
  const [movies, setMovies] = React.useState<MovieData[]>([]);
  // Get movies on mount
  React.useEffect(() => {
    axios.get("https://api.tvmaze.com/shows").then((res) => {
      setMovies(res.data);
    });
  }, []);
  return (
    <React.Fragment>
      <Box justifyContent={"start"} px="2">
        {/* Very big table, can't display all data as is without overflowing */}
        <Table
          variant="simple"
          size="sm"
          style={{
            border: "1px solid #eee",
          }}
        >
          <Thead>
            <Tr>
              {/* Generate table headings based on movie object */}
              {movies.length
                ? Object.keys(movies[0]).map((heading, index) => (
                    <Th key={index}>{heading}</Th>
                  ))
                : null}
            </Tr>
          </Thead>
          <Tbody>
            {/* Generate table rows based on records state */}
            {movies.map((movie, index) => (
              <Tr key={index}>
                <Td>{movie.id}</Td>
                <Td>{movie.name}</Td>
                <Td>
                  <a href={movie.url} style={{ color: "#38A169" }}>
                    Movie URL
                  </a>
                </Td>
                <Td>{movie.type}</Td>
                <Td>{movie.language}</Td>
                <Td>{movie.genres.join(", ")}</Td>
                <Td>{movie.status}</Td>
                <Td>{movie.runtime}</Td>
                <Td>{movie.premiered}</Td>
                <Td style={{ wordBreak: "break-word" }}>
                  {movie.officialSite || "-"}
                </Td>
                <Td>{`Every ${movie.schedule.days} at ${movie.schedule.time}`}</Td>
                <Td>{movie.rating.average}</Td>
                <Td>{movie.weight}</Td>
                <Td>{movie.network ? movie.network.name : ""}</Td>
                <Td>{movie.webChannel ? movie.webChannel.name : ""}</Td>
                <Td>
                  {movie.externals
                    ? Object.entries(movie.externals)
                        .map((externalArr) => externalArr.join(" : "))
                        .join(",\n")
                    : ""}
                </Td>
                <Td>
                  {movie.image && movie.image.original ? (
                    <img src={movie.image.original} alt="" />
                  ) : (
                    ""
                  )}
                </Td>
                <Td>
                  {movie.summary.replaceAll(new RegExp("<.+?>", "g"), "")}
                </Td>
                <Td>{movie.updated}</Td>
                <Td>{movie.links && movie.links.self}</Td>
              </Tr>
            ))}
          </Tbody>
          {/* Show a loading icon if request hasn't finished */}
          {!movies.length ? (
            <TableCaption>
              <Spinner size="lg" />
            </TableCaption>
          ) : null}
        </Table>
      </Box>
    </React.Fragment>
  );
};

export default Movies;

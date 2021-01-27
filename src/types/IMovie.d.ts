import { SelectFieldProps } from "@chakra-ui/react";

interface Schedule {
  time: string;
  days: string[];
}
interface Country {
  name: string;
  code: string;
  timezone: string;
}
interface Network {
  id: number;
  name: string;
  country: Country;
  days: string[];
}
interface WebChannel {
  id: number;
  name: string;
  country: Country;
}
export interface MovieData {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: Schedule;
  rating: { average: number };
  weight: number;
  network: Network;
  webChannel: WebChannel;
  externals: {
    [key: string]: number | string;
  };
  image: {
    [key: string]: string;
  };
  summary: string;
  updated: number;
  links: {
    [key: string]: string;
  };
}

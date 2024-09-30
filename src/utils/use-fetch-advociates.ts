import { useQuery } from "@tanstack/react-query";
import { Advocate } from "./types";

interface Props {
  searchTerm?: string;
}

const fetchAdvocates = async (props: Props = {}) => {
  const { searchTerm = "" } = props;
  const url = `/api/advocates?searchTerm=${searchTerm}`;
  const resp = await fetch(url).then((resp) => resp.json());
  return resp.data as Advocate[];
};

export const useFetchAdvocates = (props: Props = {}) => {
  return useQuery({
    queryKey: ["fetchAdvocates", props],
    queryFn: () => fetchAdvocates(props),
  });
};

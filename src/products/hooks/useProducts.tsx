import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Props {
  filterKey?: string;
}
export const useProducts = ({ filterKey }: Props) => {
  const productsQuery = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    productsQuery: {
      ...productsQuery,
      products: productsQuery.data ?? [],
    },
  };
};

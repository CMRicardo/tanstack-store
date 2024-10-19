import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Props {
  id: number;
}
export const useProduct = ({ id }: Props) => {
  const productQuery = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => productActions.getProductById({ id }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    productQuery: {
      ...productQuery,
      products: productQuery.data ?? [],
    },
  };
};

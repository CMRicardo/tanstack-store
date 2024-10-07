import { type Product, productsApi } from "..";

const sleep = (ms: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

interface Props {
  filterKey?: string;
}
export const getProducts = async ({ filterKey }: Props) => {
  await sleep(2000);
  const filteredURL = filterKey ? `category=${filterKey}` : "";

  const { data } = await productsApi.get<Product[]>(`/products?${filteredURL}`);
  return data;
};

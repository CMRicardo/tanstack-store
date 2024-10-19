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
export const getProducts = async ({ filterKey }: Props): Promise<Product[]> => {
  await sleep(2000);
  const filteredURL = filterKey ? `category=${filterKey}` : "";

  const { data } = await productsApi.get<Product[]>(`/products?${filteredURL}`);
  return data;
};

export const getProductById = async ({
  id,
}: {
  id: number;
}): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

import { type Product, productsApi } from "..";

export const sleep = (ms: number): Promise<boolean> => {
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

interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export const createProduct = async (product: ProductLike) => {
  await sleep(5000);
  // throw new Error("Error on createProduct");
  const { data } = await productsApi.post<Product>("/products", product);
  return data;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();
  const productMutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate(variables) {
      console.log("Mutando --- Optimistic update");
      // Optimistic product
      const optimisticProduct = {
        ...variables,
        id: Math.random(),
      };

      // Save optimistic product on queryClient cache
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (currentProducts) => {
          if (!currentProducts) return [optimisticProduct];
          return [...currentProducts, optimisticProduct];
        }
      );
      return {
        optimisticProduct,
      };
    },
    onSuccess: (product, variables, context) => {
      queryClient.removeQueries({
        queryKey: ["product", context.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (currentProducts) => {
          if (!currentProducts) return [product];
          return currentProducts.map((cachedProduct) => {
            return cachedProduct.id === context.optimisticProduct.id
              ? product
              : cachedProduct;
          });
        }
      );
    },
    onError: (error, variables, context) => {
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (currentProducts) => {
          if (!currentProducts) return [];
          return currentProducts.filter((cachedProduct) => {
            return cachedProduct.id !== context?.optimisticProduct.id;
          });
        }
      );
    },
  });
  return { productMutation };
};

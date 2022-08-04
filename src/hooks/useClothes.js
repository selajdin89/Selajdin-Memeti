import React from "react";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES_LIST = gql`
  query {
    category(input: { title: "clothes" }) {
      products {
        id
        name
        category
        gallery
        inStock
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        description
      }
    }
  }
`;

function useClothes() {
  const { error, loading, data } = useQuery(CATEGORIES_LIST, {
    category: "clothes",
  });

  return {
    error,
    loading,
    data,
  };
}

export default useClothes;

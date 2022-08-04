import React from "react";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES_LIST = gql`
  query {
    category(input: { title: "tech" }) {
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

function useTech() {
  const { error, loading, data } = useQuery(CATEGORIES_LIST, {
    category: "tech",
  });

  return {
    error,
    loading,
    data,
  };
}

export default useTech;

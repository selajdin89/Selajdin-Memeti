import React from "react";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES_LIST = gql`
  query {
    category(input: { title: "all" }) {
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

function useAll() {
  const { error, loading, data } = useQuery(CATEGORIES_LIST, {
    category: "all",
  });

  return {
    error,
    loading,
    data,
  };
}

export default useAll;

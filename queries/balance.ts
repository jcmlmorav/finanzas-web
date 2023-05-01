import { gql } from "@apollo/client";

export const GET_BALANCE = gql`
  query GetBalance {
    balance {
      id
      total
    }
  }
`;

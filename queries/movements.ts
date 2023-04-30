import { gql } from "@apollo/client";

export const GET_MOVEMENTS = gql`
  query GetMovements($type: String!) {
    movements(type: $type) {
      id
      type
      date
      description
      amount
    }
  }
`;

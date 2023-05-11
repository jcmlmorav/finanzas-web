import { gql } from "@apollo/client";

export const GET_MOVEMENT = gql`
  query GetMovement($id: String!) {
    movement(id: $id) {
      id
      date
      type
      description
      amount
    }
  }
`;

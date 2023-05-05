import { gql } from "@apollo/client";

export const CREATE_MOVEMENT = gql`
  mutation CreateMovement($input: CreateMovementInput!) {
    createMovement(movement: $input) {
      id
      type
      description
      date
      amount
    }
  }
`;

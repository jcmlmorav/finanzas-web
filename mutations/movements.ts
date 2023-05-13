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

export const UPDATE_MOVEMENT = gql`
  mutation UpdateMovement($input: UpdateMovementInput!) {
    updateMovement(movement: $input) {
      id
      type
      description
      date
      amount
    }
  }
`;

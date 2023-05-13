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

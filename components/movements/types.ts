export enum MovementType {
  Income,
  Expense,
}

export interface MovementsProps {
  type: MovementType;
}

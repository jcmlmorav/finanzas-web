export enum MovementType {
  Income,
  Expense,
}

export interface Movement {
  id: number;
  type: string;
  date: string;
  description: string;
  amount: string;
}

export interface MovementsProps {
  type: MovementType;
  data: [Movement];
}

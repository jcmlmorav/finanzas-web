import { Paper, Typography } from "@mui/material";
import { BalanceProps } from "./types";
import { MoneyFormat } from "../utils";

export const Balance = ({ data }: BalanceProps) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" component="h2" gutterBottom>
      Balance
    </Typography>
    <Typography variant="body1">{MoneyFormat.format(data.total)}</Typography>
  </Paper>
);

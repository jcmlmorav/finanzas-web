import { useEffect, useState } from "react";
import { Movement, MovementsProps, MovementType } from "./types";
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import moment from "moment";
import { MoneyFormat } from "../utils";

export const Movements = ({ type, data }: MovementsProps) => {
  const [movements, setMovements] = useState<Movement[]>([]);

  useEffect(() => {
    if (data.length) {
      const formattedMovements = data.map((movement: Movement) => ({
        ...movement,
        date: moment(parseInt(movement.date, 10)).format('MMM d'),
        amount: MoneyFormat.format(parseInt(movement.amount))
      }));

      setMovements(formattedMovements);
    }
  }, [data]);

  return (
    <Paper sx={{ p: 3 }} elevation={0}>
      <Typography variant="h6" component="h3" gutterBottom>
        {type === MovementType.Income ? "Ingresos" : "Egresos"}
      </Typography>
      <TableContainer component={Paper}>
        <Table
          aria-label={`Lista de ${
            type === MovementType.Income ? "ingresos" : "egresos"
          }`}
        >
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.length > 0 ? (
              movements.map((movement: Movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.date}</TableCell>
                  <TableCell>{movement.description}</TableCell>
                  <TableCell>{movement.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>Sin registros</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

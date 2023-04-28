import { MovementsProps, MovementType } from "./types";
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

export const Movements = ({ type }: MovementsProps) => (
  <Paper sx={{ p: 3 }} elevation={0}>
    <Typography variant="h6" component="h3" gutterBottom>
      {type === MovementType.Income ? 'Ingresos' : 'Egresos'}
    </Typography>
    <TableContainer component={Paper}>
      <Table aria-label={`Lista de ${type === MovementType.Income ? 'ingresos' : 'egresos'}`}>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Abril 3</TableCell>
            <TableCell>Montaje de Finanzas</TableCell>
            <TableCell>$ 1.500.000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Abril 3</TableCell>
            <TableCell>Montaje de Finanzas</TableCell>
            <TableCell>$ 1.500.000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Abril 3</TableCell>
            <TableCell>Montaje de Finanzas</TableCell>
            <TableCell>$ 1.500.000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Abril 3</TableCell>
            <TableCell>Montaje de Finanzas</TableCell>
            <TableCell>$ 1.500.000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

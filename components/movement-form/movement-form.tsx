import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "./types";
import styles from "../../styles/movement-form.module.css";
import { useState } from "react";
import moment from "moment";

export const MovementForm = () => {
  const [movementType, setMovementType] = useState("income");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      date: moment().format('YYYY-MM-DD')
    }
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({
      movementType,
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <ToggleButtonGroup
        className={styles.formWrapper_type}
        value={movementType}
        exclusive
        aria-label="Tipo de movimiento"
      >
        <ToggleButton value="income" onClick={() => setMovementType("income")}>
          Ingreso
        </ToggleButton>
        <ToggleButton
          value="expense"
          onClick={() => setMovementType("expense")}
        >
          Egreso
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        error={!!errors.date}
        label="Fecha"
        InputLabelProps={{ shrink: true }}
        type="date"
        {...register("date", {
          required: true
        })}
      />
      <TextField
        error={!!errors.amount}
        type="number"
        label="Valor *"
        {...register("amount", {
          required: true,
        })}
      />
      <TextField label="Descripción" {...register("description")} />
      <Button size="large" variant="contained" type="submit">
        Registrar
      </Button>
      <Link className={styles.button} href="/">
        <Button fullWidth size="large" variant="outlined">
          Cancelar
        </Button>
      </Link>
    </form>
  );
};

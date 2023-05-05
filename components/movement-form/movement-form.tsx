import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  CircularProgress,
  Alert,
  AlertTitle
} from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "./types";
import styles from "../../styles/movement-form.module.css";
import { useState } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { CREATE_MOVEMENT } from "@/mutations/movements";
import { GET_MOVEMENTS } from "@/queries/movements";
import { GET_BALANCE } from "@/queries/balance";
import { useRouter } from "next/router";

export const MovementForm = () => {
  const router = useRouter();
  const [movementType, setMovementType] = useState("income");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      date: moment().format("YYYY-MM-DD"),
    },
  });
  const [createMovement, { data, loading, error }] =
    useMutation(CREATE_MOVEMENT);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const movement = {
      ...data,
      type: movementType,
      amount: parseInt(`${data.amount}`, 10),
      date: `${new Date(data.date).getTime()}`,
    };

    createMovement({
      variables: {
        input: movement,
      },
      refetchQueries: [
        { query: GET_MOVEMENTS },
        { query: GET_BALANCE }
      ]
    });
  };

  if (data && data.createMovement && data.createMovement.id) {
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      {error !== undefined && (
        <Alert severity="error">
          <AlertTitle>Ocurrió un error</AlertTitle>
          <strong>Lo sentimos</strong> - No pudimos guardar el movimiento, intenta nuevamente
        </Alert>
      )}
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
          required: true,
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
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button size="large" variant="contained" type="submit">
            Registrar
          </Button>
          <Link className={styles.button} href="/">
            <Button fullWidth size="large" variant="outlined">
              Cancelar
            </Button>
          </Link>
        </>
      )}
    </form>
  );
};

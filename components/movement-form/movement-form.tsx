import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "./types";
import styles from "../../styles/movement-form.module.css";
import { useState } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { CREATE_MOVEMENT, UPDATE_MOVEMENT } from "@/mutations/movements";
import { GET_MOVEMENTS } from "@/queries/movement";
import { GET_BALANCE } from "@/queries/balance";
import { useRouter } from "next/router";
import { Movement } from "../movements/types";

interface MovementFormProps {
  initData?: Movement;
}

export const MovementForm = ({ initData }: MovementFormProps) => {
  const router = useRouter();
  const [movementType, setMovementType] = useState(initData?.type || "income");
  const [
    createMovement,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_MOVEMENT);
  const [
    updateMovement,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_MOVEMENT);

  let initialDate = moment().format("YYYY-MM-DD");
  if (initData?.date) {
    initialDate = moment(parseInt(`${initData?.date}}`, 10)).format(
      "YYYY-MM-DD"
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      date: initialDate,
      amount: (initData && parseInt(`${initData?.amount}`, 10)) || undefined,
      description: initData?.description,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const movement = {
      ...data,
      type: movementType,
      amount: parseInt(`${data.amount}`, 10),
      date: `${new Date(data.date).getTime()}`,
    };

    if (initData?.id) {
      updateMovement({
        variables: {
          input: {
            id: initData?.id,
            ...movement
          },
        },
        refetchQueries: [{ query: GET_MOVEMENTS }, { query: GET_BALANCE }],
      });
    } else {
      createMovement({
        variables: {
          input: movement,
        },
        refetchQueries: [{ query: GET_MOVEMENTS }, { query: GET_BALANCE }],
      });
    }

  };

  if (
    (dataCreate && dataCreate.createMovement && dataCreate.createMovement.id) ||
    (dataUpdate && dataUpdate.updateMovement && dataUpdate.updateMovement.id)
  ) {
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      {(errorCreate !== undefined) || (errorUpdate !== undefined) && (
        <Alert severity="error">
          <AlertTitle>Ocurrió un error</AlertTitle>
          <strong>Lo sentimos</strong> - No pudimos guardar el movimiento,
          intenta nuevamente
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
      {loadingCreate || loadingUpdate ? (
        <CircularProgress />
      ) : (
        <>
          <Button size="large" variant="contained" type="submit">
            {initData?.id ? 'Actualizar' : 'Registrar' }
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

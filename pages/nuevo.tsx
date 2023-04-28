import Head from "next/head";
import { Typography } from "@mui/material";
import { MovementForm } from "@/components/movement-form";
import styles from "../styles/New.module.css";

export default function New() {
  return (
    <>
      <Head>
        <title>Nuevo movimiento</title>
      </Head>
      <main className={styles.main}>
        <Typography variant="h3" component="h1">
          Nuevo movimiento
        </Typography>
        <MovementForm />
      </main>
    </>
  );
}

import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "@/styles/Home.module.css";
import { Balance } from "@/components/balance";
import { Movements } from "@/components/movements";
import { MovementType } from "@/components/movements/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Finanzas</title>
        <meta name="description" content="Finanzas Personales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Typography variant="h3" component="h1">
          Finanzas
        </Typography>
        <Balance />
        <div className={styles.movements}>
          <Movements type={MovementType.Income} />
          <Movements type={MovementType.Expense} />
        </div>
        <Link href="/nuevo" className={styles.addButton}>
          <Fab
            color="primary"
            aria-label="Nuevo movimiento"
          >
            <AddIcon />
          </Fab>
        </Link>
      </main>
    </>
  );
}

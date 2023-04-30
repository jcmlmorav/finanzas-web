import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "@/styles/Home.module.css";
import { Balance } from "@/components/balance";
import { Movements } from "@/components/movements";
import { Movement, MovementType } from "@/components/movements/types";
import { GET_MOVEMENTS } from '../queries/movements';
import client from '../apollo-client';

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  incomes: [Movement];
  expenses: [Movement];
}

function Home({ incomes, expenses }: HomeProps) {
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
          <Movements type={MovementType.Income} data={incomes} />
          <Movements type={MovementType.Expense} data={expenses} />
        </div>
        <Link href="/nuevo" className={styles.addButton}>
          <Fab color="primary" aria-label="Nuevo movimiento">
            <AddIcon />
          </Fab>
        </Link>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data: incomes } = await client.query({
    query: GET_MOVEMENTS,
    variables: { type: 'income' }
  });

  const { data: expenses } = await client.query({
    query: GET_MOVEMENTS,
    variables: { type: 'expense' }
  });

  return {
    props: {
      incomes: incomes.movements,
      expenses: expenses.movements,
    }
  }
}

export default Home;

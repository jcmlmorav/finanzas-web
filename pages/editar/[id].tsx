import Head from "next/head";
import { Typography } from "@mui/material";
import styles from "../../styles/New.module.css";
import { MovementForm } from "@/components/movement-form";
import client from "@/apollo-client";
import { GET_MOVEMENT } from "@/queries/movement";
import { Movement } from "@/components/movements/types";

interface EditProps {
  movement: Movement;
}

function Edit({ movement }: EditProps) {
  return (
    <>
      <Head>
        <title>Editar movimiento</title>
      </Head>
      <main className={styles.main}>
        <Typography variant="h3" component="h1">
          Editar movimiento
        </Typography>
        <MovementForm initData={movement} />
      </main>
    </>
  );
}

export async function getServerSideProps({ query }: any) {
  const { data } = await client.query({
    query: GET_MOVEMENT,
    variables: {
      id: query.id,
    },
  });

  return {
    props: {
      movement: data.movement,
    },
  };
}

export default Edit;

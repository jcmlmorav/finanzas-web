import { Paper, Typography } from "@mui/material";

export const Balance = () => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" component="h2" gutterBottom>
      Balance
    </Typography>
    <Typography variant="body1">$ 1.524.840</Typography>
  </Paper>
);

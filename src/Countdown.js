import React from "react";
import { Grid, Typography } from "@mui/joy";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

// TODO: Add support for isActive
export default function Countdown({
  initialTime,
  remainingTime,
  color,
  title,
}) {
  const percentage = 100 - (remainingTime / initialTime) * 100;
  const remainingMinutes = `${Math.floor(remainingTime / 60)}`.padStart(2, "0");
  const remainingSeconds = `${Math.floor(remainingTime % 60)}`.padStart(2, "0");

  return (
    <React.Fragment>
      <Container>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={4}>
            <Typography variant="h2" align="center" color={color}>
              {remainingMinutes}:{remainingSeconds}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" align="center" color={color}>
              {title}
            </Typography>
          </Grid>
          <CircularProgress variant="determinate" value={25} />
        </Grid>
      </Container>
    </React.Fragment>
  );
}

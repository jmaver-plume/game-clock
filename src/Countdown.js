import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

// TODO: Add support for isActive
export default function Clock({ initialTime, remainingTime, color, title }) {
  const percentage = 100 - (remainingTime / initialTime) * 100;
  const remainingMinutes = `${Math.floor(remainingTime / 60)}`.padStart(2, "0");
  const remainingSeconds = `${Math.floor(remainingTime % 60)}`.padStart(2, "0");

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={24}>
      <Grid item xs={12}>
        <CircularProgressbarWithChildren
          strokeWidth={2}
          value={percentage}
          styles={buildStyles({
            pathColor: color,
            strokeLinecap: "butt",
          })}
        >
          <Typography variant="h2" align="center" color={color}>
            {remainingMinutes}:{remainingSeconds}
          </Typography>
          <Typography variant="h4" align="center" color={color}>
            {title}
          </Typography>
        </CircularProgressbarWithChildren>
      </Grid>
    </Grid>
  );
}

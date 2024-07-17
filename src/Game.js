import React from "react";
import { Button, Grid } from "@mui/material";
import Countdown from "./Countdown";

export function Game({ state, start, pause, next }) {
  return (
    <Grid container width="100vw" height="100vh">
      <Grid item xs={12}>
        <Grid height="100%" container spacing={8}>
          {state.players.map((player, index) => (
            <Grid
              item
              key={index}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Countdown
                initialTime={state.initialTime}
                remainingTime={player.remainingTime}
                title={player.name}
                color={player.color}
                isActive={index === state.activePlayerIndex}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign={"center"}>
        <Button variant="contained" disabled={state.isRunning} onClick={start}>
          Start
        </Button>
        <Button
          variant="contained"
          disabled={!state.isRunning}
          onClick={pause}
          sx={{ ml: 2 }}
        >
          Pause
        </Button>
        <Button variant="contained" onClick={next} sx={{ ml: 2 }}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
}

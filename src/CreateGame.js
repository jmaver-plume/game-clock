import React, { useState } from "react";
import { FormControl, FormLabel, Grid, Input, Option, Select } from "@mui/joy";

import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const COLOR = {
  red: "#8B0000",
  blue: "#00008B",
  green: "#00FF00",
  brown: "#006400",
};

function CreateGame({ setup }) {
  const [name, setName] = useState("");
  const [remainingColors, setRemainingColors] = useState(Object.keys(COLOR));
  const [color, setColor] = useState(remainingColors[0]);
  const [players, setPlayers] = useState([]);
  const [duration, setDuration] = useState(30);
  const [increment, setIncrement] = useState(0);

  React.useEffect(() => {
    const pickedColors = players.map((player) => player.color);
    const remainingColors = Object.keys(COLOR).filter(
      (color) => !pickedColors.some((pickedColor) => pickedColor === color),
    );
    setRemainingColors(remainingColors);
    setColor(remainingColors[0]);
  }, [players]);

  console.log(color, remainingColors[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setup({
      initialTime: duration * 60,
      increment,
      isRunning: false,
      activePlayerIndex: 0,
      turnStartTime: null,
      players: players.map((player) => ({
        name: player.name,
        color: player.color,
        remainingTime: duration * 60,
      })),
    });
  };

  const removePlayer = (index) => {
    setPlayers([...players.slice(0, index), ...players.slice(index + 1)]);
  };

  const addPlayer = () => {
    setPlayers([...players, { name, color }]);
    setName("");
  };

  return (
    <Grid
      container
      margin={2}
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid xs={12}>
        <Typography variant="h5">Create a Game Clock</Typography>
      </Grid>
      <Grid xs={12}>
        <FormControl>
          <FormLabel>Initial duration (minutes)</FormLabel>
          <Input
            fullWidth
            type="number"
            variant="outlined"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            margin="normal"
            required={true}
          />
        </FormControl>
      </Grid>

      <Grid xs={12}>
        <FormControl>
          <FormLabel>Increment (seconds)</FormLabel>
          <Input
            fullWidth
            type="number"
            variant="outlined"
            value={increment}
            onChange={(e) => setIncrement(e.target.value)}
            margin="normal"
          />
        </FormControl>
      </Grid>

      <Grid xs={12}>
        <Typography variant="body1">Players</Typography>
      </Grid>

      {players.map((player, index) => (
        <React.Fragment key={index}>
          <Grid xs={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                fullWidth
                label="Name"
                value={player.name}
                disabled={true}
                margin="normal"
              />
            </FormControl>
          </Grid>

          <Grid xs={4}>
            <FormControl sx={{ height: "100%" }}>
              <FormLabel>Color</FormLabel>
              <Select
                sx={{ height: "100%" }}
                defaultValue={player.color}
                onChange={() => {}}
                disabled={true}
              >
                <Option value={player.color}>{player.color}</Option>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={2} style={{ display: "flex", alignItems: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => removePlayer(index)}
              style={{ minWidth: "100%" }}
            >
              -
            </Button>
          </Grid>
        </React.Fragment>
      ))}

      <Grid xs={6}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
        </FormControl>
      </Grid>

      <Grid xs={4}>
        <FormControl sx={{ height: "100%" }}>
          <FormLabel>Color</FormLabel>
          <Select
            sx={{ height: "100%" }}
            value={color}
            onChange={(_, value) => setColor(value)}
          >
            {remainingColors.map((color) => (
              <Option value={color}>{color}</Option>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid xs={2} style={{ display: "flex", alignItems: "flex-end" }}>
        <Button
          variant="contained"
          onClick={addPlayer}
          style={{ minWidth: "100%" }}
        >
          +
        </Button>
      </Grid>

      <Grid xs={12} textAlign={"center"}>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Grid>
    </Grid>
  );
}

export default CreateGame;

import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Option,
  Select,
} from "@mui/joy";

const COLOR = {
  red: "#8B0000",
  blue: "#00008B",
  green: "#00FF00",
  brown: "#006400",
};

function GameConfig({ setup }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [players, setPlayers] = useState([]);
  const [duration, setDuration] = useState(30);
  const [increment, setIncrement] = useState(0);

  const addPlayer = () => {
    if (name && color) {
      setPlayers([...players, { name, color }]);
      setName("");
      setColor("#000000");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setup({
      initialTime: duration * 60,
      increment,
      isRunning: false,
      activePlayerIndex: 0,
      turnStartTime: null,
      players: players.map((player) => ({
        name: player.title,
        color: player.color,
        remainingTime: duration * 60,
      })),
    });
  };

  const pickedColors = players.map((player) => player.color);
  const remainingColors = Object.keys(COLOR).filter(
    (color) => !pickedColors.some((pickedColor) => pickedColor === color),
  );

  console.log(players);

  return (
    <Grid
      container
      margin={2}
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
    >
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
        <FormControl>
          <FormLabel>Players</FormLabel>
        </FormControl>
      </Grid>

      {players.map((player) => (
        <React.Fragment>
          <Grid xs={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                fullWidth
                label="Name"
                value={player.name}
                disabled={true}
                // onChange={(e) => setName(e.target.value)}
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
                disabled={true}
              ></Select>
            </FormControl>
          </Grid>
          <Grid xs={2}></Grid>
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
          <Select sx={{ height: "100%" }} defaultValue={remainingColors[0]}>
            {remainingColors.map((color) => (
              <Option value={color}>{color}</Option>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid>
        <Button onClick={addPlayer}>+</Button>
      </Grid>

      <Grid xs={12} textAlign={"center"}>
        <Button type="submit">Start</Button>
      </Grid>
    </Grid>
  );
}

export default GameConfig;

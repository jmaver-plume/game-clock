import React, {useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [players, setPlayers] = useState([]);
  const [duration, setDuration] = useState(30);
  const [increment, setIncrement] = useState(0);

  const addPlayer = () => {
    if (name && color) {
      setPlayers([...players, { name, color }]);
      setName('');
      setColor('#000000');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Start Game');
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }} component='form' onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Configure Game Clock</Typography>
      <TextField
        fullWidth
        label="Initial Duration (minutes)"
        type={'number'}
        variant="outlined"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        margin="normal"
        required={true}
      />
      <TextField
        fullWidth
        label="Increment (seconds)"
        type={'number'}
        variant="outlined"
        value={increment}
        onChange={(e) => setIncrement(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <FormControl required={true} fullWidth variant="outlined" margin="normal">
        <InputLabel id="color-label">Color</InputLabel>
        <Select
          labelId="color-label"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          label="Color"
        >
          <MenuItem value="#000000">Black</MenuItem>
          <MenuItem value="#FF0000">Red</MenuItem>
          <MenuItem value="#00FF00">Green</MenuItem>
          <MenuItem value="#0000FF">Blue</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={addPlayer}>
        Add Player
      </Button>

      <Typography variant="h6" gutterBottom>Players</Typography>
      {players.map((player, index) => (
        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography>{player.name}</Typography>
          <Box width={24} height={24} bgcolor={player.color} />
        </Box>
      ))}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Start
      </Button>
    </Box>
  );
}

export default App;


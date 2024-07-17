import React, { useEffect } from "react";
import { Game } from "./Game";
import CreateGame from "./CreateGame";
import Header from "./Header";

function App() {
  const initialState = {
    initialTime: 1800,
    increment: 0,
    isRunning: false,
    activePlayerIndex: 0,
    time: null,
    players: [
      { color: "#FF0000", remainingTime: 1800 },
      { color: "#0000FF", remainingTime: 1800 },
      { color: "#0000FF", remainingTime: 1800 },
      { color: "#00FF00", remainingTime: 1800 },
    ],
  };
  const [state, setState] = React.useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!state) {
        return;
      }

      if (!state.isRunning) {
        return;
      }

      setState((state) => {
        const time = Date.now();
        const players = state.players.map((player, index) => {
          if (index === state.activePlayerIndex) {
            const elapsedTime = (time - state.time) / 1000;
            return {
              ...player,
              remainingTime: player.remainingTime - elapsedTime,
            };
          }
          return player;
        });

        return {
          ...state,
          time,
          players,
        };
      });
    }, 100);
    return () => clearInterval(interval);
  }, [state]);

  if (state === null) {
    return (
      <React.Fragment>
        <Header />
        <CreateGame setup={setState} />
      </React.Fragment>
    );
  }

  const start = () => {
    setState((state) => {
      return {
        ...state,
        isRunning: true,
        time: Date.now(),
      };
    });
  };

  const pause = () => {
    setState(() => {
      return {
        ...state,
        isRunning: false,
        time: null,
      };
    });
  };

  const next = () => {
    setState(() => {
      // Add increment to the active player's remaining time at the end of their turn
      const players = state.players.map((player, index) => {
        if (index === state.activePlayerIndex) {
          return {
            ...player,
            remainingTime: player.remainingTime + state.increment,
          };
        }
        return player;
      });
      const nextPlayerIndex =
        (state.activePlayerIndex + 1) % state.players.length;
      return {
        ...state,
        time: Date.now(),
        activePlayerIndex: nextPlayerIndex,
        players,
      };
    });
  };

  return (
    <React.Fragment>
      <Header />
      <Game state={state} start={start} pause={pause} next={next} />
    </React.Fragment>
  );
}

export default App;

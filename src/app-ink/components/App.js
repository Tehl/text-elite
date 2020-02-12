import React from "react";
import { Box } from "ink";
import Prompt from "./Prompt/Container";
import PlayerOverview from "./PlayerOverview/Container";
import { USER_COMMAND } from "/logic/events/events";

const App = ({ eventBus }) => {
  const onCommand = command => eventBus.send(USER_COMMAND, { command });

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Box width="50%"></Box>
        <Box width="50%">
          <PlayerOverview />
        </Box>
      </Box>
      <Prompt onCommand={onCommand} />
    </Box>
  );
};

export default App;

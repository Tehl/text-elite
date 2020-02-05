import React from "react";
import { Box } from "ink";
import Prompt from "./Prompt/Container";
import MarketInfo from "./MarketInfo/Container";
import { USER_COMMAND } from "/logic/events/events";

const App = ({ eventBus }) => {
  const onCommand = command => eventBus.send(USER_COMMAND, { command });

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Box width="50%"></Box>
        <Box width="50%">
          <MarketInfo />
        </Box>
      </Box>
      <Prompt onCommand={onCommand} />
    </Box>
  );
};

export default App;

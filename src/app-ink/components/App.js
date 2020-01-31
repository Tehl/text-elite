import React from "react";
import Prompt from "./Prompt/Container";
import { USER_COMMAND } from "/logic/events/events";

const App = ({ eventBus }) => {
  const onCommand = command => eventBus.send(USER_COMMAND, { command });

  return <Prompt onCommand={onCommand} />;
};

export default App;

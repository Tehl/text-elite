const COMMAND_QUIT = "COMMAND_QUIT";

function onQuitCommand(state, eventBus, event) {
  // exit the application
  process.exit(0);
}

export const commandParser = {
  name: "quit",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_QUIT, {});
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_QUIT, serviceProvider(onQuitCommand));
};

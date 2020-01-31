import { USER_COMMAND } from "/logic/events/events";

function onUserCommand(parser) {
  return (state, eventBus, event) => {
    const command = parser(event.command);
    command(state, eventBus);
  };
}

function registerEvents(eventBus, serviceProvider, parser) {
  eventBus.take(USER_COMMAND, serviceProvider(onUserCommand(parser)));
}

export { registerEvents };

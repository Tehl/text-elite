import { DISPLAY_FEEDBACK_FAILURE, ADD_CASH } from "../events/events";

const COMMAND_CASH = "COMMAND_CASH";

function onCashCommand(state, eventBus, event) {
  eventBus.send(ADD_CASH, { value: event.cashValue * 10 });
}

export const commandParser = {
  name: "cash",
  createCommand: args => (state, eventBus) => {
    const cashValue = parseInt(args, 10);
    if (isNaN(cashValue)) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Number not understood"
      });
      return false;
    }

    eventBus.send(COMMAND_CASH, { cashValue });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_CASH, serviceProvider(onCashCommand));
};

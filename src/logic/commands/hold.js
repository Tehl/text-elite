import { DISPLAY_FEEDBACK_FAILURE, SET_HOLD_SIZE } from "../events/events";

const COMMAND_HOLD = "COMMAND_HOLD";

function onHoldCommand(state, eventBus, event) {
  eventBus.send(SET_HOLD_SIZE, { value: event.holdSize });
}

export const commandParser = {
  name: "hold",
  createCommand: args => (state, eventBus) => {
    const holdSize = parseInt(args, 10);
    if (isNaN(holdSize)) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Number not understood"
      });
      return false;
    }

    // todo: validate available space
    if (false) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Hold too full"
      });
      return false;
    }

    eventBus.send(COMMAND_HOLD, { holdSize });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_HOLD, serviceProvider(onHoldCommand));
};

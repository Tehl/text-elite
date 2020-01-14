import { PLAYER_SET_HOLD_SIZE } from "../../state/player/holdSize";

const COMMAND_HOLD = "COMMAND_HOLD";

function onHoldCommand(state, eventBus, event) {
  eventBus.send(PLAYER_SET_HOLD_SIZE, { value: event.holdSize });
}

export const commandParser = {
  name: "hold",
  createCommand: args => (state, eventBus) => {
    const holdSize = parseInt(args, 10);
    if (isNaN(holdSize)) {
      console.log("Number not understood");
      return false;
    }

    // todo: validate available space
    if (false) {
      console.log("Hold too full");
      return false;
    }

    eventBus.send(COMMAND_HOLD, { holdSize });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_HOLD, serviceProvider(onHoldCommand));
};

import { PLAYER_SET_HOLD_SIZE } from "../../state/player/holdSize";

export default {
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

    eventBus.send(PLAYER_SET_HOLD_SIZE, { value: holdSize });
    return true;
  }
};

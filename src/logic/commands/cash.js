import { PLAYER_GAINED_CASH } from "../../state/player/cash";

export default {
  name: "cash",
  createCommand: args => (state, eventBus) => {
    const cashValue = parseInt(args, 10);
    if (isNaN(cashValue)) {
      console.log("Number not understood");
      return false;
    }

    eventBus.send(PLAYER_GAINED_CASH, { value: cashValue * 10 });
    return true;
  }
};

import { COMMAND_JUMP } from "./jump";

export const commandParser = {
  name: "sneak",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_JUMP, { systemName: args, sneak: true });
    return true;
  }
};

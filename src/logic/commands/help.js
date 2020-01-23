import { DISPLAY_FEEDBACK_INFO } from "/logic/events/events";

const COMMAND_HELP = "COMMAND_HELP";

function onHelpCommand(state, eventBus, event) {
  eventBus.send(DISPLAY_FEEDBACK_INFO, {
    message: [
      "Commands are:",
      "Buy   tradegood ammount",
      "Sell  tradegood ammount",
      "Fuel  ammount    (buy ammount LY of fuel)",
      "Jump  planetname (limited by fuel)",
      "Sneak planetname (any distance - no fuel cost)",
      "Galhyp           (jumps to next galaxy)",
      "Info  planetname (prints info on system",
      "Mkt              (shows market prices)",
      "Local            (lists systems within 7 light years)",
      "Cash number      (alters cash - cheating!)",
      "Hold number      (change cargo bay)",
      "Quit or ^C       (exit)",
      "Help             (display this text)",
      "Rand             (toggle RNG)",
      "Abbreviations allowed eg. b fo 5 = Buy Food 5, m= Mkt"
    ]
  });
}

export { COMMAND_HELP };

export const commandParser = {
  name: "help",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_HELP, {});
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_HELP, serviceProvider(onHelpCommand));
};

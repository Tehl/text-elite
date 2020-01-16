import { getMarketPrice } from "../../state/selectors";
import { commodities } from "../../data/commodities";
import { DISPLAY_FEEDBACK_INFO } from "../events/events";

const COMMAND_MARKET = "COMMAND_MARKET";

function onMarketCommand(state, eventBus, event) {
  eventBus.send(DISPLAY_FEEDBACK_INFO, {
    message: commodities.map(x => {
      const price = getMarketPrice(state, x.commodityId);
      return `${x.name}   ${(price / 10).toFixed(1)}   ${0}`;
    })
  });
}

export const commandParser = {
  name: "mkt",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_MARKET, {});
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_MARKET, serviceProvider(onMarketCommand));
};

import printf from "printf";
import { getMarketPrice } from "../../state/selectors";
import { commodities } from "../../data/commodities";

const COMMAND_MARKET = "COMMAND_MARKET";

function onMarketCommand(state, eventBus, event) {
  commodities.forEach(x => {
    const price = getMarketPrice(state, x.commodityId);

    console.log(`${x.name}   ${printf("%.1f", price / 10)}   ${0}`);
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

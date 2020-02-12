import {
  getMarketPrice,
  getMarketQuantity,
  getInventoryQuantity,
  getFuel,
  getHoldSpaceAvailable
} from "/state/selectors";
import { commodities } from "/data/commodities";
import { unitNames } from "/data/strings";
import { DISPLAY_FEEDBACK_INFO } from "/logic/events/events";
import { formatPrice, formatFuel } from "/logic/display";

const COMMAND_MARKET = "COMMAND_MARKET";

function onMarketCommand(state, eventBus, event) {
  const commodityData = commodities.map(x => {
    const price = getMarketPrice(state, x.commodityId);
    const displayPrice = formatPrice(price);
    const available = getMarketQuantity(state, x.commodityId);
    const owned = getInventoryQuantity(state, x.commodityId);
    const unit = unitNames[x.units];
    return `${x.name}   ${displayPrice}   ${available}${unit}   ${owned}`;
  });

  const fuel = getFuel(state);
  const displayFuel = formatFuel(fuel);

  const holdSpace = getHoldSpaceAvailable(state);

  const marketInfo = [
    ...commodityData,
    `Fuel :${displayFuel}      Holdspace :${holdSpace}t`
  ];

  eventBus.send(DISPLAY_FEEDBACK_INFO, {
    message: marketInfo
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

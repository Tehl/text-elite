import { getFuel, getCash } from "../../state/selectors";
import {
  DISPLAY_FEEDBACK_FAILURE,
  PURCHASE_FUEL,
  DISPLAY_FEEDBACK_SUCCESS
} from "../events/events";
import rules from "../rules";

const COMMAND_FUEL = "COMMAND_FUEL";

function onFuelCommand(state, eventBus, event) {
  const currentFuel = getFuel(state);
  const currentCash = getCash(state);
  const requestedAmount = Math.floor(event.amount * 10);

  const purchaseAmount = Math.min(
    requestedAmount,
    rules.maxFuel - currentFuel,
    Math.floor(currentCash / rules.fuelCost)
  );

  if (purchaseAmount <= 0) {
    eventBus.send(DISPLAY_FEEDBACK_FAILURE, { message: "Can't buy any fuel" });
    return;
  }

  const purchasePrice = purchaseAmount * rules.fuelCost;

  eventBus.send(PURCHASE_FUEL, {
    fuelAmount: purchaseAmount,
    fuelPrice: purchasePrice
  });

  eventBus.send(DISPLAY_FEEDBACK_SUCCESS, {
    message: `Buying ${(purchaseAmount / 10).toFixed(1)}LY fuel`
  });
}

export const commandParser = {
  name: "fuel",
  createCommand: args => (state, eventBus) => {
    const amount = parseFloat(args);
    if (isNaN(amount)) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Number not understood"
      });
      return false;
    }

    eventBus.send(COMMAND_FUEL, { amount });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_FUEL, serviceProvider(onFuelCommand));
};

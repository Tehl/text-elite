import { getMarketPrice, getInventoryQuantity } from "../../state/selectors";
import {
  SELL_TO_MARKET,
  DISPLAY_FEEDBACK_FAILURE,
  DISPLAY_FEEDBACK_SUCCESS
} from "../events/events";
import { stringSplit, stringBeginsWith } from "../../utility/strings";
import { commodities } from "../../data/commodities";
import { unitNames } from "../../data/strings";

const COMMAND_SELL = "COMMAND_SELL";

function onSellCommand(state, eventBus, event) {
  let commodity;
  if (event.commodityName) {
    commodity = commodities.find(x =>
      stringBeginsWith(x.name, event.commodityName)
    );
  }

  if (!commodity) {
    eventBus.send(DISPLAY_FEEDBACK_FAILURE, { message: "Unknown trade good" });
    return;
  }

  const commodityId = commodity.commodityId;

  const requestedQuantity = event.quantity;
  const ownedQuantity = getInventoryQuantity(state, commodityId);

  const saleQuantity = Math.min(requestedQuantity, ownedQuantity);

  if (saleQuantity <= 0) {
    eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
      message: `Can't sell any ${commodity.name}`
    });
    return;
  }

  const marketPrice = getMarketPrice(state, commodityId);
  const salePrice = saleQuantity * marketPrice;

  eventBus.send(SELL_TO_MARKET, {
    commodityId: commodity.commodityId,
    quantity: saleQuantity,
    price: salePrice
  });

  const unit = unitNames[commodity.units];
  eventBus.send(DISPLAY_FEEDBACK_SUCCESS, {
    message: `Selling ${saleQuantity}${unit} of ${commodity.name}`
  });
}

export const commandParser = {
  name: "sell",
  createCommand: args => (state, eventBus) => {
    const [argCommodity, argQuantity] = stringSplit(args, " ");

    const quantity = parseInt(argQuantity, 10);
    if (isNaN(quantity)) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Number not understood"
      });
      return false;
    }

    eventBus.send(COMMAND_SELL, {
      commodityName: argCommodity,
      quantity
    });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_SELL, serviceProvider(onSellCommand));
};

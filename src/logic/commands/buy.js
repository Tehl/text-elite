import {
  getCash,
  getMarketPrice,
  getMarketQuantity
} from "../../state/selectors";
import {
  BUY_FROM_MARKET,
  DISPLAY_FEEDBACK_FAILURE,
  DISPLAY_FEEDBACK_SUCCESS
} from "../events/events";
import { stringSplit, stringBeginsWith } from "../../utility/strings";
import { commodities } from "../../data/commodities";
import { unitNames } from "../../data/strings";

const COMMAND_BUY = "COMMAND_BUY";

function onBuyCommand(state, eventBus, event) {
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
  const availableQuantity = getMarketQuantity(state, commodityId);

  const currentCash = getCash(state);
  const marketPrice = getMarketPrice(state, commodityId);
  const affordableQuantity = Math.floor(currentCash / marketPrice);

  const purchaseQuantity = Math.min(
    requestedQuantity,
    availableQuantity,
    affordableQuantity
  );

  if (purchaseQuantity <= 0) {
    eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
      message: `Can't buy any ${commodity.name}`
    });
    return;
  }

  const purchasePrice = purchaseQuantity * marketPrice;

  eventBus.send(BUY_FROM_MARKET, {
    commodityId: commodity.commodityId,
    quantity: purchaseQuantity,
    price: purchasePrice
  });

  const unit = unitNames[commodity.units];
  eventBus.send(DISPLAY_FEEDBACK_SUCCESS, {
    message: `Buying ${purchaseQuantity}${unit} of ${commodity.name}`
  });
}

export const commandParser = {
  name: "buy",
  createCommand: args => (state, eventBus) => {
    const [argCommodity, argQuantity] = stringSplit(args, " ");

    const quantity = parseInt(argQuantity, 10);
    if (isNaN(quantity)) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Number not understood"
      });
      return false;
    }

    eventBus.send(COMMAND_BUY, {
      commodityName: argCommodity,
      quantity
    });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_BUY, serviceProvider(onBuyCommand));
};

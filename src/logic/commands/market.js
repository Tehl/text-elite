import printf from "printf";
import { getMarketPrice } from "../../state/selectors";
import { commodities } from "../../data/commodities";

export default {
  name: "mkt",
  createCommand: args => (state, eventBus) => {
    commodities.forEach(x => {
      const price = getMarketPrice(state, x.commodityId);

      console.log(`${x.name}   ${printf("%.1f", price / 10)}   ${0}`);
    });

    return true;
  }
};

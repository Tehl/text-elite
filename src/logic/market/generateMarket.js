import { commodities } from "/data/commodities";

// ref: genmarket()
// generates price data for a commodity
function getPrice(base, changing, product) {
  let price = base + changing + product;
  price = price & 0xff;
  price = price * 4;
  return price;
}

// ref: genmarket()
// generates quantity data for a commodity
function getQuantity(base, changing, product) {
  let quantity = base + changing - product;

  // clip to positive 8-bit
  quantity = quantity & 0xff;
  if (quantity & 0x80) {
    quantity = 0;
  }

  // mask to 6 bits
  quantity = quantity & 0x3f;

  return quantity;
}

// ref: genmarket()
// generates price and quantity data for a commodity
// using the given economy size and a fluctuation byte
// which represents the change in markets over time
function getCommodityData(commodity, economy, fluctuation) {
  const product = economy * commodity.gradient;
  const changing = fluctuation & commodity.maskbyte;

  const price = getPrice(commodity.baseprice, changing, product);

  const quantity = commodity.availableToBuy
    ? getQuantity(commodity.basequant, changing, product)
    : 0;

  return {
    price,
    quantity
  };
}

// generates market data for a system
function generateMarket(systemInfo, fluctuation) {
  return commodities.map(x => ({
    commodityId: x.commodityId,
    ...getCommodityData(x, systemInfo.economy, fluctuation)
  }));
}

export default generateMarket;

export const _internals = { getCommodityData };

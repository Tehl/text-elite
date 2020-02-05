import { connect } from "react-redux";
import MarketInfoItem from "./MarketInfoItem";
import {
  getMarketPrice,
  getMarketQuantity,
  getInventoryQuantity
} from "/state/selectors";

const mapStateToProps = (state, { commodity }) => ({
  name: commodity.name,
  units: commodity.units,
  price: getMarketPrice(state, commodity.commodityId),
  available: getMarketQuantity(state, commodity.commodityId),
  owned: getInventoryQuantity(state, commodity.commodityId)
});

const MarketInfoItemContainer = connect(mapStateToProps)(MarketInfoItem);

export default MarketInfoItemContainer;

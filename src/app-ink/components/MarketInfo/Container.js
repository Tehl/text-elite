import { connect } from "react-redux";
import MarketInfo from "./MarketInfo";
import { getFuel, getHoldSpaceAvailable } from "/state/selectors";
import { commodities } from "/data/commodities";

const mapStateToProps = state => ({
  commodities,
  fuel: getFuel(state),
  holdSpace: getHoldSpaceAvailable(state)
});

const MarketInfoContainer = connect(mapStateToProps)(MarketInfo);

export default MarketInfoContainer;

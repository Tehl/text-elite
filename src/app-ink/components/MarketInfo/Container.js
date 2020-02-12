import { connect } from "react-redux";
import MarketInfo from "./MarketInfo";
import { commodities } from "/data/commodities";

const mapStateToProps = state => ({
  commodities
});

const MarketInfoContainer = connect(mapStateToProps)(MarketInfo);

export default MarketInfoContainer;

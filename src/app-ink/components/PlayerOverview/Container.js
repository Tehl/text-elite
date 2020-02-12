import { connect } from "react-redux";
import PlayerOverview from "./PlayerOverview";
import {
  getCurrentSystem,
  getGalaxyInfo,
  getCash,
  getFuel,
  getHoldSize,
  getHoldSpaceAvailable
} from "/state/selectors";

const mapStateToProps = state => ({
  systemInfo: getGalaxyInfo(state)[getCurrentSystem(state)],
  cash: getCash(state),
  fuel: getFuel(state),
  holdSize: getHoldSize(state),
  holdSpace: getHoldSpaceAvailable(state)
});

const PlayerOverviewContainer = connect(mapStateToProps)(PlayerOverview);

export default PlayerOverviewContainer;

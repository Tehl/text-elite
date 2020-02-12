import React from "react";
import { Box } from "ink";
import MarketInfo from "../MarketInfo/Container";

const PlayerOverview = ({ systemInfo, cash, fuel, holdSize, holdSpace }) => (
  <Box flexDirection="column">
    <Box>System: {systemInfo.name}</Box>
    <Box>Cash: {(cash / 10).toFixed(1)}</Box>
    <Box>Fuel: {(fuel / 10).toFixed(1)} LY</Box>
    <Box>
      Hold Space: {holdSpace} / {holdSize} t
    </Box>
    <Box>----------</Box>
    <MarketInfo />
  </Box>
);

export default PlayerOverview;

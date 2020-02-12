import React from "react";
import { Box } from "ink";
import { formatCash, formatFuel } from "/logic/display";
import MarketInfo from "../MarketInfo/Container";

const PlayerOverview = ({ systemInfo, cash, fuel, holdSize, holdSpace }) => (
  <Box flexDirection="column">
    <Box>System: {systemInfo.name}</Box>
    <Box>Cash: {formatCash(cash)}</Box>
    <Box>Fuel: {formatFuel(fuel)} LY</Box>
    <Box>
      Hold Space: {holdSpace} / {holdSize} t
    </Box>
    <Box>----------</Box>
    <MarketInfo />
  </Box>
);

export default PlayerOverview;

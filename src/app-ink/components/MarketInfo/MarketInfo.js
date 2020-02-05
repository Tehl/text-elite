import React from "react";
import { Box } from "ink";
import MarketInfoItem from "./MarketInfoItem/Container";

const MarketInfo = ({ commodities, fuel, holdSpace }) => (
  <Box flexDirection="column">
    <Box flexDirection="row">
      <Box width="17">Fuel: {(fuel / 10).toFixed(1)}</Box>
      <Box width="17">Hold Space: {holdSpace}t</Box>
    </Box>
    {commodities.map(x => (
      <MarketInfoItem key={x.commodityId.toString()} commodity={x} />
    ))}
  </Box>
);

export default MarketInfo;

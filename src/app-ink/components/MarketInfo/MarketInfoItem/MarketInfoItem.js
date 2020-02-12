import React from "react";
import { Box } from "ink";
import { unitNames } from "/data/strings";
import columnSize from "../columnSize";

const MarketInfoItem = ({ name, price, available, owned, units }) => (
  <Box flexDirection="row">
    <Box width={columnSize.name}>{name}</Box>
    <Box width={columnSize.price} justifyContent="flex-end">
      {(price / 10).toFixed(1)}
    </Box>
    <Box width={columnSize.available} justifyContent="flex-end">
      {available}
      {unitNames[units]}
    </Box>
    <Box width={columnSize.owned} justifyContent="flex-end">
      {owned}
      {unitNames[units]}
    </Box>
  </Box>
);

export default MarketInfoItem;

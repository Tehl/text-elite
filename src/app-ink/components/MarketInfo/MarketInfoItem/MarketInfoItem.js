import React from "react";
import { Box } from "ink";
import { unitNames } from "/data/strings";

const MarketInfoItem = ({ name, price, available, owned, units }) => (
  <Box flexDirection="row">
    <Box width="16">{name}</Box>
    <Box width="6" justifyContent="flex-end">
      {(price / 10).toFixed(1)}
    </Box>
    <Box width="6" justifyContent="flex-end">
      {available}
      {unitNames[units]}
    </Box>
    <Box width="6" justifyContent="flex-end">
      {owned}
      {unitNames[units]}
    </Box>
  </Box>
);

export default MarketInfoItem;

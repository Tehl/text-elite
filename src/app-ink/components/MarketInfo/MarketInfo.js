import React from "react";
import { Box } from "ink";
import MarketInfoItem from "./MarketInfoItem/Container";
import columnSize from "./columnSize";

const MarketInfo = ({ commodities }) => (
  <Box flexDirection="column" width={columnSize.total}>
    <Box flexDirection="row">
      <Box width={columnSize.name}>Commodity</Box>
      <Box width={columnSize.price} justifyContent="flex-end">
        Price
      </Box>
      <Box width={columnSize.available} justifyContent="flex-end">
        Mkt
      </Box>
      <Box width={columnSize.owned} justifyContent="flex-end">
        Own
      </Box>
    </Box>
    {commodities.map(x => (
      <MarketInfoItem key={x.commodityId.toString()} commodity={x} />
    ))}
  </Box>
);

export default MarketInfo;

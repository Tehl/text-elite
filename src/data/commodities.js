// ref: tradegood
function commodity(
  baseprice,
  gradient,
  basequant,
  maskbyte,
  units,
  name,
  availableToBuy
) {
  this.baseprice = baseprice;
  this.gradient = gradient;
  this.basequant = basequant;
  this.maskbyte = maskbyte;
  this.units = units;
  this.name = name;
  this.availableToBuy = availableToBuy;
}

// ref: commodities
/* Data for DB's price/availability generation system */
/*              Base  Grad   Base  Mask Un  Name            Available?
                price ient   quant      it             */

const commodities = [
  new commodity(0x13, -0x02, 0x06, 0x01, 0, "Food        ", true),
  new commodity(0x14, -0x01, 0x0a, 0x03, 0, "Textiles    ", true),
  new commodity(0x41, -0x03, 0x02, 0x07, 0, "Radioactives", true),
  new commodity(0x28, -0x05, 0xe2, 0x1f, 0, "Slaves      ", true),
  new commodity(0x53, -0x05, 0xfb, 0x0f, 0, "Liquor/Wines", true),
  new commodity(0xc4, +0x08, 0x36, 0x03, 0, "Luxuries    ", true),
  new commodity(0xeb, +0x1d, 0x08, 0x78, 0, "Narcotics   ", true),
  new commodity(0x9a, +0x0e, 0x38, 0x03, 0, "Computers   ", true),
  new commodity(0x75, +0x06, 0x28, 0x07, 0, "Machinery   ", true),
  new commodity(0x4e, +0x01, 0x11, 0x1f, 0, "Alloys      ", true),
  new commodity(0x7c, +0x0d, 0x1d, 0x07, 0, "Firearms    ", true),
  new commodity(0xb0, -0x09, 0xdc, 0x3f, 0, "Furs        ", true),
  new commodity(0x20, -0x01, 0x35, 0x03, 0, "Minerals    ", true),
  new commodity(0x61, -0x01, 0x42, 0x07, 1, "Gold        ", true),
  new commodity(0xab, -0x02, 0x37, 0x1f, 1, "Platinum    ", true),
  new commodity(0x2d, -0x01, 0xfa, 0x0f, 2, "Gem-Strones ", true),
  new commodity(0x35, +0x0f, 0xc0, 0x07, 0, "Alien Items ", false)
];

commodities.forEach((x, idx) => (x.commodityId = idx));

export { commodities };

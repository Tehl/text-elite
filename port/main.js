const readline = require("readline");
const c_string = require("./c_string");
const { uint16_t, int32_t } = require("./c_types");
const _printf = require("./printf");

const floor = Math.floor.bind(Math);
const sqrt = Math.sqrt.bind(Math);

const charMap = {
  a: "a".charCodeAt(0),
  z: "z".charCodeAt(0),
  A: "A".charCodeAt(0),
  Z: "Z".charCodeAt(0)
};

function printf() {
  const args = Array.prototype.map.call(arguments, x => {
    if (x instanceof c_string) {
      return x.toString();
    }
    return x;
  });
  process.stdout.write(_printf.apply(_printf, args));
}

function atof(value) {
  let result = parseFloat(value);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

function atoi(value) {
  let result = parseInt(value, 10);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

function allocArray(length, value) {
  return Array(length).fill(value || 0);
}

/* js port of: */
/* txtelite.c  1.5 */
/* Textual version of Elite trading (C implementation) */
/* Converted by Ian Bell from 6502 Elite sources.
   Original 6502 Elite by Ian Bell & David Braben. */

/* 
typedef unsigned char uint8;
typedef unsigned short uint16;
typedef signed short int16;
typedef signed long int32;
*/

/* define */ const tonnes = 0;
/* define */ const maxlen = 20; /* Length of strings */

/* four byte random number used for planet description */
function fastseedtype(a, b, c, d) {
  /* uint8 */ this.a = a || 0;
  /* uint8 */ this.b = b || 0;
  /* uint8 */ this.c = c || 0;
  /* uint8 */ this.d = d || 0;
}

fastseedtype.prototype.clone = function() {
  return new fastseedtype(this.a, this.b, this.c, this.d);
};

/* six byte random number used as seed for planets */
function seedtype() {
  /* uint16 */ this.w0 = 0;
  /* uint16 */ this.w1 = 0;
  /* uint16 */ this.w2 = 0;
}

function plansys() {
  /* uint16 */ this.x = 0;
  /* uint16 */ this.y = 0; /*             One byte unsigned */
  /* uint16 */ this.economy = 0; /*       These two are actually only 0-7  */
  /* uint16 */ this.govtype = 0;
  /* uint16 */ this.techlev = 0; /*       0-16 i think */
  /* uint16 */ this.population = 0; /*    One byte */
  /* uint16 */ this.productivity = 0; /*  Two byte */
  /* uint16 */ this.radius = 0; /*        Two byte (not used by game at all) */
  /* fastseedtype */ this.goatsoupseed = new fastseedtype();
  /* c_string */ this.name = new c_string(12);
}

/* define */ const galsize = 256;
/* define */ const AlienItems = 16;
/* define */ const lasttrade = AlienItems;

/* define */ const numforLave = 7; /* Lave is 7th generated planet in galaxy one */
/* define */ const numforZaonce = 129;
/* define */ const numforDiso = 147;
/* define */ const numforRied = 46;

/* plansys[] */ const galaxy = allocArray(galsize, null);
/* seedtype */ const seed = new seedtype();
/* fastseedtype */ let rnd_seed = new fastseedtype();

function tradegood(baseprice, gradient, basequant, maskbyte, units, name) {
  /*                                                In 6502 version these were: */
  /* uint16 */ this.baseprice = baseprice; /*           one byte */
  /* int16 */ this.gradient = gradient; /*            five bits plus sign */
  /* uint16 */ this.basequant = basequant; /*           one byte */
  /* uint16 */ this.maskbyte = maskbyte; /*             one byte */
  /* uint16 */ this.units = units; /*                   two bits */
  /* c_string */ this.name = c_string.from(name); /*  longest="Radioactives" */
}

function markettype() {
  /* uint16[] */ this.quantity = allocArray(lasttrade + 1);
  /* uint16[] */ this.price = allocArray(lasttrade + 1);
}

/* Player workspace */
// prettier-ignore
/* uint16[] */ const shipshold = allocArray(lasttrade + 1); /* Contents of cargo bay */
/* int */ let currentplanet; /* Current planet */
/* uint16 */ let galaxynum; /* Galaxy number (1-8) */
/* int32 */ let cash = 0;
/* uint16 */ let fuel = 0;
/* markettype */ let localmarket;
/* uint16 */ let holdspace = 0;

/* int */ const fuelcost = 2; /* 0.2 CR/Light year */
/* int */ const maxfuel = 70; /* 7.0 LY tank */

/* uint16 */ const base0 = 0x5a4a;
/* uint16 */ const base1 = 0x0248;
/* uint16 */ const base2 = 0xb753; /* Base seed for galaxy 1 */

// 1.5 planet names fix
/* c_string */ const pairs0 = c_string.from(
  "ABOUSEITILETSTONLONUTHNOALLEXEGEZACEBISOUSESARMAINDIREA.ERATENBERALAVETIEDORQUANTEISRION"
);

/* c_string */ const pairs = c_string.from(
  "..LEXEGEZACEBISO" +
    "USESARMAINDIREA." +
    "ERATENBERALAVETI" +
    "EDORQUANTEISRION" /*   Dots should be nullprint characters */
);

/* string[] */ const govnames = [
  "Anarchy",
  "Feudal",
  "Multi-gov",
  "Dictatorship",
  "Communist",
  "Confederacy",
  "Democracy",
  "Corporate State"
];

/* string[] */ const econnames = [
  "Rich Ind",
  "Average Ind",
  "Poor Ind",
  "Mainly Ind",
  "Mainly Agri",
  "Rich Agri",
  "Average Agri",
  "Poor Agri"
];

/* string[] */ const unitnames = ["t", "kg", "g"];

/* Data for DB's price/availability generation system */
/*              Base  Grad   Base  Mask Un  Name
                price ient   quant      it             */

/* tradegood[] */ const commodities = [
  new tradegood(0x13, -0x02, 0x06, 0x01, 0, "Food        "),
  new tradegood(0x14, -0x01, 0x0a, 0x03, 0, "Textiles    "),
  new tradegood(0x41, -0x03, 0x02, 0x07, 0, "Radioactives"),
  new tradegood(0x28, -0x05, 0xe2, 0x1f, 0, "Slaves      "),
  new tradegood(0x53, -0x05, 0xfb, 0x0f, 0, "Liquor/Wines"),
  new tradegood(0xc4, +0x08, 0x36, 0x03, 0, "Luxuries    "),
  new tradegood(0xeb, +0x1d, 0x08, 0x78, 0, "Narcotics   "),
  new tradegood(0x9a, +0x0e, 0x38, 0x03, 0, "Computers   "),
  new tradegood(0x75, +0x06, 0x28, 0x07, 0, "Machinery   "),
  new tradegood(0x4e, +0x01, 0x11, 0x1f, 0, "Alloys      "),
  new tradegood(0x7c, +0x0d, 0x1d, 0x07, 0, "Firearms    "),
  new tradegood(0xb0, -0x09, 0xdc, 0x3f, 0, "Furs        "),
  new tradegood(0x20, -0x01, 0x35, 0x03, 0, "Minerals    "),
  new tradegood(0x61, -0x01, 0x42, 0x07, 1, "Gold        "),
  new tradegood(0xab, -0x02, 0x37, 0x1f, 1, "Platinum    "),
  new tradegood(0x2d, -0x01, 0xfa, 0x0f, 2, "Gem-Strones "),
  new tradegood(0x35, +0x0f, 0xc0, 0x07, 0, "Alien Items ")
];

/**-Required data for text interface **/
/* c_string[] */ const tradnames = commodities.map(
  x => x.name
); /* Tradegood names used in text commands
      Set using commodities array */

/* define */ const nocomms = 14;

/* c_string[] */ const commands = [
  "buy",
  "sell",
  "fuel",
  "jump",
  "cash",
  "mkt",
  "help",
  "hold",
  "sneak",
  "local",
  "info",
  "galhyp",
  "quit",
  "rand"
].map(c_string.from);

/* function[] */ const comfuncs = [
  dobuy,
  dosell,
  dofuel,
  dojump,
  docash,
  domkt,
  dohelp,
  dohold,
  dosneak,
  dolocal,
  doinfo,
  dogalhyp,
  doquit,
  dotweakrand
];

/**- General functions **/

/* unsigned int */ let lastrand = 0;

function /* void */ mysrand(/* unsigned int */ seed) {
  lastrand = seed - 1;
}

function /* int */ myrand(/* void */) {
  /* int */ let r;
  // prettier-ignore
  // As supplied by D McDonnell	from SAS Insititute C
  r = (((((((((((lastrand << 3) - lastrand) << 3)
      + lastrand) << 1) + lastrand) << 4)
      - lastrand) << 1) - lastrand) + 0xe60)
      & 0x7fffffff;
  lastrand = r - 1;
  return r;
}

function /* char */ randbyte() {
  return String(myrand() & 0xff);
}

function /* uint16 */ mymin(/* uint16 */ a, /* uint16 */ b) {
  if (a < b) return a;
  else return b;
}

/**+  ftoi **/
function /* signed int */ ftoi(/* double */ value) {
  return floor(value + 0.5);
}

/**+  ftoi2 **/
function /* signed int */ ftoi2(/* double */ value) {
  return floor(value);
}

function /* void */ tweakseed(/* seedtype */ s) {
  /* uint16 */ let temp;
  temp = uint16_t(s.w0 + uint16_t(s.w1 + s.w2)); /* 2 byte aritmetic */
  s.w0 = s.w1;
  s.w1 = s.w2;
  s.w2 = temp;
}

/**-String functions for text interface **/

/* Remove all c's from string s */
function /* void */ stripout(/* c_string */ s, /* char */ c) {
  /* size_t */ let i = 0;
  /* size_t */ let j = 0;
  while (i < s.strlen()) {
    if (s.getChar(i) != c[0]) {
      s.setChar(j, s.getChar(i));
      j++;
    }
    i++;
  }
  s.set(j, 0);
}

function /* int */ toupper(/* int */ c) {
  if (c >= charMap.a && c <= charMap.z) {
    return c + charMap.A - charMap.a;
  }
  return c;
}

function /* int */ tolower(/* int */ c) {
  if (c >= charMap.A && c <= charMap.Z) {
    return c + charMap.a - charMap.A;
  }
  return c;
}

/* Return nonzero iff string t begins with non-empty string s */
function /* int */ stringbeg(/* c_string */ s, /* c_string */ t) {
  /* size_t */ let i = 0;
  /* size_t */ let l = s.strlen();
  if (l > 0) {
    while ((i < l) & (toupper(s.get(i)) == toupper(t.get(i)))) i++;
    if (i == l) return true;
  }
  return false;
}

/* Check string s against n options in string array a
   If matches ith element return i+1 else return 0 */
function /* uint16 */ stringmatch(
  /* c_string */ s,
  /* c_string[] */ a,
  /* uint16 */ n
) {
  /* uint16 */ let i = 0;
  while (i < n) {
    if (stringbeg(s, a[i])) return i + 1;
    i++;
  }
  return 0;
}

/* Split string s at first space, returning first 'word' in t & shortening s */
function /* void */ spacesplit(/* c_string */ s, /* c_string */ t) {
  /* size_t */ let i = 0;
  /* size_t */ let j = 0;
  /* size_t */ let l = s.strlen();
  while ((i < l) & (s.getChar(i) == " ")) i++; /* Strip leading spaces */
  if (i == l) {
    s.set(0, 0);
    t.set(0, 0);
    return;
  }
  while ((i < l) & (s.getChar(i) != " ")) t.set(j++, s.get(i++));
  t.set(j, 0);
  i++;
  j = 0;
  while (i < l) s.set(j++, s.get(i++));
  s.set(j, 0);
}

/**-Functions for stock market **/

/* Try to buy ammount a  of good i  Return ammount bought */
/* Cannot buy more than is availble, can afford, or will fit in hold */
function /* uint16 */ gamebuy(/* uint16 */ i, /* uint16 */ a) {
  /* uint16 */ let t;
  if (cash < 0) t = 0;
  else {
    t = mymin(localmarket.quantity[i], a);
    if (commodities[i].units == tonnes) {
      t = mymin(holdspace, t);
    }
    t = mymin(t, floor(cash / localmarket.price[i]));
  }
  shipshold[i] += t;
  localmarket.quantity[i] -= t;
  cash -= t * localmarket.price[i];
  if (commodities[i].units == tonnes) {
    holdspace -= t;
  }
  return t;
}

/* As gamebuy but selling */
function /* uint16 */ gamesell(/* uint16 */ i, /* uint16 */ a) {
  /* uint16 */ let t = mymin(shipshold[i], a);
  shipshold[i] -= t;
  localmarket.quantity[i] += t;
  if (commodities[i].units == tonnes) {
    holdspace += t;
  }
  cash += t * localmarket.price[i];
  return t;
}

/* Prices and availabilities are influenced by the planet's economy type
   (0-7) and a random "fluctuation" byte that was kept within the saved
   commander position to keep the market prices constant over gamesaves.
   Availabilities must be saved with the game since the player alters them
   by buying (and selling(?))

   Almost all operations are one byte only and overflow "errors" are
   extremely frequent and exploited.

   Trade Item prices are held internally in a single byte=true value/4.
   The decimal point in prices is introduced only when printing them.
   Internally, all prices are integers.
   The player's cash is held in four bytes. 
 */
function /* markettype */ genmarket(/* uint16 */ fluct, /* plansys */ p) {
  /* markettype */ let market = new markettype();
  /* unsigned short */ let i;
  for (i = 0; i <= lasttrade; i++) {
    /* signed int */ let q;
    /* signed int */ let product = p.economy * commodities[i].gradient;
    /* signed int */ let changing = fluct & commodities[i].maskbyte;
    q = commodities[i].basequant + changing - product;
    q = q & 0xff;
    if (q & 0x80) {
      q = 0;
    } /* Clip to positive 8-bit */

    market.quantity[i] = q & 0x3f; /* Mask to 6 bits */

    q = commodities[i].baseprice + changing + product;
    q = q & 0xff;
    market.price[i] = q * 4;
  }
  market.quantity[AlienItems] = 0; /* Override to force nonavailability */
  return market;
}

function /* void */ displaymarket(/* markettype */ m) {
  /* unsigned short */ let i;
  for (i = 0; i <= lasttrade; i++) {
    printf("\n");
    printf(commodities[i].name);
    printf("   %.1f", m.price[i] / 10);
    printf("   %u", m.quantity[i]);
    printf(unitnames[commodities[i].units]);
    printf("   %u", shipshold[i]);
  }
}

/**-Generate system info from seed **/

function /* plansys */ makesystem(/* seedtype */ s) {
  /* plansys */ let thissys = new plansys();

  /* uint16 */ let pair1, pair2, pair3, pair4;
  /* uint16 */ let longnameflag = s.w0 & 64;

  thissys.x = s.w1 >> 8;
  thissys.y = s.w0 >> 8;

  thissys.govtype = (s.w1 >> 3) & 7; /* bits 3,4 &5 of w1 */

  thissys.economy = (s.w0 >> 8) & 7; /* bits 8,9 &A of w0 */
  if (thissys.govtype <= 1) {
    thissys.economy = thissys.economy | 2;
  }

  thissys.techlev = ((s.w1 >> 8) & 3) + (thissys.economy ^ 7);
  thissys.techlev += thissys.govtype >> 1;
  if ((thissys.govtype & 1) == 1) thissys.techlev += 1;
  /* C simulation of 6502's LSR then ADC */

  thissys.population = 4 * thissys.techlev + thissys.economy;
  thissys.population += thissys.govtype + 1;

  thissys.productivity = ((thissys.economy ^ 7) + 3) * (thissys.govtype + 4);
  thissys.productivity *= thissys.population * 8;

  thissys.radius = 256 * (((s.w2 >> 8) & 15) + 11) + thissys.x;

  thissys.goatsoupseed.a = s.w1 & 0xff;
  thissys.goatsoupseed.b = s.w1 >> 8;
  thissys.goatsoupseed.c = s.w2 & 0xff;
  thissys.goatsoupseed.d = s.w2 >> 8;

  pair1 = 2 * ((s.w2 >> 8) & 31);
  tweakseed(s);
  pair2 = 2 * ((s.w2 >> 8) & 31);
  tweakseed(s);
  pair3 = 2 * ((s.w2 >> 8) & 31);
  tweakseed(s);
  pair4 = 2 * ((s.w2 >> 8) & 31);
  tweakseed(s);
  /* Always four iterations of random number */

  thissys.name.set(0, pairs.get(pair1));
  thissys.name.set(1, pairs.get(pair1 + 1));
  thissys.name.set(2, pairs.get(pair2));
  thissys.name.set(3, pairs.get(pair2 + 1));
  thissys.name.set(4, pairs.get(pair3));
  thissys.name.set(5, pairs.get(pair3 + 1));

  if (longnameflag) {
    /* bit 6 of ORIGINAL w0 flags a four-pair name */
    thissys.name.set(6, pairs.get(pair4));
    thissys.name.set(7, pairs.get(pair4 + 1));
    thissys.name.set(8, 0);
  } else thissys.name.set(6, 0);
  stripout(thissys.name, ".");

  return thissys;
}

/**+Generate galaxy **/

/* Functions for galactic hyperspace */

/* rotate 8 bit number leftwards */
function /* uint16 */ rotatel(/* uint16 */ x) {
  /* uint16 */ let temp = x & 128;
  return 2 * (x & 127) + (temp >> 7);
}

function /* uint16 */ twist(/* uint16 */ x) {
  return 256 * rotatel(x >> 8) + rotatel(x & 255);
}

/* Apply to base seed; once for galaxy 2  */
/* twice for galaxy 3, etc. */
/* Eighth application gives galaxy 1 again*/
function /* void */ nextgalaxy(/* seedtype */ s) {
  s.w0 = twist(s.w0);
  s.w1 = twist(s.w1);
  s.w2 = twist(s.w2);
}

/* Original game generated from scratch each time info needed */
function /* void */ buildgalaxy(/* uint16 */ galaxynum) {
  /* uint16 */ let syscount;
  /* uint16 */ let galcount;

  seed.w0 = base0;
  seed.w1 = base1;
  seed.w2 = base2;

  /* Initialise seed for galaxy 1 */
  for (galcount = 1; galcount < galaxynum; ++galcount) {
    nextgalaxy(seed);
  }

  /* Put galaxy data into array of structures */
  for (syscount = 0; syscount < galsize; ++syscount) {
    galaxy[syscount] = makesystem(seed);
  }
}

/**-Functions for navigation **/

function /* void */ gamejump(/* int */ i) {
  currentplanet = i;
  localmarket = genmarket(randbyte(), galaxy[i]);
}

/* Seperation between two planets (4*sqrt(X*X+Y*Y/4)) */
function /* uint16 */ distance(/* plansys */ a, /* plansys */ b) {
  // prettier-ignore
  return ftoi(
    4 * sqrt(
      int32_t(
        (a.x - b.x) * (a.x - b.x) + ((a.y - b.y) * (a.y - b.y)) / 4
      )
    )
  );
}

/* Return id of the planet whose name matches passed strinmg
   closest to currentplanet - if none return currentplanet */
function /* int */ matchsys(/* c_string */ s) {
  /* int */ let syscount;
  /* int */ let p = currentplanet;
  /* uint16 */ let d = 9999;
  for (syscount = 0; syscount < galsize; ++syscount) {
    if (stringbeg(s, galaxy[syscount].name)) {
      if (distance(galaxy[syscount], galaxy[currentplanet]) < d) {
        d = distance(galaxy[syscount], galaxy[currentplanet]);
        p = syscount;
      }
    }
  }
  return p;
}

/**-Print data for given system **/
function /* void */ prisys(/* plansys */ plsy, /* bool */ compressed) {
  if (compressed) {
    printf("%10s", plsy.name);
    printf(" TL: %2i ", plsy.techlev + 1);
    printf("%12s", econnames[plsy.economy]);
    printf(" %15s", govnames[plsy.govtype]);
  } else {
    printf("\n\nSystem:  ");
    printf(plsy.name);
    printf("\nPosition (%i,", plsy.x);
    printf("%i)", plsy.y);
    printf("\nEconomy: (%i) ", plsy.economy);
    printf(econnames[plsy.economy]);
    printf("\nGovernment: (%i) ", plsy.govtype);
    printf(govnames[plsy.govtype]);
    printf("\nTech Level: %2i", plsy.techlev + 1);
    printf("\nTurnover: %u", plsy.productivity);
    printf("\nRadius: %u", plsy.radius);
    printf("\nPopulation: %u Billion", plsy.population >> 3);

    rnd_seed = plsy.goatsoupseed.clone();
    printf("\n");
    goat_soup(c_string.from("\x8F is \x97."), plsy);
  }
}

/**-Various command functions **/

function /* bool */ dotweakrand(/* c_string */ s) {
  // not required - native rand() is not supported
}

function /* bool */ dolocal(/* c_string */ s) {
  /* int */ let syscount;
  /* uint16 */ let d;
  printf("Galaxy number %i", galaxynum);
  for (syscount = 0; syscount < galsize; ++syscount) {
    d = distance(galaxy[syscount], galaxy[currentplanet]);
    if (d <= maxfuel) {
      if (d <= fuel) printf("\n * ");
      else printf("\n - ");
      prisys(galaxy[syscount], true);
      printf(" (%.1f LY)", d / 10);
    }
  }
  return true;
}

/* Jump to planet name s */
function /* bool */ dojump(/* c_string */ s) {
  /* uint16 */ let d;
  /* int */ let dest = matchsys(s);
  if (dest == currentplanet) {
    printf("\nBad jump");
    return false;
  }
  d = distance(galaxy[dest], galaxy[currentplanet]);
  if (d > fuel) {
    printf("\nJump to far");
    return false;
  }
  fuel -= d;
  gamejump(dest);
  prisys(galaxy[currentplanet], false);
  return true;
}

/* As dojump but no fuel cost */
function /* bool */ dosneak(/* c_string */ s) {
  /* uint16 */ let fuelkeep = fuel;
  /* bool*/ let b;
  fuel = 666;
  b = dojump(s);
  fuel = fuelkeep;
  return b;
}

/* Jump to next galaxy */
/* Preserve planetnum (eg. if leave 7th planet
   arrive at 7th planet) 
   Classic Elite always jumped to planet nearest (0x60,0x60)
*/
function /* bool */ dogalhyp(/* c_string */ s) {
  galaxynum++;
  if (galaxynum == 9) {
    galaxynum = 1;
  }
  buildgalaxy(galaxynum);
  return true;
}

/* Info on planet */
function /* bool */ doinfo(/* c_string */ s) {
  /* int */ let dest = matchsys(s);
  prisys(galaxy[dest], false);
  return true;
}

function /* bool */ dohold(/* c_string */ s) {
  /* uint16 */ let a = atoi(s);
  /* uint16 */ let t = 0;
  /* uint16 */ let i;
  for (i = 0; i <= lasttrade; ++i) {
    if (commodities[i].units == tonnes) t += shipshold[i];
  }
  if (t > a) {
    printf("\nHold too full");
    return false;
  }
  holdspace = a - t;
  return true;
}

/* Sell ammount S(2) of good S(1) */
function /* bool */ dosell(/* c_string */ s) {
  /* uint16 */ let i;
  /* uint16 */ let a;
  /* uint16 */ let t;
  /* c_string */ let s2 = new c_string(maxlen);
  spacesplit(s, s2);
  a = atoi(s);
  if (a == 0) {
    a = 1;
  }
  i = stringmatch(s2, tradnames, lasttrade + 1);
  if (i == 0) {
    printf("\nUnknown trade good");
    return false;
  }
  i -= 1;

  t = gamesell(i, a);

  if (t == 0) {
    printf("Cannot sell any ");
  } else {
    printf("\nSelling %i", t);
    printf(unitnames[commodities[i].units]);
    printf(" of ");
  }
  printf(tradnames[i]);

  return true;
}

/* Buy ammount S(2) of good S(1) */
function /* bool */ dobuy(/* c_string */ s) {
  /* uint16 */ let i;
  /* uint16 */ let a;
  /* uint16 */ let t;
  /* c_string */ let s2 = new c_string(maxlen);
  spacesplit(s, s2);
  a = atoi(s);
  if (a == 0) a = 1;
  i = stringmatch(s2, tradnames, lasttrade + 1);
  if (i == 0) {
    printf("\nUnknown trade good");
    return false;
  }
  i -= 1;

  t = gamebuy(i, a);
  if (t == 0) printf("Cannot buy any ");
  else {
    printf("\nBuying %i", t);
    printf(unitnames[commodities[i].units]);
    printf(" of ");
  }
  printf(tradnames[i]);
  return true;
}

function /* uint16 */ gamefuel(/* uint16 */ f) {
  if (f + fuel > maxfuel) {
    f = maxfuel - fuel;
  }
  if (fuelcost > 0) {
    if (f * fuelcost > cash) {
      f = cash / fuelcost;
    }
  }
  fuel += f;
  cash -= fuelcost * f;
  return f;
}

/* Buy ammount S of fuel */
function /* bool */ dofuel(/* c_string */ s) {
  /* uint16 */ let f = gamefuel(floor(10 * atof(s)));
  if (f == 0) {
    printf("\nCan't buy any fuel");
  }
  printf("\nBuying %.1fLY fuel", f / 10);
  return true;
}

/* Cheat alter cash by S */
function /* bool */ docash(/* c_string */ s) {
  /* int */ let a = 10 * atof(s);
  cash += a;
  if (a != 0) return true;
  printf("Number not understood");
  return false;
}

function /* bool */ domkt(/* c_string */ s) {
  displaymarket(localmarket);
  printf("\nFuel :%.1f", fuel / 10);
  printf("      Holdspace :%it", holdspace);
  return true;
}

function /* bool */ parser(/* c_string */ s) {
  s = c_string.from(s);

  /* uint16 */ let i;
  /* c_string */ let c = new c_string(maxlen);
  spacesplit(s, c);

  i = stringmatch(c, commands, nocomms);
  if (i) {
    return comfuncs[i - 1](s);
  }

  printf("\n Bad command (");
  printf(c);
  printf(")");
  return false;
}

function /* bool */ doquit(/* c_string */ s) {
  process.exit(0);
  return false;
}

function /* bool */ dohelp(/* c_string */ s) {
  printf("\nCommands are:");
  printf("\nBuy   tradegood ammount");
  printf("\nSell  tradegood ammount");
  printf("\nFuel  ammount    (buy ammount LY of fuel)");
  printf("\nJump  planetname (limited by fuel)");
  printf("\nSneak planetname (any distance - no fuel cost)");
  printf("\nGalhyp           (jumps to next galaxy)");
  printf("\nInfo  planetname (prints info on system");
  printf("\nMkt              (shows market prices)");
  printf("\nLocal            (lists systems within 7 light years)");
  printf("\nCash number      (alters cash - cheating!)");
  printf("\nHold number      (change cargo bay)");
  printf("\nQuit or ^C       (exit)");
  printf("\nHelp             (display this text)");
  printf("\nRand             (toggle RNG)");
  printf("\n\nAbbreviations allowed eg. b fo 5 = Buy Food 5, m= Mkt");
  return true;
}

function /* void */ main(/* void */) {
  printf("\nWelcome to Text Elite 1.5.\n");

  mysrand(12345); /* Ensure repeatability */

  galaxynum = 1;
  buildgalaxy(galaxynum);

  currentplanet = numforLave; /* Don't use jump */
  localmarket = genmarket(0x00, galaxy[numforLave]); /* Since want seed=0 */

  fuel = maxfuel;

  parser("hold 20"); /* Small cargo bay */
  parser("cash +100"); /* 100 CR */
  parser("help");

  // main loop
  (function() {
    const rl = readline.createInterface(process.stdin, process.stdout);

    const prompt = () => {
      printf("\n\n");
      rl.setPrompt(_printf("Cash :%.1f>", cash / 10));
      rl.prompt();
    };

    rl.on("line", line => {
      parser(line);
      prompt();
    }).on("close", () => {
      process.exit(0);
    });

    prompt();
  })();

  /* 6502 Elite fires up at Lave with fluctuation=00
      and these prices tally with the NES ones.
      However, the availabilities reside in the saved game data.
      Availabilities are calculated (and fluctuation randomised)
      on hyperspacing
      I have checked with this code for Zaonce with fluctaution &AB 
      against the SuperVision 6502 code and both prices and availabilities tally.
   */
}

/* "Goat Soup" planetary description string code - adapted from Christian Pinder's
  reverse engineered sources. */

function desc_choice() {
  this.option = Array.prototype.map.call(arguments, c_string.from); // char[][5]
}

// prettier-ignore
const desc_list =
[
  /* 81 */	new desc_choice("fabled", "notable", "well known", "famous", "noted"),
  /* 82 */	new desc_choice("very", "mildly", "most", "reasonably", ""),
  /* 83 */	new desc_choice("ancient", "\x95", "great", "vast", "pink"),
  /* 84 */	new desc_choice("\x9E \x9D plantations", "mountains", "\x9C", "\x94 forests", "oceans"),
  /* 85 */	new desc_choice("shyness", "silliness", "mating traditions", "loathing of \x86", "love for \x86"),
  /* 86 */	new desc_choice("food blenders", "tourists", "poetry", "discos", "\x8E"),
  /* 87 */	new desc_choice("talking tree", "crab", "bat", "lobst", "\xB2"),
  /* 88 */	new desc_choice("beset", "plagued", "ravaged", "cursed", "scourged"),
  /* 89 */	new desc_choice("\x96 civil war", "\x9B \x98 \x99s", "a \x9B disease", "\x96 earthquakes", "\x96 solar activity"),
  /* 8A */	new desc_choice("its \x83 \x84", "the \xB1 \x98 \x99","its inhabitants' \x9A \x85", "\xA1", "its \x8D \x8E"),
  /* 8B */	new desc_choice("juice", "brandy", "water", "brew", "gargle blasters"),
  /* 8C */	new desc_choice("\xB2", "\xB1 \x99", "\xB1 \xB2", "\xB1 \x9B", "\x9B \xB2"),
  /* 8D */	new desc_choice("fabulous", "exotic", "hoopy", "unusual", "exciting"),
  /* 8E */	new desc_choice("cuisine", "night life", "casinos", "sit coms", " \xA1 "),
  /* 8F */	new desc_choice("\xB0", "The planet \xB0", "The world \xB0", "This planet", "This world"),
  /* 90 */	new desc_choice("n unremarkable", " boring", " dull", " tedious", " revolting"),
  /* 91 */	new desc_choice("planet", "world", "place", "little planet", "dump"),
  /* 92 */	new desc_choice("wasp", "moth", "grub", "ant", "\xB2"),
  /* 93 */	new desc_choice("poet", "arts graduate", "yak", "snail", "slug"),
  /* 94 */	new desc_choice("tropical", "dense", "rain", "impenetrable", "exuberant"),
  /* 95 */	new desc_choice("funny", "wierd", "unusual", "strange", "peculiar"),
  /* 96 */	new desc_choice("frequent", "occasional", "unpredictable", "dreadful", "deadly"),
  /* 97 */	new desc_choice("\x82 \x81 for \x8A", "\x82 \x81 for \x8A and \x8A", "\x88 by \x89", "\x82 \x81 for \x8A but \x88 by \x89","a\x90 \x91"),
  /* 98 */	new desc_choice("\x9B", "mountain", "edible", "tree", "spotted"),
  /* 99 */	new desc_choice("\x9F", "\xA0", "\x87oid", "\x93", "\x92"),
  /* 9A */	new desc_choice("ancient", "exceptional", "eccentric", "ingrained", "\x95"),
  /* 9B */	new desc_choice("killer", "deadly", "evil", "lethal", "vicious"),
  /* 9C */	new desc_choice("parking meters", "dust clouds", "ice bergs", "rock formations", "volcanoes"),
  /* 9D */	new desc_choice("plant", "tulip", "banana", "corn", "\xB2weed"),
  /* 9E */	new desc_choice("\xB2", "\xB1 \xB2", "\xB1 \x9B", "inhabitant", "\xB1 \xB2"),
  /* 9F */	new desc_choice("shrew", "beast", "bison", "snake", "wolf"),
  /* A0 */	new desc_choice("leopard", "cat", "monkey", "goat", "fish"),
  /* A1 */	new desc_choice("\x8C \x8B", "\xB1 \x9F \xA2","its \x8D \xA0 \xA2", "\xA3 \xA4", "\x8C \x8B"),
  /* A2 */	new desc_choice("meat", "cutlet", "steak", "burgers", "soup"),
  /* A3 */	new desc_choice("ice", "mud", "Zero-G", "vacuum", "\xB1 ultra"),
  /* A4 */	new desc_choice("hockey", "cricket", "karate", "polo", "tennis")
];

/* B0 = <planet name>
	 B1 = <planet name>ian
	 B2 = <random name>
*/

function /* int */ gen_rnd_number(/* void */) {
  /* int */ let a;
  /* int */ let x;
  x = (rnd_seed.a * 2) & 0xff;
  a = x + rnd_seed.c;
  if (rnd_seed.a > 127) a++;
  rnd_seed.a = a & 0xff;
  rnd_seed.c = x;

  a = floor(a / 256); /* a = any carry left from above */
  x = rnd_seed.b;
  a = (a + x + rnd_seed.d) & 0xff;
  rnd_seed.b = a;
  rnd_seed.d = x;
  return a;
}

function /* void */ goat_soup(/* c_string */ source, /* plansys */ psy) {
  for (let source_i = 0; source_i < source.strlen(); source_i++) {
    /* int */ let c = source.get(source_i);
    if (c === 0) break;
    if (c < 0x80) printf("%c", c);
    else {
      if (c <= 0xa4) {
        /* int */ let rnd = gen_rnd_number();
        goat_soup(
          desc_list[c - 0x81].option[
            (rnd >= 0x33) + (rnd >= 0x66) + (rnd >= 0x99) + (rnd >= 0xcc)
          ],
          psy
        );
      } else
        switch (c) {
          case 0xb0 /* planet name */:
            {
              /* int */ let i = 1;
              printf("%c", psy.name.get(0));
              while (psy.name.get(i) != 0)
                printf("%c", tolower(psy.name.get(i++)));
            }
            break;
          case 0xb1 /* <planet name>ian */:
            {
              /* int */ let i = 1;
              printf("%c", psy.name.get(0));
              while (psy.name.get(i) != 0) {
                if (
                  psy.name.get(i + 1) != 0 ||
                  (psy.name.getChar(i) != "E" && psy.name.getChar(i) != "I")
                )
                  printf("%c", tolower(psy.name.get(i)));
                i++;
              }
              printf("ian");
            }
            break;
          case 0xb2 /* random name */:
            {
              /* int */ let i;
              /* int */ let len = gen_rnd_number() & 3;
              for (i = 0; i <= len; i++) {
                /* int */ let x = gen_rnd_number() & 0x3e;
                if (i == 0) {
                  printf("%c", pairs0.get(x));
                } else {
                  printf("%c", tolower(pairs0.get(x)));
                }

                printf("%c", tolower(pairs0.get(x + 1)));
              } // endfor
            }
            break;
          default:
            printf("<bad char in data [%X]>", c);
            return;
        } /* endswitch */
    } /* endelse */
  } /* endwhile */
} /* endfunc */

/**+end **/

main();

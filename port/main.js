const readline = require("readline");
const c_string = require("./c_string");
const _printf = require("./printf");

function printf() {
  process.stdout.write(_printf.apply(_printf, arguments));
}

function allocArray(length, value) {
  return Array(length).fill(value || 0);
}

/* js port of: */
/* txtelite.c  1.5 */
/* Textual version of Elite trading (C implementation) */
/* Converted by Ian Bell from 6502 Elite sources.
   Original 6502 Elite by Ian Bell & David Braben. */

const tonnes = 0;
const maxlen = 20; /* Length of strings */

/* four byte random number used for planet description */
function fastseedtype() {
  this.a = 0; // uint8
  this.b = 0; // uint8
  this.c = 0; // uint8
  this.d = 0; // uint8
}

/* six byte random number used as seed for planets */
function seedtype() {
  this.w0 = 0; // uint16
  this.w1 = 0; // uint16
  this.w2 = 0; // uint16
}

function plansys() {
  this.x = 0; // uint
  this.y = 0; // uint /* One byte unsigned */
  this.economy = 0; // uint  /* These two are actually only 0-7  */
  this.govtype = 0; // uint
  this.techlev = 0; // uint /* 0-16 i think */
  this.population = 0; // uint /* One byte */
  this.productivity = 0; // uint /* Two byte */
  this.radius = 0; // uint /* Two byte (not used by game at all) */W
  this.goatsoupseed = new fastseedtype(); // fastseedtype
  this.name = new c_string(12); // char[]
}

const galsize = 256;
const AlienItems = 16;
const lasttrade = AlienItems;

const numforLave = 7; /* Lave is 7th generated planet in galaxy one */
const numforZaonce = 129;
const numforDiso = 147;
const numforRied = 46;

const galaxy = allocArray(galsize, null);
const seed = new seedtype();
let rnd_seed = new fastseedtype();

function tradegood(baseprice, gradient, basequant, maskbyte, units, name) {
  /* In 6502 version these were: */
  this.baseprice = baseprice; // uint /* one byte */
  this.gradient = gradient; // int16 /* five bits plus sign */
  this.basequant = basequant; // uint /* one byte */
  this.maskbyte = maskbyte; // uint /* two bits */
  this.units = units; // uint /* longest="Radioactives" */
  this.name = name; // char[20]
}

function markettype() {
  this.quantity = allocArray(lasttrade + 1); // uint [lasttrade+1]
  this.price = allocArray(lasttrade + 1); // uint [lasttrade+1]
}

/* Player workspace */
let shipshold = allocArray(lasttrade + 1); // uint [lasttrade + 1] /* Contents of cargo bay */
let currentplanet; // planetnum /* Current planet */
let galaxynum; // uint /* Galaxy number (1-8) */
let cash = 0; // int32
let fuel = 0; // uint
let localmarket; // markettype
let holdspace = 0; // uint

const fuelcost = 2; // int /* 0.2 CR/Light year */
const maxfuel = 70; // int /* 7.0 LY tank */

const base0 = 0x5a4a; // uint16
const base1 = 0x0248; // uint16
const base2 = 0xb753; // uint16 /* Base seed for galaxy 1 */

// 1.5 planet names fix
const pairs0 =
  "ABOUSEITILETSTONLONUTHNOALLEXEGEZACEBISOUSESARMAINDIREA.ERATENBERALAVETIEDORQUANTEISRION";

const pairs =
  "..LEXEGEZACEBISO" +
  "USESARMAINDIREA." +
  "ERATENBERALAVETI" +
  "EDORQUANTEISRION"; /* Dots should be nullprint characters */

const govnames = [
  "Anarchy",
  "Feudal",
  "Multi-gov",
  "Dictatorship",
  "Communist",
  "Confederacy",
  "Democracy",
  "Corporate State"
];

const econnames = [
  "Rich Ind",
  "Average Ind",
  "Poor Ind",
  "Mainly Ind",
  "Mainly Agri",
  "Rich Agri",
  "Average Agri",
  "Poor Agri"
];

const unitnames = ["t", "kg", "g"];

const commodities = [
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
const tradnames = commodities.map(
  x => x.name
); /* Tradegood names used in text commands
      Set using commodities array */

const nocomms = 14;

const commands = [
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
];

const comfuncs = [
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

let lastrand = 0;

function mysrand(seed) {
  lastrand = seed - 1;
}

function myrand() {
  // As supplied by D McDonnell	from SAS Insititute C
  // prettier-ignore
  const r = (((((((((((lastrand << 3) - lastrand) << 3)
      + lastrand) << 1) + lastrand) << 4)
      - lastrand) << 1) - lastrand) + 0xe60)
      & 0x7fffffff;
  lastrand = r - 1;
  return r;
}

function randbyte() {
  return String(myrand() & 0xff);
}

function mymin(a, b) {
  if (a < b) return a;
  else return b;
}

function stop(string) {
  printf("\n%s", string);
  process.exit(1);
}

/**+  ftoi **/
function ftoi(value) {
  return Math.floor(value + 0.5);
}

/**+  ftoi2 **/
function ftoi2(value) {
  return Math.floor(value);
}

function tweakseed(s) {
  let temp = s.w0 + s.w1 + s.w2; /* 2 byte aritmetic */
  s.w0 = s.w1;
  s.w1 = s.w2;
  s.w2 = temp;
}

/**-String functions for text interface **/

/* Remove all c's from string s */
function stripout(s, c) {
  let i = 0;
  let j = 0;
  while (i < s.strlen()) {
    if (s.getChar(i) != c) {
      s.setChar(j, s.getChar(i));
      j++;
    }
    i++;
  }
  s.set(j, 0);
}

function toupper(c) {
  if (!c) {
    return c;
  }

  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  const A = "A".charCodeAt(0);

  c = c.charCodeAt(0);
  if (c >= a && c <= z) {
    return String.fromCharCode(c + A - a);
  }
  return String.fromCharCode(c);
}

function tolower(c) {
  if (!c) {
    return c;
  }

  const A = "A".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
  const a = "a".charCodeAt(0);

  c = c.charCodeAt(0);
  if (c >= A && c <= Z) {
    return String.fromCharCode(c + a - A);
  }
  return String.fromCharCode(c);
}

/* Return nonzero iff string t begins with non-empty string s */
function stringbeg(s, t) {
  let i = 0;
  let l = s.length;
  if (l > 0) {
    while ((i < l) & (toupper(s[i]) == toupper(t[i]))) i++;
    if (i == l) return true;
  }
  return false;
}

/* Check string s against n options in string array a
   If matches ith element return i+1 else return 0 */
function stringmatch(s, a, n) {
  let i = 0;
  while (i < n) {
    if (stringbeg(s, a[i])) return i + 1;
    i++;
  }
  return 0;
}

/* Split string s at first space, returning first 'word' in t & shortening s */
function spacesplit(s) {
  const idx = s.trim().indexOf(" ");
  if (idx === -1) {
    return { s: "", t: s };
  }
  return { s: s.substring(idx).trim(), t: s.substring(0, idx).trim() };
}

/**-Functions for stock market **/

/* Try to buy ammount a  of good i  Return ammount bought */
/* Cannot buy more than is availble, can afford, or will fit in hold */
function gamebuy(i, a) {
  let t;
  if (cash < 0) t = 0;
  else {
    t = mymin(localmarket.quantity[i], a);
    if (commodities[i].units == tonnes) {
      t = mymin(holdspace, t);
    }
    t = mymin(t, Math.floor(cash / localmarket.price[i]));
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
function gamesell(i, a) {
  let t = mymin(shipshold[i], a);
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
function genmarket(fluct, p) {
  let market = new markettype();
  let i;
  for (i = 0; i <= lasttrade; i++) {
    let q;
    let product = p.economy * commodities[i].gradient;
    let changing = fluct & commodities[i].maskbyte;
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

function displaymarket(m) {
  let i;
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

function makesystem(s) {
  const thissys = new plansys();

  let pair1, pair2, pair3, pair4;
  let longnameflag = s.w0 & 64;

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

  thissys.name.setChar(0, pairs[pair1]);
  thissys.name.setChar(1, pairs[pair1 + 1]);
  thissys.name.setChar(2, pairs[pair2]);
  thissys.name.setChar(3, pairs[pair2 + 1]);
  thissys.name.setChar(4, pairs[pair3]);
  thissys.name.setChar(5, pairs[pair3 + 1]);

  if (longnameflag) {
    /* bit 6 of ORIGINAL w0 flags a four-pair name */
    thissys.name.setChar(6, pairs[pair4]);
    thissys.name.setChar(7, pairs[pair4 + 1]);
    thissys.name.set(8, 0);
  } else thissys.name.set(6, 0);
  stripout(thissys.name, ".");

  return thissys;
}

/**+Generate galaxy **/

/* Functions for galactic hyperspace */

/* rotate 8 bit number leftwards */
function rotatel(x) {
  let temp = x & 128;
  return 2 * (x & 127) + (temp >> 7);
}

function twist(x) {
  return 256 * rotatel(x >> 8) + rotatel(x & 255);
}

/* Apply to base seed; once for galaxy 2  */
/* twice for galaxy 3, etc. */
/* Eighth application gives galaxy 1 again*/
function nextgalaxy(s) {
  s.w0 = twist(s.w0);
  s.w1 = twist(s.w1);
  s.w2 = twist(s.w2);
}

/* Original game generated from scratch each time info needed */
function buildgalaxy(galaxynum) {
  let syscount;
  let galcount;
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

function gamejump(i) {
  currentplanet = i;
  localmarket = genmarket(randbyte(), galaxy[i]);
}

/* Seperation between two planets (4*sqrt(X*X+Y*Y/4)) */
function distance(a, b) {
  return ftoi(
    4 * Math.sqrt((a.x - b.x) * (a.x - b.x) + ((a.y - b.y) * (a.y - b.y)) / 4)
  );
}

/* Return id of the planet whose name matches passed strinmg
   closest to currentplanet - if none return currentplanet */
function matchsys(s) {
  let syscount;
  let p = currentplanet;
  let d = 9999;
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
function prisys(plsy, compressed) {
  if (compressed) {
    printf("%10s", plsy.name.toString());
    printf(" TL: %2i ", plsy.techlev + 1);
    printf("%12s", econnames[plsy.economy]);
    printf(" %15s", govnames[plsy.govtype]);
  } else {
    printf("\n\nSystem:  ");
    printf(plsy.name.toString());
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

    rnd_seed = plsy.goatsoupseed;
    printf("\n");
    goat_soup(c_string.from("\x8F is \x97."), plsy);
    printf("\n");
  }
}

/**-Various command functions **/

function dotweakrand(s) {
  // not required - native rand() is not supported
}

function dolocal(s) {
  let syscount;
  let d;
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
function dojump(s) {
  let d;
  let dest = matchsys(s);
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
function dosneak(s) {
  const fuelkeep = fuel;
  fuel = 666;

  const b = dojump(s);
  fuel = fuelkeep;

  return b;
}

/* Jump to next galaxy */
/* Preserve planetnum (eg. if leave 7th planet
   arrive at 7th planet) 
   Classic Elite always jumped to planet nearest (0x60,0x60)
*/
function dogalhyp(s) {
  galaxynum++;
  if (galaxynum == 9) {
    galaxynum = 1;
  }
  buildgalaxy(galaxynum);
  return true;
}

/* Info on planet */
function doinfo(s) {
  let dest = matchsys(s);
  prisys(galaxy[dest], false);
  return true;
}

function dohold(s) {
  let a = parseInt(s, 10);
  let t = 0;
  let i;
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
function dosell(s) {
  console.log(">> sell " + s);
}

/* Buy ammount S(2) of good S(1) */
function dobuy(s) {
  console.log(">> buy " + s);
}

function gamefuel(f) {
  if (isNaN(f)) {
    return 0;
  }
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
function dofuel(s) {
  const f = gamefuel(Math.floor(10 * parseFloat(s)));
  if (f == 0) {
    printf("\nCan't buy any fuel");
  }
  printf("\nBuying %.1fLY fuel", f / 10);
  return true;
}

/* Cheat alter cash by S */
function docash(s) {
  const a = 10 * parseFloat(s);
  if (!isNaN(a)) {
    cash += a;
    return true;
  }

  printf("Number not understood");
  return false;
}

function domkt(s) {
  displaymarket(localmarket);
  printf("\nFuel :%.1f", fuel / 10);
  printf("      Holdspace :%it", holdspace);
  return true;
}

function parser(s) {
  const res = spacesplit(s);
  const c = res.t;
  s = res.s;

  let i = stringmatch(c, commands, nocomms);
  if (i) {
    return comfuncs[i - 1](s);
  }

  printf("\n Bad command (");
  printf(c);
  printf(")");
  return false;
}

function doquit(s) {
  process.exit(0);
  return false;
}

function dohelp(s) {
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

function main() {
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
      rl.setPrompt(_printf("\n\nCash :%.1f>", cash / 10));
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

function desc_choice(option) {
  this.option = option; // char[][5]
}

// prettier-ignore
const desc_list =
[
  /* 81 */	new desc_choice(["fabled", "notable", "well known", "famous", "noted"]),
  /* 82 */	new desc_choice(["very", "mildly", "most", "reasonably", ""]),
  /* 83 */	new desc_choice(["ancient", "\x95", "great", "vast", "pink"]),
  /* 84 */	new desc_choice(["\x9E \x9D plantations", "mountains", "\x9C", "\x94 forests", "oceans"]),
  /* 85 */	new desc_choice(["shyness", "silliness", "mating traditions", "loathing of \x86", "love for \x86"]),
  /* 86 */	new desc_choice(["food blenders", "tourists", "poetry", "discos", "\x8E"]),
  /* 87 */	new desc_choice(["talking tree", "crab", "bat", "lobst", "\xB2"]),
  /* 88 */	new desc_choice(["beset", "plagued", "ravaged", "cursed", "scourged"]),
  /* 89 */	new desc_choice(["\x96 civil war", "\x9B \x98 \x99s", "a \x9B disease", "\x96 earthquakes", "\x96 solar activity"]),
  /* 8A */	new desc_choice(["its \x83 \x84", "the \xB1 \x98 \x99","its inhabitants' \x9A \x85", "\xA1", "its \x8D \x8E"]),
  /* 8B */	new desc_choice(["juice", "brandy", "water", "brew", "gargle blasters"]),
  /* 8C */	new desc_choice(["\xB2", "\xB1 \x99", "\xB1 \xB2", "\xB1 \x9B", "\x9B \xB2"]),
  /* 8D */	new desc_choice(["fabulous", "exotic", "hoopy", "unusual", "exciting"]),
  /* 8E */	new desc_choice(["cuisine", "night life", "casinos", "sit coms", " \xA1 "]),
  /* 8F */	new desc_choice(["\xB0", "The planet \xB0", "The world \xB0", "This planet", "This world"]),
  /* 90 */	new desc_choice(["n unremarkable", " boring", " dull", " tedious", " revolting"]),
  /* 91 */	new desc_choice(["planet", "world", "place", "little planet", "dump"]),
  /* 92 */	new desc_choice(["wasp", "moth", "grub", "ant", "\xB2"]),
  /* 93 */	new desc_choice(["poet", "arts graduate", "yak", "snail", "slug"]),
  /* 94 */	new desc_choice(["tropical", "dense", "rain", "impenetrable", "exuberant"]),
  /* 95 */	new desc_choice(["funny", "wierd", "unusual", "strange", "peculiar"]),
  /* 96 */	new desc_choice(["frequent", "occasional", "unpredictable", "dreadful", "deadly"]),
  /* 97 */	new desc_choice(["\x82 \x81 for \x8A", "\x82 \x81 for \x8A and \x8A", "\x88 by \x89", "\x82 \x81 for \x8A but \x88 by \x89","a\x90 \x91"]),
  /* 98 */	new desc_choice(["\x9B", "mountain", "edible", "tree", "spotted"]),
  /* 99 */	new desc_choice(["\x9F", "\xA0", "\x87oid", "\x93", "\x92"]),
  /* 9A */	new desc_choice(["ancient", "exceptional", "eccentric", "ingrained", "\x95"]),
  /* 9B */	new desc_choice(["killer", "deadly", "evil", "lethal", "vicious"]),
  /* 9C */	new desc_choice(["parking meters", "dust clouds", "ice bergs", "rock formations", "volcanoes"]),
  /* 9D */	new desc_choice(["plant", "tulip", "banana", "corn", "\xB2weed"]),
  /* 9E */	new desc_choice(["\xB2", "\xB1 \xB2", "\xB1 \x9B", "inhabitant", "\xB1 \xB2"]),
  /* 9F */	new desc_choice(["shrew", "beast", "bison", "snake", "wolf"]),
  /* A0 */	new desc_choice(["leopard", "cat", "monkey", "goat", "fish"]),
  /* A1 */	new desc_choice(["\x8C \x8B", "\xB1 \x9F \xA2","its \x8D \xA0 \xA2", "\xA3 \xA4", "\x8C \x8B"]),
  /* A2 */	new desc_choice(["meat", "cutlet", "steak", "burgers", "soup"]),
  /* A3 */	new desc_choice(["ice", "mud", "Zero-G", "vacuum", "\xB1 ultra"]),
  /* A4 */	new desc_choice(["hockey", "cricket", "karate", "polo", "tennis"])
];

/* B0 = <planet name>
	 B1 = <planet name>ian
	 B2 = <random name>
*/

function gen_rnd_number() {
  let a;
  let x;
  x = (rnd_seed.a * 2) & 0xff;
  a = x + rnd_seed.c;
  if (rnd_seed.a > 127) a++;
  rnd_seed.a = a & 0xff;
  rnd_seed.c = x;

  a = a / 256; /* a = any carry left from above */
  x = rnd_seed.b;
  a = (a + x + rnd_seed.d) & 0xff;
  rnd_seed.b = a;
  rnd_seed.d = x;
  return a;
}

function goat_soup(source, psy) {
  for (let source_i = 0; source_i < source.strlen(); source_i++) {
    let c = source.get(source_i);
    if (c === 0) break;
    if (c < 0x80) printf("%c", c);
    else {
      if (c <= 0xa4) {
        let rnd = gen_rnd_number();
        goat_soup(
          c_string.from(
            desc_list[c - 0x81].option[
              (rnd >= 0x33) + (rnd >= 0x66) + (rnd >= 0x99) + (rnd >= 0xcc)
            ]
          ),
          psy
        );
      } else
        switch (c) {
          case 0xb0 /* planet name */:
            {
              let i = 1;
              printf("%c", psy.name.get(0));
              while (psy.name.get(i) != 0)
                printf("%c", tolower(psy.name.getChar(i++)));
            }
            break;
          case 0xb1 /* <planet name>ian */:
            {
              let i = 1;
              printf("%c", psy.name.get(0));
              while (psy.name.get(i) != 0) {
                if (
                  psy.name.get(i + 1) != 0 ||
                  (psy.name.getChar(i) != "E" && psy.name.getChar(i) != "I")
                )
                  printf("%c", tolower(psy.name.getChar(i)));
                i++;
              }
              printf("ian");
            }
            break;
          case 0xb2 /* random name */:
            {
              let i;
              let len = gen_rnd_number() & 3;
              for (i = 0; i <= len; i++) {
                let x = gen_rnd_number() & 0x3e;
                if (i == 0) {
                  printf("%c", pairs0[x]);
                } else {
                  printf("%c", tolower(pairs0[x]));
                }

                printf("%c", tolower(pairs0[x + 1]));
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

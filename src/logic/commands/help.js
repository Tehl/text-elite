export default {
  name: "help",
  createCommand: args => (state, eventBus) => {
    console.log("Commands are:");
    console.log("Buy   tradegood ammount");
    console.log("Sell  tradegood ammount");
    console.log("Fuel  ammount    (buy ammount LY of fuel)");
    console.log("Jump  planetname (limited by fuel)");
    console.log("Sneak planetname (any distance - no fuel cost)");
    console.log("Galhyp           (jumps to next galaxy)");
    console.log("Info  planetname (prints info on system");
    console.log("Mkt              (shows market prices)");
    console.log("Local            (lists systems within 7 light years)");
    console.log("Cash number      (alters cash - cheating!)");
    console.log("Hold number      (change cargo bay)");
    console.log("Quit or ^C       (exit)");
    console.log("Help             (display this text)");
    console.log("Rand             (toggle RNG)");
    console.log("Abbreviations allowed eg. b fo 5 = Buy Food 5, m= Mkt");
    return true;
  }
};

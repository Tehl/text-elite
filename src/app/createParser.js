import createParser from "../logic/parser";
import notImplemented from "../logic/commands/notImplemented";

const commandDefinitions = [
  notImplemented("buy"),
  notImplemented("sell"),
  notImplemented("fuel"),
  notImplemented("jump"),
  notImplemented("cash"),
  notImplemented("mkt"),
  notImplemented("help"),
  notImplemented("hold"),
  notImplemented("sneak"),
  notImplemented("local"),
  notImplemented("info"),
  notImplemented("galhyp"),
  notImplemented("quit"),
  notImplemented("rand")
];

export default () => createParser(commandDefinitions);

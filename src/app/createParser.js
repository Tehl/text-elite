import createParser from "../logic/parser";
import cashCommand from "../logic/commands/cash";
import helpCommand from "../logic/commands/help";
import holdCommand from "../logic/commands/hold";
import infoCommand from "../logic/commands/info";
import quitCommand from "../logic/commands/quit";
import randCommand from "../logic/commands/rand";
import notImplemented from "../logic/commands/notImplemented";

const commandDefinitions = [
  notImplemented("buy"),
  notImplemented("sell"),
  notImplemented("fuel"),
  notImplemented("jump"),
  cashCommand,
  notImplemented("mkt"),
  helpCommand,
  holdCommand,
  notImplemented("sneak"),
  notImplemented("local"),
  infoCommand,
  notImplemented("galhyp"),
  quitCommand,
  randCommand
];

export default () => createParser(commandDefinitions);

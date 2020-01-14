import createParser from "../logic/parser";
import { commandParser as cashCommand } from "../logic/commands/cash";
import { commandParser as marketCommand } from "../logic/commands/market";
import { commandParser as helpCommand } from "../logic/commands/help";
import { commandParser as holdCommand } from "../logic/commands/hold";
import { commandParser as infoCommand } from "../logic/commands/info";
import { commandParser as quitCommand } from "../logic/commands/quit";
import { commandParser as randCommand } from "../logic/commands/rand";
import notImplemented from "../logic/commands/notImplemented";

const commandDefinitions = [
  notImplemented("buy"),
  notImplemented("sell"),
  notImplemented("fuel"),
  notImplemented("jump"),
  cashCommand,
  marketCommand,
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

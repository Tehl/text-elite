import createParser from "../logic/parser";
import { commandParser as buyCommand } from "../logic/commands/buy";
import { commandParser as sellCommand } from "../logic/commands/sell";
import { commandParser as fuelCommand } from "../logic/commands/fuel";
import { commandParser as jumpCommand } from "../logic/commands/jump";
import { commandParser as cashCommand } from "../logic/commands/cash";
import { commandParser as marketCommand } from "../logic/commands/market";
import { commandParser as helpCommand } from "../logic/commands/help";
import { commandParser as holdCommand } from "../logic/commands/hold";
import { commandParser as sneakCommand } from "../logic/commands/sneak";
import { commandParser as infoCommand } from "../logic/commands/info";
import { commandParser as localCommand } from "../logic/commands/local";
import { commandParser as quitCommand } from "../logic/commands/quit";
import { commandParser as randCommand } from "../logic/commands/rand";
import notImplemented from "../logic/commands/notImplemented";

const commandDefinitions = [
  buyCommand,
  sellCommand,
  fuelCommand,
  jumpCommand,
  cashCommand,
  marketCommand,
  helpCommand,
  holdCommand,
  sneakCommand,
  localCommand,
  infoCommand,
  notImplemented("galhyp"),
  quitCommand,
  randCommand
];

export default () => createParser(commandDefinitions);

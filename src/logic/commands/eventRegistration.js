import { registerEvents as buyCommand } from "./buy";
import { registerEvents as cashCommand } from "./cash";
import { registerEvents as fuelCommand } from "./fuel";
import { registerEvents as helpCommand } from "./help";
import { registerEvents as holdCommand } from "./hold";
import { registerEvents as infoCommand } from "./info";
import { registerEvents as jumpCommand } from "./jump";
import { registerEvents as localCommand } from "./local";
import { registerEvents as marketCommand } from "./market";
import { registerEvents as quitCommand } from "./quit";
import { registerEvents as sellCommand } from "./sell";

function registerEvents(eventBus, serviceProvider) {
  buyCommand(eventBus, serviceProvider);
  cashCommand(eventBus, serviceProvider);
  fuelCommand(eventBus, serviceProvider);
  helpCommand(eventBus, serviceProvider);
  holdCommand(eventBus, serviceProvider);
  infoCommand(eventBus, serviceProvider);
  jumpCommand(eventBus, serviceProvider);
  localCommand(eventBus, serviceProvider);
  marketCommand(eventBus, serviceProvider);
  quitCommand(eventBus, serviceProvider);
  sellCommand(eventBus, serviceProvider);
}

export { registerEvents };

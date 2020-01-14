import { registerEvents as cashCommand } from "./cash";
import { registerEvents as helpCommand } from "./help";
import { registerEvents as holdCommand } from "./hold";
import { registerEvents as infoCommand } from "./info";
import { registerEvents as marketCommand } from "./market";
import { registerEvents as quitCommand } from "./quit";

function registerEvents(eventBus, serviceProvider) {
  cashCommand(eventBus, serviceProvider);
  helpCommand(eventBus, serviceProvider);
  holdCommand(eventBus, serviceProvider);
  infoCommand(eventBus, serviceProvider);
  marketCommand(eventBus, serviceProvider);
  quitCommand(eventBus, serviceProvider);
}

export { registerEvents };

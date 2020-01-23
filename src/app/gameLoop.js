import readline from "readline";
import printf from "printf";
import { getCash } from "/state/selectors";

function gameLoop(store, eventBus, parser) {
  const rl = readline.createInterface(process.stdin, process.stdout);

  const prompt = () => {
    const state = store.getState();
    const cash = getCash(state);

    process.stdout.write("\n\n");
    rl.setPrompt(printf("Cash :%.1f>", cash / 10));
    rl.prompt();
  };

  rl.on("line", line => {
    const command = parser(line);
    command(store.getState(), eventBus);

    prompt();
  }).on("close", () => {
    process.exit(0);
  });

  prompt();
}

export default gameLoop;

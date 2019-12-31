import readline from "readline";

function gameLoop(parser) {
  const rl = readline.createInterface(process.stdin, process.stdout);

  const prompt = () => {
    rl.prompt();
  };

  rl.on("line", line => {
    const command = parser(line);
    command();

    prompt();
  }).on("close", () => {
    process.exit(0);
  });

  prompt();
}

export default gameLoop;

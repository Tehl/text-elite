import readline from "readline";

function main() {
  const rl = readline.createInterface(process.stdin, process.stdout);

  const prompt = () => {
    rl.prompt();
  };

  rl.on("line", line => {
    console.log(line);
    prompt();
  }).on("close", () => {
    process.exit(0);
  });

  prompt();
}

export default main;

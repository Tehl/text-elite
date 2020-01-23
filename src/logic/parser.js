import { stringSplit, stringBeginsWith } from "/utility/strings";

function badCommand(input) {
  return () => console.log("Bad command (" + input + ")");
}

function parseCommand(input, commandDefinitions) {
  const parts = stringSplit(input, " ");
  const definition = commandDefinitions.find(x =>
    stringBeginsWith(x.name, parts[0])
  );

  if (definition) {
    return definition.createCommand(parts[1]);
  }

  return badCommand(input);
}

function createParser(commandDefinitions) {
  return input => parseCommand(input, commandDefinitions);
}

export default createParser;

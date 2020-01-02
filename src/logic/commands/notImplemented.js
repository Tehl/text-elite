export default name => ({
  name,
  createCommand: args => (state, eventBus) =>
    console.log("Not implemented: " + name + " (" + args + ")")
});

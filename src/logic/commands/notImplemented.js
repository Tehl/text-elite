export default name => ({
  name,
  createCommand: args => () =>
    console.log("Not implemented: " + name + " (" + args + ")")
});

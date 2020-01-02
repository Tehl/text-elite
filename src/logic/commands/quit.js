export default {
  name: "quit",
  createCommand: args => (state, eventBus) => {
    // exit the application
    process.exit(0);
  }
};

import { createBus } from "suber";

export default () => {
  const eventBus = createBus();

  //   eventBus.applyMiddleware(_ => (channel, message, source) => {
  //     console.log({
  //       channel,
  //       message,
  //       source
  //     });
  //   });

  return eventBus;
};

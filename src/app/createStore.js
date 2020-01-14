import { createStore, applyMiddleware } from "redux";
import { createReduxMiddleware } from "suber";
import { globalReducer } from "../state/global";

export default eventBus => {
  // echo all store events into the event bus, with the action type as the channel
  const eventBusMiddleware = createReduxMiddleware(eventBus);

  // initialize store using app reducers
  const defaultState = {};
  const store = createStore(
    globalReducer,
    defaultState,
    applyMiddleware(eventBusMiddleware)
  );

  // echo all event bus events into the store, with the channel as the action type
  eventBus.applyMiddleware((_, origin) => (channel, message, source) => {
    if (source === "redux") {
      return;
    }

    store.dispatch({ ...message, type: channel, ...origin });
  });

  return store;
};

import React from "react";
import { Provider } from "react-redux";
import { render } from "ink";
import createEventBus from "/app/createEventBus";
import createStore from "/app/createStore";
import createParser from "/app/createParser";
import registerEvents from "./registerEvents";
import { beginNewGame } from "/logic/events/newGame";
import App from "./components/App";

const eventBus = createEventBus();
const store = createStore(eventBus);
const parser = createParser();

registerEvents(store, eventBus, parser);

render(
  <Provider store={store}>
    <App eventBus={eventBus} />
  </Provider>
);

beginNewGame(eventBus);

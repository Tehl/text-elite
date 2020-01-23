import {
  DISPLAY_FEEDBACK_SUCCESS,
  DISPLAY_FEEDBACK_FAILURE,
  DISPLAY_FEEDBACK_INFO
} from "/logic/events/events";

function onDisplayMessage(event) {
  let message = event.message;
  if (message instanceof Array) {
    message = message.join("\n");
  }
  process.stdout.write(message + "\n");
}

function registerEvents(eventBus, serviceProvider) {
  eventBus.take(DISPLAY_FEEDBACK_SUCCESS, onDisplayMessage);
  eventBus.take(DISPLAY_FEEDBACK_FAILURE, onDisplayMessage);
  eventBus.take(DISPLAY_FEEDBACK_INFO, onDisplayMessage);
}

export { registerEvents };

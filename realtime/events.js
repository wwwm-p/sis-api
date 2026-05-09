export function emitEvent(eventName, payload) {
  console.log("EVENT:", eventName, payload);

  // later: push to Pusher / Ably / WebSocket
}

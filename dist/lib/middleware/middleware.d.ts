/**
 * Middleware between web api driver and whatsappJS.
 * Right now this file should not import nor export anything.
 * Until I figure out how to compile this file with the imports inlined.
 * Specifically the [ExposedFn] enum.
 * Maybe by creating a webpack/rollup task
 */
declare module WAPI {
    const waitNewMessages: (rmCallback: boolean, callback: Function) => void;
    const waitNewAcknowledgements: (callback: Function) => void;
    const onStateChange: (callback: Function) => void;
    const allNewMessagesListener: (callback: Function) => void;
}
declare enum ExposedFn {
    OnMessage = "onMessage",
    OnAck = "onAck",
    OnParticipantsChanged = "onParticipantsChanged"
}

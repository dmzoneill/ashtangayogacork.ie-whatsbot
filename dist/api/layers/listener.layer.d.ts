import { Page } from 'puppeteer';
import { Ack, Chat, LiveLocation, Message, ParticipantEvent } from '../model';
import { SocketState } from '../model/enum';
import { ProfileLayer } from './profile.layer';
export declare class ListenerLayer extends ProfileLayer {
    page: Page;
    constructor(page: Page);
    /**
     * Listens to messages received
     * @returns Observable stream of messages
     */
    onMessage(fn: (message: Message) => void): void;
    /**
     * @event Listens to all new messages
     * @param to callback
     * @fires Message
     */
    onAnyMessage(fn: (message: Message) => void): Promise<void>;
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    onStateChange(fn: (state: SocketState) => void): void;
    /**
     * @event Listens to messages acknowledgement Changes
     * @returns Observable stream of messages
     */
    onAck(fn: (ack: Ack) => void): void;
    /**
     * @event Listens to live locations from a chat that already has valid live locations
     * @param chatId the chat from which you want to subscribes to live location updates
     * @param fn callback that takes in a LiveLocation
     * @returns boolean, if returns false then there were no valid live locations in the chat of chatId
     * @emits <LiveLocation> LiveLocation
     */
    onLiveLocation(chatId: string, fn: (liveLocationChangedEvent: LiveLocation) => void): Promise<any>;
    /**
     * @param to group id: xxxxx-yyyy@us.c
     * @param to callback
     * @returns Stream of ParticipantEvent
     */
    onParticipantsChanged(groupId: string, fn: (participantChangedEvent: ParticipantEvent) => void): Promise<void>;
    /**
     * @event Fires callback with Chat object every time the host phone is added to a group.
     * @param to callback
     * @returns Observable stream of Chats
     */
    onAddedToGroup(fn: (chat: Chat) => any): Promise<void>;
}

import { Page } from 'puppeteer';
import { Chat, Contact, ContactStatus, Message, PartialMessage, WhatsappProfile } from '../model';
import { SenderLayer } from './sender.layer';
export declare class RetrieverLayer extends SenderLayer {
    constructor(page: Page);
    /**
     * Retrieves all chats
     * @returns array of [Chat]
     */
    getAllChats(withNewMessageOnly?: boolean): Promise<Chat[]>;
    /**
     * Retrieves all chats with messages
     * @returns array of [Chat]
     */
    getAllChatsWithMessages(withNewMessageOnly?: boolean): Promise<Chat[]>;
    /**
     * Retrieve all groups
     * @returns array of groups
     */
    getAllGroups(withNewMessagesOnly?: boolean): Promise<Chat[]>;
    /**
     * Retrieves contact detail object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    getContact(contactId: string): Promise<Contact>;
    /**
     * Retrieves all contacts
     * @returns array of [Contact]
     */
    getAllContacts(): Promise<Contact[]>;
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    getChatById(contactId: string): Promise<Chat>;
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     * @deprecated
     */
    getChat(contactId: string): Promise<Chat>;
    /**
     * Retrieves chat picture
     * @param chatId Chat id
     * @returns url of the chat picture or undefined if there is no picture for the chat.
     */
    getProfilePicFromServer(chatId: string): Promise<string>;
    /**
     * Load more messages in chat object from server. Use this in a while loop
     * @param contactId
     * @returns contact detial as promise
     * @deprecated
     */
    loadEarlierMessages(contactId: string): Promise<Message[]>;
    /**
     * Retrieves status of given contact
     * @param contactId
     */
    getStatus(contactId: string): Promise<ContactStatus>;
    /**
     * Checks if a number is a valid whatsapp number
     * @param contactId, you need to include the @c.us at the end.
     * @returns contact detial as promise
     */
    getNumberProfile(contactId: string): Promise<WhatsappProfile>;
    /**
     * Retrieves all undread Messages
     * @param includeMe
     * @param includeNotifications
     * @param useUnreadCount
     * @returns any
     * @deprecated
     */
    getUnreadMessages(includeMe: boolean, includeNotifications: boolean, useUnreadCount: boolean): Promise<any>;
    /**
     * Retrieves all unread messages (where ack is -1)
     * @returns list of messages
     */
    getAllUnreadMessages(): Promise<PartialMessage[]>;
    /**
     * Retrieves all new messages (where isNewMsg is true)
     * @returns List of messages
     * @deprecated Use getAllUnreadMessages
     */
    getAllNewMessages(): Promise<any>;
    /**
     * Retrieves all messages already loaded in a chat
     * For loading every message use loadAndGetAllMessagesInChat
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns any
     */
    getAllMessagesInChat(chatId: string, includeMe: boolean, includeNotifications: boolean): Promise<Message[]>;
    /**
     * Loads and Retrieves all Messages in a chat
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns any
     */
    loadAndGetAllMessagesInChat(chatId: string, includeMe?: boolean, includeNotifications?: boolean): Promise<Message[]>;
}

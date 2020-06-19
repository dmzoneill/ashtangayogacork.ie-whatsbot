import { Page } from 'puppeteer';
import { UILayer } from './ui.layer';
export declare class ControlsLayer extends UILayer {
    constructor(page: Page);
    /**
     * Deletes the given chat
     * @param chatId
     * @returns boolean
     */
    deleteChat(chatId: string): Promise<boolean>;
    /**
     * Deletes all messages of given chat
     * @param chatId
     * @returns boolean
     */
    clearChat(chatId: string): Promise<void>;
    /**
     * Deletes message of given message id
     * @param chatId The chat id from which to delete the message.
     * @param messageId The specific message id of the message to be deleted
     * @param onlyLocal If it should only delete locally (message remains on the other recipienct's phone). Defaults to false.
     */
    deleteMessage(chatId: string, messageId: string[] | string, onlyLocal?: boolean): Promise<any>;
}

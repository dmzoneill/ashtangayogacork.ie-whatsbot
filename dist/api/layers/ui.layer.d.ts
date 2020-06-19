import { Page } from 'puppeteer';
import { GroupLayer } from './group.layer';
export declare class UILayer extends GroupLayer {
    constructor(page: Page);
    /**
     * Opens given chat at last message (bottom)
     * Will fire natural workflow events of whatsapp web
     * @param chatId
     */
    openChat(chatId: string): Promise<boolean>;
    /**
     * Opens chat at given message position
     * @param chatId Chat id
     * @param messageId Message id (For example: '06D3AB3D0EEB9D077A3F9A3EFF4DD030')
     */
    openChatAt(chatId: string, messageId: string): Promise<{
        wasVisible: boolean;
        alignAt: string;
    }>;
}

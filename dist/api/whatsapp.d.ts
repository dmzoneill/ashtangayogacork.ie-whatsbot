/// <reference types="node" />
import { Page } from 'puppeteer';
import { ControlsLayer } from './layers/controls.layer';
import { Message } from './model';
export declare class Whatsapp extends ControlsLayer {
    page: Page;
    constructor(page: Page);
    /**
     * Get the puppeteer page instance
     * @returns The Whatsapp page
     */
    get waPage(): Page;
    /**
     * Clicks on 'use here' button (When it get unlaunched)
     * This method tracks the class of the button
     * Whatsapp web might change this class name over the time
     * Dont rely on this method
     */
    useHere(): Promise<void>;
    /**
     * Closes page and browser
     */
    close(): Promise<void>;
    /**
     * Decrypts message file
     * @param message Message object
     * @returns Decrypted file buffer (null otherwise)
     */
    downloadFile(message: Message): Promise<Buffer>;
}

/// <reference types="node" />
import { Message } from '../model';
/**
 * Decrypts given message file
 * @param encBase64 .enc file as base64
 * @param message Message object
 * @returns dectypted file as buffer
 */
export declare function decrypt(encBase64: string, message: Message): Buffer;

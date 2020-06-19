"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var hkdf = require("futoin-hkdf");
var enum_1 = require("../model/enum");
/**
 * Decrypts given message file
 * @param encBase64 .enc file as base64
 * @param message Message object
 * @returns dectypted file as buffer
 */
function decrypt(encBase64, message) {
    var encBuffer = Buffer.from(encBase64, 'base64');
    var file = generateFile(encBuffer, message.mediaKey, message.type);
    return file;
}
exports.decrypt = decrypt;
/**
 * Generates buffer file from enc file and media key
 * @param encBuffer
 * @param mediaKeyBase64
 * @param mediaType
 */
function generateFile(encBuffer, mediaKeyBase64, mediaType) {
    // Generic derivation
    var expandedDerivation = expandDerivation(mediaType, mediaKeyBase64);
    // Dechipher
    var deciphed = decipher(expandedDerivation);
    // Decode
    encBuffer = encBuffer.slice(0, -10);
    var decoded = deciphed.update(encBuffer);
    var fileBuffer = Buffer.from(decoded, 'utf-8');
    return fileBuffer;
}
/**
 * Executes HMAC-based Extract-and-Expand Key Derivation Function (HKDF).
 * @param mediaType
 * @param mediaKeyBase64
 */
function expandDerivation(mediaType, mediaKeyBase64) {
    var options = {
        salt: new Uint8Array(32),
        info: "WhatsApp " + enum_1.MediaType[mediaType.toUpperCase()] + " Keys",
        hash: 'sha256',
    };
    // required output length in bytes
    var length = 112;
    var mediaKeyBuffer = Buffer.from(mediaKeyBase64, 'base64');
    // Generic derivation
    return hkdf(mediaKeyBuffer, length, options);
}
function decipher(expandedDerivation) {
    var cropped = expandedDerivation.slice(0, 16);
    var cipherKey = expandedDerivation.slice(16, 48);
    return crypto.createDecipheriv('aes-256-cbc', cipherKey, cropped);
}

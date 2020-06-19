"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sender_layer_1 = require("./sender.layer");
var RetrieverLayer = /** @class */ (function (_super) {
    __extends(RetrieverLayer, _super);
    function RetrieverLayer(page) {
        return _super.call(this, page) || this;
    }
    /**
     * Retrieves all chats
     * @returns array of [Chat]
     */
    RetrieverLayer.prototype.getAllChats = function (withNewMessageOnly) {
        if (withNewMessageOnly === void 0) { withNewMessageOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (withNewMessageOnly) {
                    return [2 /*return*/, this.page.evaluate(function () { return WAPI.getAllChatsWithNewMsg(); })];
                }
                else {
                    return [2 /*return*/, this.page.evaluate(function () { return WAPI.getAllChats(); })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Retrieves all chats with messages
     * @returns array of [Chat]
     */
    RetrieverLayer.prototype.getAllChatsWithMessages = function (withNewMessageOnly) {
        if (withNewMessageOnly === void 0) { withNewMessageOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (withNewMessageOnly) {
                        return WAPI.getAllChatsWithMessages(withNewMessageOnly);
                    }, withNewMessageOnly)];
            });
        });
    };
    /**
     * Retrieve all groups
     * @returns array of groups
     */
    RetrieverLayer.prototype.getAllGroups = function (withNewMessagesOnly) {
        if (withNewMessagesOnly === void 0) { withNewMessagesOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var chats, chats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!withNewMessagesOnly) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.evaluate(function () { return WAPI.getAllChatsWithNewMsg(); })];
                    case 1:
                        chats = _a.sent();
                        return [2 /*return*/, chats.filter(function (chat) { return chat.isGroup; })];
                    case 2: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.getAllChats(); })];
                    case 3:
                        chats = _a.sent();
                        return [2 /*return*/, chats.filter(function (chat) { return chat.isGroup; })];
                }
            });
        });
    };
    /**
     * Retrieves contact detail object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    RetrieverLayer.prototype.getContact = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (contactId) { return WAPI.getContact(contactId); }, contactId)];
            });
        });
    };
    /**
     * Retrieves all contacts
     * @returns array of [Contact]
     */
    RetrieverLayer.prototype.getAllContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.getAllContacts(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    RetrieverLayer.prototype.getChatById = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (contactId) { return WAPI.getChatById(contactId); }, contactId)];
            });
        });
    };
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     * @deprecated
     */
    RetrieverLayer.prototype.getChat = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getChatById(contactId)];
            });
        });
    };
    /**
     * Retrieves chat picture
     * @param chatId Chat id
     * @returns url of the chat picture or undefined if there is no picture for the chat.
     */
    RetrieverLayer.prototype.getProfilePicFromServer = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (chatId) { return WAPI.getProfilePicFromServer(chatId); }, chatId)];
            });
        });
    };
    /**
     * Load more messages in chat object from server. Use this in a while loop
     * @param contactId
     * @returns contact detial as promise
     * @deprecated
     */
    RetrieverLayer.prototype.loadEarlierMessages = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (contactId) { return WAPI.loadEarlierMessages(contactId); }, contactId)];
            });
        });
    };
    /**
     * Retrieves status of given contact
     * @param contactId
     */
    RetrieverLayer.prototype.getStatus = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (contactId) { return WAPI.getStatus(contactId); }, contactId)];
            });
        });
    };
    /**
     * Checks if a number is a valid whatsapp number
     * @param contactId, you need to include the @c.us at the end.
     * @returns contact detial as promise
     */
    RetrieverLayer.prototype.getNumberProfile = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (contactId) { return WAPI.getNumberProfile(contactId); }, contactId)];
            });
        });
    };
    /**
     * Retrieves all undread Messages
     * @param includeMe
     * @param includeNotifications
     * @param useUnreadCount
     * @returns any
     * @deprecated
     */
    RetrieverLayer.prototype.getUnreadMessages = function (includeMe, includeNotifications, useUnreadCount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var includeMe = _a.includeMe, includeNotifications = _a.includeNotifications, useUnreadCount = _a.useUnreadCount;
                            return WAPI.getUnreadMessages(includeMe, includeNotifications, useUnreadCount);
                        }, { includeMe: includeMe, includeNotifications: includeNotifications, useUnreadCount: useUnreadCount })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all unread messages (where ack is -1)
     * @returns list of messages
     */
    RetrieverLayer.prototype.getAllUnreadMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function () { return WAPI.getAllUnreadMessages(); })];
            });
        });
    };
    /**
     * Retrieves all new messages (where isNewMsg is true)
     * @returns List of messages
     * @deprecated Use getAllUnreadMessages
     */
    RetrieverLayer.prototype.getAllNewMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function () { return WAPI.getAllNewMessages(); })];
            });
        });
    };
    /**
     * Retrieves all messages already loaded in a chat
     * For loading every message use loadAndGetAllMessagesInChat
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns any
     */
    RetrieverLayer.prototype.getAllMessagesInChat = function (chatId, includeMe, includeNotifications) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var chatId = _a.chatId, includeMe = _a.includeMe, includeNotifications = _a.includeNotifications;
                            return WAPI.getAllMessagesInChat(chatId, includeMe, includeNotifications);
                        }, { chatId: chatId, includeMe: includeMe, includeNotifications: includeNotifications })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Loads and Retrieves all Messages in a chat
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns any
     */
    RetrieverLayer.prototype.loadAndGetAllMessagesInChat = function (chatId, includeMe, includeNotifications) {
        if (includeMe === void 0) { includeMe = false; }
        if (includeNotifications === void 0) { includeNotifications = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var chatId = _a.chatId, includeMe = _a.includeMe, includeNotifications = _a.includeNotifications;
                            return WAPI.loadAndGetAllMessagesInChat(chatId, includeMe, includeNotifications);
                        }, { chatId: chatId, includeMe: includeMe, includeNotifications: includeNotifications })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RetrieverLayer;
}(sender_layer_1.SenderLayer));
exports.RetrieverLayer = RetrieverLayer;

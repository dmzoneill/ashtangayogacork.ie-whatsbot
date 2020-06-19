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
var exposed_enum_1 = require("../helpers/exposed.enum");
var profile_layer_1 = require("./profile.layer");
var ListenerLayer = /** @class */ (function (_super) {
    __extends(ListenerLayer, _super);
    function ListenerLayer(page) {
        var _this = _super.call(this, page) || this;
        _this.page = page;
        return _this;
    }
    /**
     * Listens to messages received
     * @returns Observable stream of messages
     */
    ListenerLayer.prototype.onMessage = function (fn) {
        this.page.exposeFunction(exposed_enum_1.ExposedFn.OnMessage, function (message) {
            return fn(message);
        });
    };
    /**
     * @event Listens to all new messages
     * @param to callback
     * @fires Message
     */
    ListenerLayer.prototype.onAnyMessage = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.page
                    .exposeFunction(exposed_enum_1.ExposedFn.OnAnyMessage, function (message) { return fn(message); })
                    .then(function (_) {
                    return _this.page.evaluate(function () {
                        WAPI.allNewMessagesListener(window['onAnyMessage']);
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    ListenerLayer.prototype.onStateChange = function (fn) {
        var _this = this;
        this.page
            .exposeFunction(exposed_enum_1.ExposedFn.onStateChange, function (state) {
            return fn(state);
        })
            .then(function () {
            return _this.page.evaluate(function () {
                WAPI.onStateChange(function (_) { return window['onStateChange'](_.state); });
            });
        });
    };
    /**
     * @event Listens to messages acknowledgement Changes
     * @returns Observable stream of messages
     */
    ListenerLayer.prototype.onAck = function (fn) {
        this.page.exposeFunction(exposed_enum_1.ExposedFn.onAck, function (ack) { return fn(ack); });
    };
    /**
     * @event Listens to live locations from a chat that already has valid live locations
     * @param chatId the chat from which you want to subscribes to live location updates
     * @param fn callback that takes in a LiveLocation
     * @returns boolean, if returns false then there were no valid live locations in the chat of chatId
     * @emits <LiveLocation> LiveLocation
     */
    ListenerLayer.prototype.onLiveLocation = function (chatId, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var method;
            var _this = this;
            return __generator(this, function (_a) {
                method = 'onLiveLocation_' + chatId.replace('_', '').replace('_', '');
                return [2 /*return*/, this.page
                        .exposeFunction(method, function (liveLocationChangedEvent) {
                        return fn(liveLocationChangedEvent);
                    })
                        .then(function (_) {
                        return _this.page.evaluate(function (_a) {
                            var chatId = _a.chatId, method = _a.method;
                            //@ts-ignore
                            return WAPI.onLiveLocation(chatId, window[method]);
                        }, { chatId: chatId, method: method });
                    })];
            });
        });
    };
    /**
     * @param to group id: xxxxx-yyyy@us.c
     * @param to callback
     * @returns Stream of ParticipantEvent
     */
    ListenerLayer.prototype.onParticipantsChanged = function (groupId, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var method;
            var _this = this;
            return __generator(this, function (_a) {
                method = 'onParticipantsChanged_' + groupId.replace('_', '').replace('_', '');
                return [2 /*return*/, this.page
                        .exposeFunction(method, function (participantChangedEvent) {
                        return fn(participantChangedEvent);
                    })
                        .then(function (_) {
                        return _this.page.evaluate(function (_a) {
                            var groupId = _a.groupId, method = _a.method;
                            //@ts-ignore
                            WAPI.onParticipantsChanged(groupId, window[method]);
                        }, { groupId: groupId, method: method });
                    })];
            });
        });
    };
    /**
     * @event Fires callback with Chat object every time the host phone is added to a group.
     * @param to callback
     * @returns Observable stream of Chats
     */
    ListenerLayer.prototype.onAddedToGroup = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var method;
            var _this = this;
            return __generator(this, function (_a) {
                method = 'onAddedToGroup';
                return [2 /*return*/, this.page
                        .exposeFunction(method, function (chat) { return fn(chat); })
                        .then(function (_) {
                        return _this.page.evaluate(function () {
                            //@ts-ignore
                            WAPI.onAddedToGroup(window.onAddedToGroup);
                        });
                    })];
            });
        });
    };
    return ListenerLayer;
}(profile_layer_1.ProfileLayer));
exports.ListenerLayer = ListenerLayer;

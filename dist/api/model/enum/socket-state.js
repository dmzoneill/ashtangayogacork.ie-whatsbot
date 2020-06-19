"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketState;
(function (SocketState) {
    SocketState["OPENING"] = "OPENING";
    SocketState["PAIRING"] = "PAIRING";
    SocketState["UNPAIRED"] = "UNPAIRED";
    SocketState["UNPAIRED_IDLE"] = "UNPAIRED_IDLE";
    SocketState["CONNECTED"] = "CONNECTED";
    SocketState["TIMEOUT"] = "TIMEOUT";
    SocketState["CONFLICT"] = "CONFLICT";
    SocketState["UNLAUNCHED"] = "UNLAUNCHED";
    SocketState["PROXYBLOCK"] = "PROXYBLOCK";
    SocketState["TOS_BLOCK"] = "TOS_BLOCK";
    SocketState["SMB_TOS_BLOCK"] = "SMB_TOS_BLOCK";
    SocketState["DEPRECATED_VERSION"] = "DEPRECATED_VERSION";
})(SocketState = exports.SocketState || (exports.SocketState = {}));

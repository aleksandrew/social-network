"use strict";
// outsource dependencies
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// local dependencies
var types_1 = require("../constans/types");
var initialState = {
    initialized: false,
    errorMessages: null,
};
exports.selector = function (state) { return state.app; };
var appReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.APP.INITIALIZED_SUCCESS:
            return __assign(__assign({}, state), { initialized: true });
        case types_1.APP.SET_ERROR_MESSAGES: {
            var messages = action.messages;
            return __assign(__assign({}, state), { errorMessages: messages });
        }
        default:
            return state;
    }
};
exports.default = appReducer;

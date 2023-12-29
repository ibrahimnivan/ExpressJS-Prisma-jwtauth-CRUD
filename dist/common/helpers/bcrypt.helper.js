"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcryptjs_1 = require("bcryptjs");
const hash = (password) => {
    return (0, bcryptjs_1.hashSync)(password, 8);
};
exports.hash = hash;
const compare = (password, hashedPassword) => {
    return (0, bcryptjs_1.compareSync)(password, hashedPassword);
};
exports.compare = compare;

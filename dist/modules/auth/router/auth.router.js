"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (req, res) => res.send('oke'));
authRouter.post('/login');
exports.default = authRouter;

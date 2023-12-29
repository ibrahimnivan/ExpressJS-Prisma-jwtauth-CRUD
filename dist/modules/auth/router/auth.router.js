"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_helper_1 = require("../../../common/helpers/validator.helper");
const auth_handler_1 = require("../handler/auth.handler");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validator_helper_1.inputValidator)(auth_handler_1.registerSchema), auth_handler_1.register);
authRouter.post('/login', auth_handler_1.login);
exports.default = authRouter;

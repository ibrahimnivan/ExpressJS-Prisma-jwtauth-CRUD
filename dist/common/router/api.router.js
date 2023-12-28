"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../../modules/auth/router/auth.router"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/auth", auth_router_1.default);
exports.default = apiRouter;

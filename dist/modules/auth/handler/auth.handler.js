"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.registerSchema = void 0;
const prisma_db_1 = __importDefault(require("../../../config/db/prisma.db"));
const yup_1 = require("yup");
const bcrypt_helper_1 = require("../../../common/helpers/bcrypt.helper");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.registerSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        username: (0, yup_1.string)().min(6, "Minimum name is 6 character").max(30, "Maximum is 30 character").required("Username is required"),
        email: (0, yup_1.string)().email().required("Email is required"),
        password: (0, yup_1.string)().min(6, "minimum length of password is 16").max(16, "Maximum length of password is 16").required("Password is required"),
    }),
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign(Object.assign({}, req.body), { password: (0, bcrypt_helper_1.hash)(req.body.password) });
        yield prisma_db_1.default.user.create({
            data: payload,
        });
        return res.status(201).json({
            code: 201,
            message: `User ${req.body.username} created successfully`,
        });
    }
    catch (error) {
        console.log("@@@getBranchByID error", error.message || error);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
        return res.status(400).json({
            code: 400,
            message: "Username or email and password cannot be empty",
        });
    }
    const condition = {};
    if (username) {
        condition.username = username;
    }
    if (email) {
        condition.email = email;
    }
    const user = yield prisma_db_1.default.user.findFirst({
        where: condition,
    });
    if (!user) {
        return res.status(404).json({
            code: 404,
            message: "User not found",
        });
    }
    const isValidUserPassword = (0, bcrypt_helper_1.compare)(password, user.password);
    if (!isValidUserPassword) {
        return res.status(404).json({
            code: 404,
            message: "Invalid username or password",
        });
    }
    const JWT_SECRET = process.env.JWT_SECRET || 'sectet';
    const generatedToken = (0, jsonwebtoken_1.sign)({
        id: user.id,
        username: user.username,
        email: user.email
    }, JWT_SECRET);
    return res.status(200).json({
        code: 200,
        message: "Success",
        data: {
            token: generatedToken
        }
    });
});
exports.login = login;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const branch_router_1 = __importDefault(require("./modules/branch/router/branch.router"));
const api_router_1 = __importDefault(require("./common/router/api.router"));
dotenv_1.default.config(); // tidak berada di dalam if
console.log('dirname', __dirname);
console.log("NODE_ENV:", process.env.NODE_ENV);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/branches', branch_router_1.default);
app.use("/api", api_router_1.default);
app.get('', (req, res, next) => {
    try {
        res.send("kunaon");
    }
    catch (error) {
        next(error);
    }
});
app.listen(port, () => {
    console.log("Server is running on port", port);
});

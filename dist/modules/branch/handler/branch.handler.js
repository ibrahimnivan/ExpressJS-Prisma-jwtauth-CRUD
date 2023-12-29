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
exports.getBranchStats = exports.deleteBranch = exports.updateBranch = exports.getBrancheById = exports.createBranch = exports.getBranches = void 0;
const prisma_db_1 = __importDefault(require("../../../config/db/prisma.db"));
const getBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, contain, page, limit = 5 } = req.query;
        const matchQuery = {};
        if (id) {
            const parsedId = parseInt(id);
            if (isNaN(parsedId)) {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid value of ID query",
                });
            }
            matchQuery.id = parsedId;
        }
        if (name) {
            matchQuery.name = name;
        }
        if (contain) {
            matchQuery.name = {
                contains: contain,
            };
        }
        let skipped = 0;
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        if (parsedPage && !isNaN(parsedPage)) {
            skipped = (parsedPage - 1) * parsedLimit;
        }
        const branches = yield prisma_db_1.default.branch.findMany({
            where: matchQuery,
            skip: skipped,
            take: page ? parsedLimit : undefined
        });
        res.status(200).json({
            code: 200,
            message: "success",
            data: branches,
        });
    }
    catch (error) {
        console.log("createBranch error", error);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
});
exports.getBranches = getBranches;
const createBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location } = req.body;
        if (!name) {
            return res.status(400).json({
                code: 400,
                message: "Name is required",
            });
        }
        if (!location) {
            return res.status(400).json({
                code: 400,
                message: "Location is required",
            });
        }
        const branch = yield prisma_db_1.default.branch.create({
            data: req.body,
        });
        return res.status(201).json({
            code: 201,
            message: "success",
            data: branch,
        });
    }
    catch (error) {
        console.log("createBranch error", error.message || error);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
});
exports.createBranch = createBranch;
const getBrancheById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // antara id tidak ada atau bukan int
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Branch ID",
            });
        }
        const branch = yield prisma_db_1.default.branch.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                manager: true,
                classes: true
            }
        });
        if (!branch) {
            return res.status(404).json({
                code: 404,
                message: `Branch with id ${id} not found`,
            });
        }
        return res.status(200).json({
            code: 200,
            message: `success`,
            data: branch,
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
exports.getBrancheById = getBrancheById;
const updateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        const updatePayload = {};
        const parsedId = parseInt(id);
        // antara id tidak ada atau bukan int
        if (!id || isNaN(parsedId)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Branch ID",
            });
        }
        const branch = yield prisma_db_1.default.branch.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!branch) {
            return res.status(404).json({
                code: 404,
                message: `Branch with id ${id} not found`,
            });
        }
        if (name) {
            updatePayload.name = name;
        }
        if (location) {
            updatePayload.location = location;
        }
        const updatedBranche = yield prisma_db_1.default.branch.update({
            where: { id: parsedId },
            data: updatePayload
        });
        return res.status(200).json({
            code: 200,
            message: 'success',
            data: updatedBranche
        });
    }
    catch (error) {
        console.log("createBranch error", error.message || error);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
});
exports.updateBranch = updateBranch;
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        // antara id tidak ada atau bukan int
        if (!id || isNaN(parsedId)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Branch ID",
            });
        }
        const branch = yield prisma_db_1.default.branch.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!branch) {
            return res.status(404).json({
                code: 404,
                message: `Branch with id ${id} not found`,
            });
        }
        yield prisma_db_1.default.branch.delete({
            where: { id: parsedId },
        });
        return res.status(200).json({
            code: 200,
            message: `branch with id ${parsedId} deleted successfully`
        });
    }
    catch (error) {
        console.log("createBranch error", error.message || error);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
});
exports.deleteBranch = deleteBranch;
const getBranchStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branchStats = yield prisma_db_1.default.branch.aggregate({
            _count: {
                _all: true,
            },
            _min: {
                createdAt: true
            }
        });
        return res.status(200).json({
            code: 200,
            message: `Success`,
            data: branchStats
        });
    }
    catch (error) {
        console.log("createBranch error", error.message || error);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
});
exports.getBranchStats = getBranchStats;

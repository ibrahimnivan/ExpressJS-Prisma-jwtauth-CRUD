"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branch_handler_1 = require("../handler/branch.handler");
const branchRouter = (0, express_1.Router)();
branchRouter.get('/', branch_handler_1.getBranches);
branchRouter.post('/', branch_handler_1.createBranch);
branchRouter.get('/stats', branch_handler_1.getBranchStats); // method ke 6, jangan dibawah getId
branchRouter.get('/:id', branch_handler_1.getBrancheById);
branchRouter.patch('/:id', branch_handler_1.updateBranch);
branchRouter.delete('/:id', branch_handler_1.deleteBranch);
exports.default = branchRouter;

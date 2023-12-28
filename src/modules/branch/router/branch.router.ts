import { Router } from "express";
import { getBranches, createBranch, getBrancheById, updateBranch, deleteBranch, getBranchStats } from "../handler/branch.handler";

const branchRouter = Router()

branchRouter.get('/', getBranches)
branchRouter.post('/', createBranch)
branchRouter.get('/stats', getBranchStats) // method ke 6, jangan dibawah getId
branchRouter.get('/:id', getBrancheById)
branchRouter.patch('/:id', updateBranch)
branchRouter.delete('/:id', deleteBranch)

export default branchRouter

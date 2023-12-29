## Router:
branchRouter.get('/', getBranches)
branchRouter.post('/', createBranch)
branchRouter.get('/stats', getBranchStats) // method ke 6, jangan dibawah getId
branchRouter.get('/:id', getBrancheById)
branchRouter.patch('/:id', updateBranch)
branchRouter.delete('/:id', deleteBranch)


apiRouter.use("/auth", authRouter);

authRouter.post('/register', inputValidator(registerSchema), register )
authRouter.post('/login', login )
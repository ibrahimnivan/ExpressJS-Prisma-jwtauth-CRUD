import { Router } from "express";


const authRouter = Router()

authRouter.post('/register', (req, res) => res.send('oke') )
authRouter.post('/login', )


export default authRouter

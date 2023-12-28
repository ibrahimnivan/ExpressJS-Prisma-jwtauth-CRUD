import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {

  } catch (error: any) {
    console.log("@@@getBranchByID error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}
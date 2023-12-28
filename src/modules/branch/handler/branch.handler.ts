import { Request, Response } from "express";
import PrismaClient from "../../../config/db/prisma.db";

export interface FilterQuery {
  id?: number;
  name?: string | object;
}

export interface UpdatePayload {
  name?: string;
  location?: string;
}

export const getBranches = async (req: Request, res: Response) => {
  try {
    const { id, name, contain, page, limit = 5 } = req.query;
    const matchQuery: FilterQuery = {};

    if (id) {
      const parsedId = parseInt(id as string);

      if (isNaN(parsedId)) {
        return res.status(400).json({
          code: 400,
          message: "Invalid value of ID query",
        });
      }

      matchQuery.id = parsedId;
    }

    if (name) {
      matchQuery.name = name as string;
    }

    if (contain) {
      matchQuery.name = {
        contains: contain,
      };
    }

    let skipped = 0;
    const parsedPage = parseInt(page as string)
    const parsedLimit = parseInt(limit as string)

    if(parsedPage && !isNaN(parsedPage)) {
      skipped = (parsedPage - 1) * parsedLimit
    }

    const branches = await PrismaClient.branch.findMany({
      where: matchQuery,
      skip: skipped,
      take: page ? parsedLimit : undefined
    });

    res.status(200).json({
      code: 200,
      message: "success",
      data: branches,
    });
  } catch (error) {
    console.log("createBranch error", error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export const createBranch = async (req: Request, res: Response) => {
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
    const branch = await PrismaClient.branch.create({
      data: req.body,
    });

    return res.status(201).json({
      code: 201,
      message: "success",
      data: branch,
    });
  } catch (error: any) {
    console.log("createBranch error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export const getBrancheById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // antara id tidak ada atau bukan int
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        code: 400,
        message: "Invalid Branch ID",
      });
    }
    const branch = await PrismaClient.branch.findUnique({
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
  } catch (error: any) {
    console.log("@@@getBranchByID error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const updatePayload: UpdatePayload = {};

    const parsedId = parseInt(id as string);
    

    // antara id tidak ada atau bukan int
    if (!id || isNaN(parsedId)) {
      return res.status(400).json({
        code: 400,
        message: "Invalid Branch ID",
      });
    }
    const branch = await PrismaClient.branch.findUnique({
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

    if(name) {
      updatePayload.name = name;
    }

    if(location) {
      updatePayload.location = location;
    }

    const updatedBranche = await PrismaClient.branch.update({
      where: { id: parsedId },
      data: updatePayload 
    })

    return res.status(200).json({
      code: 200,
      message: 'success',
      data: updatedBranche
    })

  } catch (error: any) {
    console.log("createBranch error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string);
    

    // antara id tidak ada atau bukan int
    if (!id || isNaN(parsedId)) {
      return res.status(400).json({
        code: 400,
        message: "Invalid Branch ID",
      });
    }
    const branch = await PrismaClient.branch.findUnique({
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

  await PrismaClient.branch.delete({
      where: { id: parsedId },
    })

    return res.status(200).json({
      code: 200,
      message: `branch with id ${parsedId} deleted successfully`
    })

  } catch (error: any) {
    console.log("createBranch error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export const getBranchStats = async (req: Request, res: Response) => {
  try {
    const branchStats = await PrismaClient.branch.aggregate({
      _count: {
        _all: true,
      },
      _min: {
        createdAt: true
      }
    })
    return res.status(200).json({
      code: 200,
      message: `Success`,
      data: branchStats
    })
  } catch (error: any) {
    console.log("createBranch error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createCategorieService from "../../services/categories/categoriesCreate.service";

const createCategoriesController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const categories = await createCategorieService({ name });
    return res.status(201).json(categories);
  }  catch (error: any) {
    handleError(error, res);
  }
};

export default createCategoriesController;

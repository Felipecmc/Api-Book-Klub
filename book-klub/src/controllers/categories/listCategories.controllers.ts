import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listCategoriesService from "../../services/categories/listCategories.service";

const listCategoriesController = async (req: Request, res: Response) => {
  try {
    const category = await listCategoriesService();
    return res.status(200).json(category);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default listCategoriesController;
import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { handleError } from "../../errors/appError";
import deleteBooksService from "../../services/books/deleteBooks.service";

const deleteBooksController= async (req: Request, res: Response)=>{
    try{    
        const id = req.params.id;
        const del = await deleteBooksService(id);
        return res.status(204).json({
            message: "Book deleted sucess"
        })
    } catch (error: any) {
        handleError(error, res);
      }
}

export default deleteBooksController;
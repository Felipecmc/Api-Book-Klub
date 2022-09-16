import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import booksUserService from "../../services/users/userBooks.service";
import { instanceToPlain } from "class-transformer";


const booksUserController = async (req: Request, res: Response)=>{
    try{
        const {id} = req.params;

        const books = await booksUserService(id);

        return res.status(200).json(books)
    }catch(error: any){
        return handleError(error, res)
    }
};

export default booksUserController;
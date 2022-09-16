import { Router } from 'express'
import createBooksController from '../controllers/books/createBooks.controllers';
import deleteBooksController from '../controllers/books/deleteBooks.controller';
import listBooksController from '../controllers/books/listBooks.controller';
import admMiddlleware from '../middlewares/adm.middleware';
import AuthMiddlewares from '../middlewares/auth.middleware';


const booksRoutes = Router();

booksRoutes.post('',AuthMiddlewares, createBooksController);
booksRoutes.get('',listBooksController);
booksRoutes.delete('/:id', AuthMiddlewares, admMiddlleware, deleteBooksController);

export default booksRoutes;
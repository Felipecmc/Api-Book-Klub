import { Router } from 'express'
import createCategoriesController from '../controllers/categories/categoriesCreate.controller'
import listCategoriesController from '../controllers/categories/listCategories.controllers';
import authMiddlewares from '../middlewares/auth.middleware'


const categoryRoutes = Router()

categoryRoutes.post('', authMiddlewares, createCategoriesController);
categoryRoutes.get('', authMiddlewares, listCategoriesController)

export default categoryRoutes 
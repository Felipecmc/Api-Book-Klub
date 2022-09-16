import AppDataSource from "../../data-source";
import { CategoriesEntity } from "../../entities/categories.entity";
import { ICategoryRequest } from "../../interfaces/categories";
import { AppError } from "../../errors/appError";

const createCategorieService = async ({
  name,
}: ICategoryRequest): Promise<CategoriesEntity> => {
  const categorieRepository = AppDataSource.getRepository(CategoriesEntity);

  const category = await categorieRepository.find();

  if(!name){
    throw new AppError(400, "The category name is required!")
  }

  const categorieAlreadyExists = category.find(
    (categories) => categories.name === name
  );

  if (categorieAlreadyExists) {
    throw new AppError(400, "Category already exists");
  }

  const categories = categorieRepository.create({
    name,
  });

  await categorieRepository.save(categories);

  return categories;
};

export default createCategorieService;

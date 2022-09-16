import AppDataSource from "../../data-source";
import { CategoriesEntity } from "../../entities/categories.entity";

const listCategoriesService = async():Promise<CategoriesEntity[]> => {

    const CategoryRepository = AppDataSource.getRepository(CategoriesEntity);
    const categoryList = await CategoryRepository.find();
    
    return categoryList;
};
export default listCategoriesService;
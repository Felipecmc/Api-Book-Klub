import AppDataSource from "../../data-source"
import { UsersEntity } from "../../entities/users.entity"
import { AppError } from "../../errors/appError"

const deleteUserService = async(id: string) => {

    const userRepository = AppDataSource.getRepository(UsersEntity)

    const user = await userRepository.findOneBy({id})    

    if(!user){
        throw new AppError(404, "user not found")
    }

    if(user.isActive === false){
        throw new AppError(400, "User already inactive")
    }
    
    user.isActive = false

    await userRepository.save(user)


    return {message: "Soft delete done"}
}       

export default deleteUserService
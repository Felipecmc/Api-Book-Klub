import AppDataSource from "../../data-source"
import {ClubsEntity} from "../../entities/clubs.entity"
import { AppError } from "../../errors/appError"

const deleteclubService = async(id: string):Promise<{message: string}>=> {

    const clubRepository = AppDataSource.getRepository(ClubsEntity)

    const club = await clubRepository.findOneBy({id:id})    
  
    if(!club){
        throw new AppError(404, "Club not found")
    }

    if(club.isActive === false){
        throw new AppError(400, "Club already inactive")
    }
    
    club.isActive = false

    await clubRepository .save(club)


    return {message: "Delete done"}
}       

export default deleteclubService
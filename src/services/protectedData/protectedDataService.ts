import { createProtectedDataRepository, deleteProtectedDataRepository, getProtectedDataByIdRepository, getProtectedDataRepository, updateProtectedDataRepository } from "../../repositories/ProtectedRepository"
import { getUserByIdRepository } from "../../repositories/UserRepository";
import { DataNotFound } from "../../utils/errors/data-not-found-error";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

export const createProtectedDataService = async (data: string, userId: string) => {
    const userExists = await getUserByIdRepository(userId);

     if(!userExists) {
        throw new UserNotFoundError();
     }
   
    return await createProtectedDataRepository(data, userId);
}

export const getProtectedDataService = async () => {
    const dataFound = await getProtectedDataRepository();
        
    if (dataFound.length === 0) {
        throw new DataNotFound();
    }
    return dataFound;
}

export const getProtectedDataByIdService = async (id: string) => {
    const dataFound = await getProtectedDataByIdRepository(id);

        if (!dataFound) {
            throw new DataNotFound();
        } 
        return dataFound;
}

export const deleteProtectedDataService = async (id: string) => {
    const dataFound = await getProtectedDataByIdRepository(id);
    
        if(!dataFound){
            throw new DataNotFound();
        }
    
        return await deleteProtectedDataRepository(id);
}

export const updateProtectedDataService = async (id: string, data: string) => {
     const dataFound = await getProtectedDataByIdRepository(id);
    
         if (!dataFound) {
            throw new DataNotFound();
        }
    
        const updatedData = await updateProtectedDataRepository(id, data)
    
        return updatedData;
}
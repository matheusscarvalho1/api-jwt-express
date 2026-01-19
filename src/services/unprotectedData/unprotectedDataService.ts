import { createUnprotectedDataRepository, deleteUnprotectedDataRepository, getUnprotectedDataByIdRepository, getUnprotectedDataRepository, updateUnprotectedDataRepository } from "../../repositories/UnprotectedRepository";
import { DataNotFound } from "../../utils/errors/data-not-found-error";

export const createUnprotectedDataService = (data: string) => {
  return createUnprotectedDataRepository(data);
};

export const getUnprotectedDataService = async () => {
    const dataFound = await getUnprotectedDataRepository();
    
    if (dataFound.length === 0) {
        throw new DataNotFound();
    }
    
    return dataFound;
}

export const getUnprotectedDataByIdService = async (id: string) => {
    const dataFound = await getUnprotectedDataByIdRepository(id);
    
    if (!dataFound) {
        throw new DataNotFound();
    }
    
    return dataFound;
}

export const updateUnprotectedDataService = async (id: string, data: string) => {
    const dataFound = await getUnprotectedDataByIdRepository(id);

     if (!dataFound) {
        throw new DataNotFound();
    }

    const updatedData = await updateUnprotectedDataRepository(id, data)

    return updatedData;
}

export const deleteUnprotectedDataService = async (id: string) => {
    const dataFound = await getUnprotectedDataByIdRepository(id);

    if(!dataFound){
        throw new DataNotFound();
    }

    return await deleteUnprotectedDataRepository(id);
}
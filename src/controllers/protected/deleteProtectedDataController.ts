import { Request, Response } from "express";
import { deleteProtectedDataService } from "../../services/protectedData/protectedDataService";
import { DataNotFound } from "../../utils/errors/data-not-found-error";

const deleteProtectedData = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    await deleteProtectedDataService(id);

    return res.status(200).json({ message: "Dado deletado com sucesso"});
  }catch(error) {
    if(error instanceof DataNotFound){
      res.status(404).json({
        message: error.message
      })
    }
    console.log(error)
  }
};

export default deleteProtectedData;

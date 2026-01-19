import { z } from 'zod';
import { Request, Response } from "express";
import { refreshTokenService } from "../../services/auth/refreshTokenService";
import { InvalidTokenError } from "../../utils/errors/invalid-token-error";
import { SecretError } from '../../utils/errors/secret-error';


const authUserRefreshToken = async (req: Request, res: Response) => {
  
    try {
      const schema = z.object({
        refreshToken: z.string().min(1, { message: "Refresh token é obrigatório" }),
      }).strict();


      const { refreshToken } = schema.parse(req.body);

      const tokens = await refreshTokenService(refreshToken);


      return res.status(200).json({
      message: "Token renovado com sucesso",
      data: tokens,
    });
    } catch (error) {
      if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    }

    if (error instanceof InvalidTokenError) {
      return res.status(401).json({ 
        message: "Token inválido ou expirado" 
      });
    }

    if (error instanceof SecretError) {
      return res.status(500).json({ 
        message: "Erro de configuração do servidor" 
      });
    }

    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}


export default authUserRefreshToken;

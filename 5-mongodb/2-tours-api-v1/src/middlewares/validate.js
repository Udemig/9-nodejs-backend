import { BadRequest } from "../utils/error.js";
import { z } from "zod";

// İsteğin body / params / query bölümünden gelen veri parametre olarak gelen Zod şemasına uygun mu kontrol et ugyun değilse global hata middleware'ine yönlendir
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    return next(new BadRequest(z.prettifyError(result.error)));
  }

  // Client'ın gönderdiği body/params alanları yerine Zod'un işlenmiş alanlarını isteğe dahil et
  req.validated = result.data;

  next();
};

export default validate;

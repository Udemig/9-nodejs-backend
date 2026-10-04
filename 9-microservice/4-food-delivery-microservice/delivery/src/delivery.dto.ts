import z from "zod";

// DTO: Data Transfer Object - Veri Taşıyan Nesne
// Bu dosyada bu tarz frontend'den gelen verilerin validasyonunu yapan şemalar yer alıcak

// Zod Schema
export const x = z.object({});

// şemalar üzerinden tip oluşturalım
export type X = z.infer<typeof x>;

// bir şema ve veri alıp verinin şemaya uygun olup olmadığını kontrol eden fonksiyon
export function validateDTO<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(z.prettifyError(error));
    }

    throw error;
  }
}

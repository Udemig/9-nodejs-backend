import z from "zod";

// DTO: Data Transfer Object - Veri Taşıyan Nesne
// Bu dosyada bu tarz frontend'den gelen verilerin validasyonunu yapan şemalar yer alıcak

// Zod Schema
export const registerSchema = z.object({
  email: z.email("Geçerli bir email adersi giriniz"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .regex(/[a-z]/, "En az bir küçük harf içermeli")
    .regex(/[A-Z]/, "En az bir büyük harf içermeli")
    .regex(/\d/, "En az bir rakam içermeli")
    .regex(/[^A-Za-z\d]/, "En az bir özel karakter içermeli"),
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  phone: z.string().min(1, "Telefon numarası zorunludur"),
  role: z.enum(["customer", "restaurant_owner", "courier", "admin"]),
});

export const loginSchema = z.object({
  email: z.email("Geçerli bir email adresi giriniz"),
  password: z.string().min(1, "şifre zorunludur"),
});

// şemalar üzerinden tip oluşturalım
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

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

import z from "zod";

// DTO: Data Transfer Object - Veri Taşıyan Nesne
// Bu dosyada bu tarz frontend'den gelen verilerin validasyonunu yapan şemalar yer alıcak

// Zod Schema
export const orderItemSchema = z.object({
  productId: z.string().min(1, "Başlık zorunludur"),
  name: z.string().min(1, "Ürün adı zorunludur"),
  price: z.coerce.number().min(1, "Fiyat 1₺ den küçük olamaz"),
  quantity: z.coerce.number().min(1, "Miktar 1'den küçük olamaz"),
});

export const addressSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  address: z.string().min(1, "Adres zorunludur"),
  city: z.string().min(1, "Şehir zorunludur"),
  district: z.string().min(1, "İlçe zorunludur"),
  postalCode: z.string().min(1, "Posta kodu zorunludur"),
  isDefault: z.boolean().default(true),
});

export const orderSchema = z.object({
  restaurantId: z.string().min(1, "Restoran Id'si zorunludur"),
  deliveryAddress: addressSchema,
  items: z.array(orderItemSchema).min(1, "Sipariş için ürün seçiniz"),
  deliveryFee: z.coerce.number().min(0, "Teslimat ücreti 0₺ den küçük olamaz"),
  paymentMethod: z.enum(["credit_card", "cash", "mobile_payment"]),
  specialInstructions: z.string().optional(),
});

export const statusSchema = z.enum([
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "on_the_way",
  "delivered",
  "cancelled",
]);

// şemalar üzerinden tip oluşturalım
export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type AdressInput = z.infer<typeof addressSchema>;
export type OrderInput = z.infer<typeof orderSchema>;

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

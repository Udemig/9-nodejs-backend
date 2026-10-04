import { z } from "zod";

/*
 * Ortam Değişkenlerini Doğrula
 * Bu sayede env değişkenleri doğru typescript tiplerine sahip olucak
 * Eksik / yanlış bir key olduğunda uyhgulama hiç ayağa kalkmayı denemeden kapanıcak
 * Fail-Fast
 */

const envSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  RABBITMQ_URI: z.string().min(1),
  RATE_LIMIT_WINDOW: z.coerce.number().int().positive(),
  RATE_LIMIT_MAX_REQ: z.coerce.number().int().positive(),
});

export type Env = z.infer<typeof envSchema>;

// env'lerin şema üzerinden kontrolünü yapıp eksik varsa console'a yazan fonksiyon yaz
export function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.log("Geçersiz enviroment konfigürasyonu:");
    console.log(z.prettifyError(result.error));
    process.exit(1);
  }

  return result.data;
}

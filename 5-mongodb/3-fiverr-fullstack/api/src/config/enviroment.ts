import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const config = {
  // enviroment
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  CLIENT_URL: process.env.CLIENT_URL as string,

  // db
  MONGO_URI: process.env.MONGO_URI as string,

  // cloud
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY as string,
  CLOUD_SECRET: process.env.CLOUD_SECRET as string,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES: Number(process.env.JWT_EXPIRES),
};

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";

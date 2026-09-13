import mongoose from "mongoose";

// env'deki veritabanı url'İni al
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

// mevcut bağlantıyı tutucağımız nesne
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};

// veritabanına bağlan ve bağlantıyı cache'e aktar
// fonkisyon tekrar çağrıldığında zaten cache'de bir bağlantı varsa yeni bağlantı oluşturmadan onu kullan
async function connectMongo() {
  // eğer mevcut bir bağlantı varsa onu kullan:
  if (cached.connection) return cached.connection;

  // eğer henüz bir bağlantı kurulmamışsa yeni bağlantı oluştur:
  if (!cached.promise) {
    // bufferCommands: false > vt bağlanmadan önce yapılan sorguların hata vermesini sağlar
    cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false });
  }

  // mevcut bağlantı promise'ini kullanarak vt'na bağlan
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = undefined;
    throw error;
  }

  // kurulan bağlantıyı return et
  return cached.connection;
}

export default connectMongo;

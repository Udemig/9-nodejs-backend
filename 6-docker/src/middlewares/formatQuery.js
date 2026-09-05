import qs from "qs";

const formatQuery = (req, res, next) => {
  // client'dan gelen parametre formatı: { 'price[gt]': '1500', 'rating[lt]': '4' }
  // mongodb'nin istediği format:        { price:{$gt: 1500}, rating:{$lt: 4}}

  // 1) urldeki arama parametresine eriş
  const queryObj = qs.parse(req.query);

  // 2) arama paramteleri arasından sort,fields,page,limit parametrelerini kaldır
  const fields = ["sort", "limit", "page", "fields"];
  fields.forEach((i) => delete queryObj[i]);

  // 3) string methodlarını kullanabilmek için parametreeler nesnesini stringe çevir
  let queryStr = JSON.stringify(queryObj);

  // 4) bütün operatörlerine başına $ koy
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|ne)\b/g, (found) => `$${found}`);

  // 5) queryString'i nesne formatına çevir
  const parsedQuery = JSON.parse(queryStr);

  // 6) req nesnesi içerisine parametreleri ekle
  // Middleware içerisinde oluşturulan bir değerin middleware'den sorna çalışıcak bir fonksiyona iletilmesinin tek yolu req nesnesidir
  req.parsedQuery = parsedQuery;

  // 7) sonraki fonksiyonun çalışmasına izin ver
  next();
};

export default formatQuery;

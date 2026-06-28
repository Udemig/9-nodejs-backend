// Node.js api isteğinin body bölümündeki içeriğe doğrudan tek seferde erişemiyoruz
// İstek - yanıt sürecinin hızlanması için client'ın gönderdiği body içeriğe parça parça (chunk) erişiriz
// Bu fonksiyon içerisinde body parçlarını yakalayıp birleştiricez

const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // client'dan gelen veriyi tuttuğumuz değişken
      let body = "";

      // client'dan her body parçası (chunk) geldiğinde elimizdeki body değişkenine ekle
      req.on("data", (chunk) => {
        // body'nin devamına gelen chunk'ı ekle
        body += chunk;
      });

      // veri aktarma işlemi bittiğinde json verisini js fomatına çevir
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = bodyParser;

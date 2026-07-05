const fs = require("fs");

// parametre olarak aldığı veri ile json dosyasını günceller
module.exports = (data) => {
  fs.writeFileSync(`${__dirname}/../data/db.json`, JSON.stringify(data), (err) => {
    if (err) console.log(err);
    return;
  });
};

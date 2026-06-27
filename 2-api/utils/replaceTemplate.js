// card html'ini ve ürün bilgilerini parametre olarak alan fonksiyon
// html içerisindeki boş bırakılan alanlara ürün bilgilerini yerleştiricek

const replaceTemplate = (html, data) => {
  // html içerisindeki {%PRODUCT_NAME%} gibi değişkenler yerine değerleri (product.name) yazılacak
  let output = html.replaceAll("{%PRODUCTNAME%}", data.productName);
  output = output.replaceAll("{%IMAGE%}", data.image);
  output = output.replaceAll("{%QUANTITY%}", data.quantity);
  output = output.replaceAll("{%PRICE%}", data.price);
  output = output.replaceAll("{%ID%}", data.id);
  output = output.replaceAll("{%FROM%}", data.from);
  output = output.replaceAll("{%NUTRIENTS%}", data.nutrients);
  output = output.replaceAll("{%DESCRIPTION%}", data.description);

  // ürün organik değilse not-organic yaz organikse hiçbişey yazma
  if (!data.organic) {
    output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");
  } else {
    output = output.replaceAll("{%NOT_ORGANIC%}", "");
  }

  return output;
};

// fonksiyonu index.js 'de kullanaiblmek için export et
module.exports = replaceTemplate;

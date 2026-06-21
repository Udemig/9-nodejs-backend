const path = require("path");

/*
 * Sorun:
 Arkadaşlar, Node.js'te bir dosyayı okumak istediğimizde genellikle ./veriler.json gibi göreceli (relative) bir yol kullanma eğilimindeyiz. Ancak Node.js'te ./ ifadesi, kodun bulunduğu dosyayı değil, komut satırını (terminali) nerede açtığınızı referans alır.
*/

//! __dirname
// İçinde yazıldığı dosyanın bilgisayardaki tam klasör yolunu veren, Node.js'e gömülü global bir değişkendir
console.log("Dosyanın bulunduğu klasörün yolu", __dirname); // C:\Users\furka\Desktop\9-nodejs-backend\1-basics

//! __filename
// Dosya ismiyle birlikte dosyanın bilgisayardaki tam yolunu verir
console.log("Dosyanın dolu", __filename); // C:\Users\furka\Desktop\9-nodejs-backend\1-basics\5-path.js

//! path.baseName()
// bir dosya yolunun en son kısmını verir
const filePath = "/Users/udemig/Desktop/nodejs/temel.js";
console.log("basename:", path.basename(filePath)); // temel.js
console.log("basename:", path.basename(filePath, ".js")); // temel

//! path.dirName()
// verilenen dosya yolunun klasör kısmını verir
console.log("dirname:", path.dirname(filePath)); // /Users/udemig/Desktop/nodejs

//! path.extname()
// dosya uzantısını verir
console.log("extaname:", path.extname("temel.jsx")); // .jsx

//! path.join()
// parçaları işletim sisiteminde uygun bir şekilde birleştirir
const filePath2 = __dirname + "/assets/notlar.txt"; // bazı sistemlerde sorun çıkaraiblir

const filePath3 = path.join(__dirname, "assets", "notlar.txt");

console.log(filePath3); // C:\Users\furka\Desktop\9-nodejs-backend\1-basics\assets\notlar.txt

//! path.resolve()
// verilen parçaları kullanarak mutlak bir yol oluşturur
const filePath4 = path.resolve("challange", "makale.txt");

console.log(filePath4); // C:\Users\furka\Desktop\9-nodejs-backend\1-basics\challange\makale.txt

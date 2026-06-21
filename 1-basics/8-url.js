/*
 ! Nodejs url Module
 * url modülü, bir web adresini parçalarına ayırmamızı sağlar
*/

const exaURL = "http://localhost:3000/products/phone?category=apple&page=2#reviews";

const address = new URL(exaURL);

//! Protocol
// Web sitesine hangi yöntemle bağlanıldığını gösterir
// Örnek: http https ftp
console.log(address.protocol);

//! Hostname
// Sitenin alan adıdır (domain)
// Örnek: www.example.com
console.log(address.hostname);

//! Port
// Sunucunun hangi kapıdan çalıştığını gösterir
// Örnek: localhost:3000 localhost:5173
console.log(address.port);

//! Pathname / Sayfa yolu
// Kullanıcının hangi sayfa veya route'a gitmek istediğini gösterir.
// /products/phone
console.log(address.pathname);

//! Query string / Search Params
// Url üzerinden ekstra bilgi göndermek için kullanılan parametrelerdir.
// Genellikle filtreleme arama ve sayfalalama işlemlerinde kullanılır
// ?category=apple&page=2
console.log(address.search);
console.log(address.searchParams.get("category"));
console.log(address.searchParams.get("page"));

//! Hash / Fragment
// Sayfanın belirli bir bölümüne gitmek için kullanılır
// #reviews
console.log(address.hash);

//* Operation System Module: Bilgisayar ve sunucu hakkında bilgi almamızı sağlar
const os = require("os");

//! İşletim sistemi
console.log(os.platform()); // win32

//! İşlemci mimarisi
console.log(os.arch()); // x64

//! İşlemci bilgisi
console.log(os.cpus()[0].model); // AMD Ryzen 7 7800X3D 8-Core Processor
console.log(os.cpus().length); // 16 çekirdekli

//! Ram bilgisi
console.log((os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + "GB"); // 31.17GB
console.log((os.freemem() / 1024 / 1024 / 1024).toFixed(2) + "GB"); // 17.78GB

//! Kullanıcı bilgisi
console.log(os.userInfo().username); // furkan

//! Sitem açık olma süresi
console.log((os.uptime() / 60 / 60).toFixed(2), "saat"); // 3.27 saat

# MongoDB Functions

- insertOne(document) → 1 parametre
- insertMany(documents) → 1 parametre (Array)
- find(filter) → 1 parametre
- findOne(filter) → 1 parametre
- updateOne(filter, update) → 2 parametre
- updateMany(filter, update) → 2 parametre
- replaceOne(filter, replacement) → 2 parametre
- deleteOne(filter) → 1 parametre
- deleteMany(filter) → 1 parametre

# MongoDB Atlas

- MongoDB'nin bulut (Cloud) üzerinde çalışan veritabanı hizmetidir.
- Yani MongoDB'yi kendi bilgisayarınıza kurmak yerine MongoDB şirketinin sunucularında çalıştırırsınız.

## Atlas'ın Avantajlı

- Bilgisarımın açık olmasına gerek yoktur.
- Dünyanın her yerinden erişilebilir
- Yedekleme ve güvenlik gibi özellikler sunar.
- Gerçek proejerlede yaygın olarak kullanılır

# MongoDB Veri Türleri

- string
- - metinsel veri
- - ad soyad, e-posta, açıklama kategori

- boolean
- - true / false değerleri
- - aktif mi? admin mi? gösterelsin mi?

- array
- - birden fazla değeri liste halinde tutar
- - etiketler, roller, çocuklar

- object
- - iç içe json yapısı
- - adres bilgisi, profil bilgisi

- objectId
- - mongodb'Nin kendi 12 byte'lık benzersiz ID'si
- - belge id'lerinde kullanıdılır

- int32 (32 bit integer)
- - 4 byte
- - sadece tam sayı
- - aralık: -2,147,483,648,2,147,483,648
- - en hızlı integer türüdür

- int64 (64 bit integer)
- - 8 byte
- - sadece tam sayı
- - aralık çok büyük

- double (64 bit floating)
- - 8 byte
- - ondalık / küsüratlı sayı

- decimal128
- - 16 byte
- - kesin ondalık (hatasız)
- - 34 basamak hassasiyet
- - bankacılık gibi alanlarda kullanılır

- date
- - mongodb'nin en çok kullanılan tarih türüdür
- - milissaniyeye kadar zamanı tutar
- - javascript'teki Date'in
- - kullanıcı kayıt tarihi / saipariş zamanı .... alanlarda kullanılır

- timestamp
- - mongodb'nin kendi iç mekanizmalarında kullandığı özel bir veri türüdür
- - mongodb arkplandaki operesyonlarda kullanır kendi kayıt ettiğimiz verilerde kullanmayı tercih etmeyiz

- null
- - boş / olmayan değer
- - eksik alanlar

- undefined
- - tanımsız değer
- - henüz ataması yapılmamış alanlarda kullanılır

- binary
- - ham ikili veri tutar
- - dosya, resim, pdf alanlarında kullanılır

# Filtreleme Operatörleri

- Eşitlik filtresi:
- `{name:"Ali"}`

- `{name: {$ne:"Ali"}}`
- Eşit değildir

- `{age: {$gt:18} }`
- Büyüktür (>)

- `{age: {$lt:18} }`
- Küçüktür (<)

- `{age: {$gte:18} }`
- Büyük eşittir (>=)

- `{age: {$lte:18} }`
- Küçük Eşittir (<=)

- `{skills: {$in: ["Sales"]} }`
- Dizide bir eleman varsa filtreler

- `{skills: {$nin: ["Sales"]} }`
- Dizide bir eleman yoksa filtreler

# Mantıksal Operatörleri

- And
- `{$and: [kosul1, kosul2, kosul3]}`
- verilen bütün koşullar gerçekleşirse belgeyi filtreler

- Or
- `{$or: [kosul1, kosul2, kosul3]}`
- verilen koşullardan en az biri gerçekleşirse belgeyi filtreler

- Nor
- `{$nor: [kosul1, kosul2, kosul3]}`
- dizi içerisindeki bütün koşulları tersine çevirir
- verilen koşullardan en az biri gerçekleşirse belgeyi filtreler

- Not
- `{$not: kosul}`
- tanımlanan koşulu tersine çevirir
- büyüktür ===> küçük eşittir
- küçüktür ===> büyük eşittir
- küçük eşittir ===> büyüktür
- büyük eşittir ===> küçüktür
- eşittir ===> eşit değildir

# Diğer Operatörler

- Exists
- `{email: { $exists: true} }`
- `{email: { $exists: false} }`
- Belgede belirli bir alana sahip olan/olmayan belgeleri filtreler

- Regex
- `{name: /kaya/i}`
- Metnin bir kısmı üzerinden filtreleme

- İç İçe Nesneler
- `{"address.country":"Turkey"}`
- İç içe nesnelerde içerideki nesneye erişme yöntemi

- Belirli Değer Aralığı
- `{age: {$gt:30, $lt:40}}`
- Belirli aralıktaki değerleri almak yöntemi

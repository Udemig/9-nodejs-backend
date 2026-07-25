# Enviroment Variables

- Ortam / Çevre değişkenleri

- Projeyi paylaşırken, admin şifresi / veritabanı bağlantı url / api key gibi hasas bilgileri paylaşmak istemeyiz

- Bu noktada projenin çalışması için gerekli olan ama githuba göndermek istemediğimiz değişkenleri .env dosyasında tanımlarız

- .gitignore dosyasınıda .env dosyasını eklersek burada değişkenler kendi bilgisayarımızda çalışırken githuba asla gönderilmez

- Sadece hassas bilgileri değil proje yayınlandıktan sonra değiştirlmesi gerekebilececik verileride genelde .env de tutmayı techih ederiz bu sayede bu değerleri hızlıca güncelleyebilir ve tekrardan yayınlamak zorunda kalmayız. (ör: ŞİFRE YANLIŞ DENEME HAKKI)

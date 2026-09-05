#! BASE IMAGE - TABANA IMAJ
# Nodejs backendimizi çalıştırmak için oluşturucağımız sanal container'ın içerisinde nodejs yüklü olması gerektiğinden base image olarak nodejs'i seçeriz
# 'alpine' versiyonu küçük boyulu daha hızlı yayınlanabilen, Linux işletim sistemine uygun örnektir.
FROM node:20-alpine

#! ÇALIŞMA DİZİNİ
# Projemizin kodlarının container'da hangi dizine yükleniceğini belirle
WORKDIR /app

#! BAĞIMLIKLARI KOPYALAMA
# Projemizdeki package.json dosyasını container'daki /app dizinine kopyala
COPY package*.json ./

#! BAĞIMLILIKLARI İNDİR
# Package.json'ı kopyaladıktan sonra bağımlılıkları indir
RUN npm i

#! KODLARI KOPYALAMA
# Artık tüm uygulamanın kodlarını kopyalayıp container'a aktarmalıyız
# .dockerignore dosyasındaki içerikler aktarılmaz
COPY . .

#! PORT BELİRLEME
# Container'dan bizim cihazımız arasında iletişim kuralacak portu belirle
EXPOSE 3000

#! AYAĞA KALDIRMA
# Express uygulamamızı çalıştır
CMD ["npm","run","dev"]
# Proje Yayınlama

## Build

- Derleme aşamasına verilen isimdir.
- Geliştirme ortamındaki kodları alır, yayınlama ortamı için optimize eder.
- Örn bir react projesinde:
- - tüm js dosyaları birleştirir ve optimize eder
- - tüm css dosyaları birleştirir ve optimize eder
- - gereksiz açıklama satırları silinir
- - ve sonuç olarak bir dist klasörü içerisinde projenin optimize edilmiş, yayına hazır versiyonunu oluştur

## Github / Docker

- Modern yayınlama yöntemlerinde projenin CI/CD sreüci için github veya docker platform'larından birinde olması gerekli

## CI/CD

- Continuous Integration (Sürekli Entegrasyon) ve Continous Delivery (Sürekli Dağıtım)

- **CI**
- Proje yayınladıktan sonra zaman zaman proje üzerinde güncellemeler yapıp githuba göndeririz.

- **CD**
- Githuba gönderilen kodun otomatik olarak build'i alınıp sunucuda yayınlanması işlemidir.

## Hosting (Barındırma)

- Projenin sürekli çalışacağı sunucuta yükleme işlemidir.
- frontend: vercel, netlify, firebase-hosting
- backend: google-cloud, railway, heroku, render
- vps: digitial-ocean, aws, contabo

## Deployment (Dağıtma)

- Projenin yayınlama işlemine denir

## Scaling (Ölçeklendirme)

- Bir sistemin artan kullanıcı, trafik veya veri yükünü kaldırabilecek şekilde büyütülmesi demektir
- Vertical - Dikey Ölçeklendirme: Tek sunucunun gücü arttırılır (CPU,RAM,Disk)
- Horizontal - Yatay Ölçeklendirme: Sunucu sayısını arttırılı

## Load Balancer

- Gelen istekleri birden fazla sunucuya dengeli bir şekilde dağıtan sistemdir.
- Tek sunucun aşırı yüklenmesini önler.
- Sistemin çökmesini engeller
- Performansı arttırır

## DOMAIN

- Internet üzerinden bir adresit. Kullanıcı bir websitesinine girmek için IP adresi (192.168.7.5.3) yerine daha akılda kalıcı bir alan adı (www.amazon.com) kullanılır.

- **Domain Parçaları**
- - www: alt alan adı (sub domain)
- - amazon: asıl alan adı (domain)
- - .com: üst alan (tld)

- **Domain Alınabilecek Platformaları**
- Godaddy, namecheap, natro, isimtescil

## DNS

- Domain Name System, alan adlarını IP adresilerine yönelendirir.
- **A Kaydı**: Bir alana adını IP adresine bağlar (www.furkanevin.online ----> 192.2673.12367.12)
- **CName Kaydı**: Bir domaini başka bir domaine yönlendirir (www.furkanevin.online ----> furkanevin.online)
- **TXT Kaydı**: Metin tabanlı bilgi tutar

# Docker

- Uygulamaları taşınabilir ve izole bir ortamda çalıştırmamızı sağlayan container teknolojisidir

## Image

- Uygulamanın şablonudur
- Örn: Node.js + mongodb + backend kodları

## Container

- Image'ı çalıştırınca elde edilen bir yapıdır.
- Hafif bir sanal makinadır.

## Dockerfile

- Projemizin docker image'ını oluşturmak için kullanılacak komutları belirlediğimiz dosya

## İşleyiş

- Dockerfile --------> Image ---------> Container

- **1- Image Oluşturma**
- docker file'ı çalıştırıp image oluşturma
- `docker build -t tour-api:1 .`

- **2- Container Oluşturma**
- image'ı çalıştırıp contaier oluşturma
- `docker run -p 3000:3000 --name TourApi tour-api:1`

## Container Yönetimi

- **1- Çalışanları Gör**
- `docker ps`

- **2- Hepsini Gör**
- `docker ps -a`

- **3- Container'ı Çalıştır**
- `docker start container-ismi`

- **4- Container'ı Durdur**
- `docker stop container-ismi`

- **4- Container'ı Kaldır**
- `docker rm container-ismi`

# Docker HUB

- Docker HUB, Docker container'larını depoladığımız ve paylaştığımız resmi bulut servisidir.
- Github kod içinse DockerHub image için kullanılır
- DockerHub'a kendi docker image'larımızı yükleyip saklayabiliriz.
- Public veya private olarak image'larımızı paylaşabilirsiniz.
- Sadece kendi image'larımızı değil Node, Mongo, Redis gibi hazır image'larıda kullanabiliriz.

# DockerHub'a Image Gönderme

- **1- Repo Oluştur**
- Dockerhub üzerinden bir repo oluştur

- **2- Image Oluştur**
- Image Oluştururken dockerhub'daki image'ın ismi `kullanıcı_adı/repo:tag` formatında olmalı
- örnek: `docker build -t furkanevin0/tour-api:1 .`

- **3- Giriş Yapma**
- `docker login`

- **4- Dockerhub'a Pushla**
- `docker push furkanevin0/tour-api:1` komutuyla imag'ı dockerhub'a yükle

- **5- DockerHub'dan Image Alma**
- Aynı image üzerinden başka bilgisayarda çalışmak istersek veya ekip arkadaşlarımızla paylaşmak istersek.
- `docker pull kullanici_adi/repo:etiket` komutuyla imajı dockerhub'dan bilgisayarımıza çekebiliriz

- **6- Multiplatform Build**
- linux/amd64 windows
- linux/arm64 apple silicon
- eğer image'ımızı her iki platformda da kullanmak istiyorsak her ikisi için build etmeliyiz
- `docker buildx build --platform linux/amd64,linux/arm64 -t furkanevin0/tour-api:2 --push .`

# Docker Compose

- Birden fazla container'ı aynı sanal ortamda yönetmeye yarayan araçtır
- Birden fazla container'ı tek seferde çalıştırabiliyoruz

## Compose Yönetimi

- **1- Compose Buildi alma**
- `docker compose up -d --build`
- -d: detached yani arkaplanda çalıştır
- --build: docker file'a göre image'ı yeniden build

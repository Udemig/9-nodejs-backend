import {
  FaCode,
  FaPaintBrush,
  FaBullhorn,
  FaPenFancy,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
  FaChalkboardTeacher,
  FaCamera,
  FaShareAlt,
} from "react-icons/fa";

export const categories = [
  { name: "Programlama ve Teknoloji", icon: <FaCode /> },
  { name: "Grafik Tasarım", icon: <FaPaintBrush /> },
  { name: "Dijital Pazarlama", icon: <FaBullhorn /> },
  { name: "Yazma ve Çeviri", icon: <FaPenFancy /> },
  { name: "Video ve Animasyon", icon: <FaVideo /> },
  { name: "Yapay Zeka Hizmetleri", icon: <FaRobot /> },
  { name: "Müzik ve Ses", icon: <FaMusic /> },
  { name: "İş", icon: <FaBriefcase /> },
  { name: "Danışmanlık", icon: <FaUserTie /> },
  { name: "Eğitim ve Ders", icon: <FaChalkboardTeacher /> },
  { name: "Fotoğrafçılık", icon: <FaCamera /> },
  { name: "Sosyal Medya Yönetimi", icon: <FaShareAlt /> },
];

export const infoItems = [
  {
    title: "Uzman işe alım danışmanları",
    text: "Doğru yeteneği bulmanız ve projenizin her ihtiyacını karşılamanız için bir hesap yöneticisine güvenin.",
  },
  {
    title: "Memnuniyet garantisi",
    text: "Eksik teslimatlar için garantili iade ile güvenle sipariş verin.",
  },
  {
    title: "Gelişmiş yönetim araçları",
    text: "Serbest çalışanları ekibinize ve projelerinize sorunsuz bir şekilde entegre edin.",
  },
  {
    title: "Esnek ödeme modelleri",
    text: "Proje başına ödeme yapın veya daha uzun süreli işbirlikleri için saatlik ücret seçeneklerini tercih edin.",
  },
];

export const gigInputs = [
  {
    label: "Başlık",
    name: "title",
  },
  {
    label: "Kapak Fotoğrafı",
    name: "coverImage",
    type: "file",
  },
  {
    label: "Fotoğraflar",
    name: "images",
    type: "file",
    multiple: true,
  },
  {
    label: "Revizyon Sayısı",
    name: "packageRevision",
    type: "number",
    min: 1,
    max: 99,
  },
  {
    label: "Özellikler (, ile ayırın)",
    name: "packageFeatures",
    type: "textarea",
  },
  {
    label: "Açıklama",
    name: "description",
    type: "textarea",
  },
  {
    label: "Paket Açıklama",
    name: "packageDescription",
    type: "textarea",
  },
  {
    label: "Paket Başlığı",
    name: "packageTitle",
  },
  {
    label: "Teslimat Süresi (gün)",
    name: "packageDuration",
    type: "number",
    min: 1,
    max: 99,
  },
  {
    label: "Fiyat ($)",
    name: "packagePrice",
    type: "number",
    min: 1,
  },
  {
    label: "Kategori",
    name: "category",
    type: "select",
    options: categories.map((i) => i.name),
  },
];

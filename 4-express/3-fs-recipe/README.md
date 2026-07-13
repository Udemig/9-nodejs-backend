# Tarif Projesi

- Projeden beklentimiz kullanıcının tarif verileri üzeirnde CRUD işlemleri ve ek olarak filtreleme sıralama gibi özellikleri gerçekleştirebilmesini sağlamak

## Backend Endpoints

- `GET` `/api/recipes` > bütün tarifleri alma
- queryParams a göre sıralama veya filtreleme yapabilecek

- `GET` `/api/recipes/:id` > tarif detayını alma

- `POST` `/api/recipes` > tarif oluşturma
- body bölümünden gelen veriyi kontrol etc

- `PATCH` `/api/recipes/:id` > tarifi güncelle
- body bölümünden gelen veriyi kontrol etc

- `DELETE` `/api/recipes/:id` > tarifi kaldır

## Backend Kütüphaneleri

- express
- nodemon
- cors

# Commonjs vs Module

```jsx
// commonjs  import
const routes = require("./routes");

// module import
import routes from "./routes";

// commonjs export
module.exports = routes;

// module export
export default routes;
```

## Frontend Kütüphaneleri

- react
- react-router-dom
- tailwindcss
- axios
- @tanstack/react-query
- react-select
- lucide-react
- react-toastify

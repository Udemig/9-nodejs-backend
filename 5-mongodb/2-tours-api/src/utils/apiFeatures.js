// Sıralama, filtreleme, alan limitleme, sayfalama gibi özelliklerie projede defalarca ihtiyaç duyduğumuzdan dolayu her gerektiğinde bu özellikleri en baştan yazmamak için yeniden kullanılabilir bir sınıf içerisinde tanımlayalım

class APIFeatures {
  constructor(toursQuery, queryParams, parsedQuery) {
    this.toursQuery = toursQuery; // veritabanı sorgusu
    this.queryParams = queryParams; // arama parametreleri
    this.parsedQuery = parsedQuery; // işlenmiş arama parametreleri
  }

  filter() {
    this.toursQuery = this.toursQuery.find(this.parsedQuery);

    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      this.toursQuery.sort(this.queryParams.sort.replaceAll(",", " "));
    }

    return this;
  }

  select() {
    if (this.queryParams.fields) {
      this.toursQuery.select(this.queryParams.fields.replaceAll(",", " "));
    }

    return this;
  }

  pagination() {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;

    this.toursQuery.limit(limit).skip((page - 1) * limit);

    return this;
  }
}

export default APIFeatures;

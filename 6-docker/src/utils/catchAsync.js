// Controller fonksiyonunu parametre olarak alıp, çalıştırdıktan sonra hata durumunda global hata middleware'ine yönlendiren fonksiyon
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;

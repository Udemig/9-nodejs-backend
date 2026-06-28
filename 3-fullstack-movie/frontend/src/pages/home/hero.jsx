const Hero = ({ setSearchValue }) => {
  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputa girilen yazıya eriş
    const text = e.target[0].value.trim().toLowerCase();

    // girdiyi state'e aktar
    setSearchValue(text);
  };

  return (
    <div className="relative px-6 py-24 md:py-32 overflow-hidden">
      {/* Arkaplan */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-blue-900 to-pink-900 opacity-90" />
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-pink-600/20 animate-pulse" />

      {/* İçerik */}
      <div className="container mx-auto relative z-10 animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Hoşgeldiniz
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-200 mb-8 max-w-3xl">Milyonlarca Film, Dizi ve Aktörleri Keşfedin</p>

        <form onSubmit={handleSubmit} className="mt-8 flex max-w-2xl glass rounded-2xl p-2 shadow-2xl">
          <input
            type="text"
            placeholder="Film, dizi veya aktör arayın..."
            className="flex-1 bg-transparent py-3 px-5 text-white placeholder:text-gray-300 outline-none text-lg"
          />
          <button
            type="submit"
            className="btn-gradient px-8 py-3 font-semibold rounded-xl hover:scale-105 transition duration-300 shadow-lg cursor-pointer"
          >
            Ara
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;

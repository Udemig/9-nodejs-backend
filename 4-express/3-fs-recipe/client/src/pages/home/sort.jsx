const Sort = ({ setOrder }) => {
  return (
    <select className="px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-stone-600 text-sm focus:outline-none focus:border-stone-400 cursor-pointer transition-colors" onChange={(e) => setOrder(e.target.value)}>
      <option value="" disabled>
        Sürye göre sırala
      </option>
      <option value="asc">Artan</option>
      <option value="desc">Azalan</option>
    </select>
  );
};

export default Sort;

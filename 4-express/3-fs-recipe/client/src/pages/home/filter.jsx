import { Search } from "lucide-react";

const Filter = ({ setSearchTerm }) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 size-5" />
      <input
        placeholder="Tarif ara..."
        type="text"
        className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Filter;

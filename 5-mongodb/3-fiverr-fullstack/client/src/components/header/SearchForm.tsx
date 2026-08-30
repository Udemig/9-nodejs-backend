import type { FC, SubmitEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchForm: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = e.target.search.value.trim();

    navigate(`/search?query=${text}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex border rounded overflow-hidden max-w-125 border-zinc-300 shadow-sm"
    >
      <input
        type="text"
        name="search"
        placeholder="Hizmet ara..."
        className="size-full px-3 py-1.5 outline-none"
      />
      <button className="bg-black p-2 text-white text-xl max-sm:hidden">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchForm;

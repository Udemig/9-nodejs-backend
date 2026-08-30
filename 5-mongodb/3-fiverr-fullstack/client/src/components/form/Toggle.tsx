import type { FC } from "react";

interface Props {
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toggle: FC<Props> = ({ setIsSeller }) => {
  return (
    <div className="flex items-center gap-5">
      <label htmlFor="check-apple" className="text-zinc-700">
        Satıcı Hesabını Etkinleştir:
      </label>

      <div className="checkbox-apple">
        <input
          className="yep"
          id="check-apple"
          type="checkbox"
          onChange={(e) => setIsSeller(e.target.checked)}
        />
        <label htmlFor="check-apple"></label>
      </div>
    </div>
  );
};

export default Toggle;

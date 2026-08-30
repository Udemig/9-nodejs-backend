import type { FC } from "react";
import type { FilterParams } from "../../types";

const Title: FC<FilterParams> = ({ search, category }) => {
  return (
    <h1>
      {search ? (
        <p>
          <span className="font-bold">{search}</span> için arama sonuçları
        </p>
      ) : category ? (
        <p>
          <span className="font-bold">{category}</span> kategorisi için sonuçlar
        </p>
      ) : (
        <p className="font-bold">Bütün Sonuçlar</p>
      )}
    </h1>
  );
};

export default Title;

import { Link } from "react-router-dom";
import Field from "./field";
import ReactSelect from "react-select/creatable";
import { useState } from "react";

const Form = ({ isPending, mutate, recipeData }) => {
  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // formdaki verilere eriş
    const formData = new FormData(e.target);
    const recipeData = Object.fromEntries(formData.entries());

    // select alanındaki malzemeleri form verisine ekle
    recipeData.ingredients = ingredients;

    // tarif adımlarını dizi formatına çevir
    recipeData.instructions = recipeData.instructions.split(",");

    // time değerini number'a çevir
    recipeData.time = Number(recipeData.time);

    // form gönderilince
    mutate(recipeData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
      <Field label="Tarif Adı">
        <input
          required
          type="text"
          name="name"
          className="input"
          placeholder="Örn: Mercimek Çorbası"
          defaultValue={recipeData?.name}
        />
      </Field>
      <Field label="Kategori">
        <input
          required
          type="text"
          name="category"
          className="input"
          placeholder="Örn: Çorba, Ana Yemek, Tatlı"
          defaultValue={recipeData?.category}
        />
      </Field>
      <Field label="Ülke">
        <input
          required
          type="text"
          name="country"
          className="input"
          placeholder="Örn: Türkiye"
          defaultValue={recipeData?.country}
        />
      </Field>
      <Field label="Hazırlama Süresi (dakika)">
        <input
          required
          type="number"
          name="time"
          className="input"
          placeholder="Örn: 30,45,60"
          defaultValue={recipeData?.time}
        />
      </Field>
      <Field label="Resim URL">
        <input
          required
          type="text"
          name="image"
          className="input"
          placeholder="Örn: www.unsplash.com/ausgdyasv"
          defaultValue={recipeData?.image}
        />
      </Field>
      <Field label="Malzemeler">
        <ReactSelect
          isMulti
          required
          name="ingredients"
          placeholder="Malzeme yazıp enter'a basın"
          value={ingredients.map((i) => ({ label: i, value: i }))}
          onChange={(options) => setIngredients(options.map((i) => i.value))}
        />
      </Field>
      <Field label="Tarif Adımlar (virgül ile ayırın)">
        <input
          required
          className="input min-h-20"
          name="instructions"
          placeholder="Her adımı virgül ile ayırarak yazınız"
          defaultValue={recipeData?.instructions}
        />
      </Field>
      <Field label="Sunum Önerisi">
        <textarea
          name="serving"
          className="input min-h-20"
          placeholder="Sevis için önerileriniz"
          defaultValue={recipeData?.serving}
        />
      </Field>

      <div className="flex justify-end gap-4 mt-4">
        <Link to="/" className="btn bg-stone-100 text-stone-700">
          İptal
        </Link>

        <button disabled={isPending} className="btn" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default Form;

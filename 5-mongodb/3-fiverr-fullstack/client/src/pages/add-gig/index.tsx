import type { FC, SubmitEvent } from "react";
import { gigInputs } from "../../utils/constants";
import Field from "../../components/form/Field";
import { useCreateGig } from "../../service/gig";

const AddGig: FC = () => {
  const { mutate, isPending } = useCreateGig();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formdaki verierden bir formData nesnesi oluştur
    const formData = new FormData(e.target);

    // api'a istek at
    mutate(formData);
  };

  return (
    <div className="container max-sm:p-5 py-5">
      <h1 className="title">Yeni Hizmet Oluştur</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-x-10">
          {gigInputs.map((item) => (
            <Field key={item.name} {...item} />
          ))}
        </div>

        <div className="flex md:justify-center my-5">
          <button
            disabled={isPending}
            className="form-button bg-green-600 w-1/2 max-md:w-full flex justify-center disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;

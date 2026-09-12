import { handleAction } from "@/utils/actions";

const Form = () => {
  return (
    <form action={handleAction} className="flex flex-col">
      <label className="mt-2 mb-2">İsim</label>
      <input type="text" name="firstName" className="border my-1 rounded-md p-2" />

      <label className="mt-5 mb-2">Yaş</label>
      <input type="number" name="age" className="border my-1 rounded-md p-2" />

      <button className="my-10 bg-white text-black p-1 rounded-lg cursor-pointer">Gönder</button>
    </form>
  );
};

export default Form;

import { useState, type FC, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import Field from "../../components/form/Field";
import Toggle from "../../components/form/Toggle";
import type { RegisterData } from "../../types";
import { useRegister } from "../../service/auth";

const Register: FC = () => {
  const [isSeller, setIsSeller] = useState(false);
  const { mutate, isPending } = useRegister();

  // form gönderilince
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target);

    // bütün inputlardaki verileri nesne formatında al
    const userData = Object.fromEntries(formData.entries()) as unknown as RegisterData;

    // isSeller değerini ekle
    userData.isSeller = isSeller;

    // api'a kayıt isteği at
    mutate(userData);
  };

  return (
    <div className="md:pt-24 max-w-225 mx-auto sm:min-w-100 max-sm:w-full p-5">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="title mb-5">Yeni Hesap Oluştur</h1>

          <Field label="İsim" name="username" />
          <Field label="Email" name="email" type="email" />
          <Field label="Fotoğraf" name="profilePicture" type="file" />
          <Field label="Ülke" name="country" />
          <Field label="Şifre" name="password" type="text" />
        </div>

        <div>
          <h1 className="title mb-5">Satıcı Olmak İstiyorum</h1>

          <Toggle setIsSeller={setIsSeller} />
          <Field label="Telefon" name="phone" disabled={!isSeller} />
          <Field label="Açıklama" name="description" type="textarea" disabled={!isSeller} />

          <button disabled={isPending} type="submit" className="form-button w-full">
            Kaydol
          </button>
        </div>
      </form>

      <p className="mt-5 text-gray-500">
        Hesabınız var mı?{" "}
        <Link to="/login" className="ms-3 text-blue-500">
          Giriş Yapın
        </Link>
      </p>
    </div>
  );
};

export default Register;

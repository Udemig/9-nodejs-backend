import type { FC, SubmitEvent } from "react";
import { Link } from "react-router-dom";
import Field from "../../components/form/Field";
import type { LoginData } from "../../types";
import { useLogin } from "../../service/auth";

const Login: FC = () => {
  const { mutate, isPending } = useLogin();

  // form gönderilince
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const loginData = Object.fromEntries(formData.entries()) as unknown as LoginData;

    mutate(loginData);
  };

  return (
    <div className="container max-sm:px-5">
      <div className="pt-24 max-w-125 mx-auto sm:min-w-100 max-sm:w-full">
        <h1 className="title mb-10">Hesabınıza Giriş Yapın</h1>

        <form onSubmit={handleSubmit}>
          <Field label="Kullanıcı Adı" name="username" />

          <Field label="Şifre" name="password" />

          <button className="form-button" disabled={isPending}>
            Giriş Yap
          </button>
        </form>

        <p className="mt-5 text-gray-500">
          Hesabınız yok mu?{" "}
          <Link to="/register" className="ms-3 text-blue-500">
            Kaydolun
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import delay from "@/utils/delay";

const Login = async () => {
  await delay(2500);

  return (
    <div>
      <h1 className="text-3xl text-center">Login Sayfası</h1>
    </div>
  );
};

export default Login;

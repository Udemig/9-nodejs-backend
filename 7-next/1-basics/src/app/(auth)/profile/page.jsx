import delay from "@/utils/delay";

const Profile = async () => {
  await delay(3000);
  throw new Error("İnternet bağlantınız yavaş!");

  return (
    <div>
      <h1 className="text-3xl text-center">Profil Sayfası</h1>
    </div>
  );
};

export default Profile;

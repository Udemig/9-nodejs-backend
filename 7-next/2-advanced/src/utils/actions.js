"use server";

// server action
export const handleAction = async (formData) => {
  const firstName = formData.get("firstName");
  const age = formData.get("age");

  // api isteğini atabilirissiniz
  // fetch("/login", {name,age})

  // server action'lard doğrudan backend kaynaklarına erişebilir
  // mongodobyeBağlan()
  // veritabanınaEkle()
};

const Error = ({ message, refetch }) => {
  return (
    <div className="h-[80vh] flex justify-center items-center flex-col gap-5">
      <h1>Üzgünüz bir sorun oluştu</h1>
      <p className="text-red-500">{message}</p>
      <button onClick={refetch} className="px-2 py-1 border rounded-sm">
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;

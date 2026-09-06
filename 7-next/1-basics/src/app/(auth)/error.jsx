"use client";

const Error = ({ error, reset }) => {
  return (
    <div className="mt-20 text-center text-red-500">
      <h2>{error.message}</h2>
      <button onClick={reset}>Tekrar Dene</button>
    </div>
  );
};

export default Error;

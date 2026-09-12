"use client";

const Error = ({ error, reset }) => {
  return (
    <div>
      <h1>Hata</h1>
      <button onClick={reset}>Tekrar Dene</button>
    </div>
  );
};

export default Error;

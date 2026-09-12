"use client";

const ClientComponent = ({ children }) => {
  console.log("Client Component Log");

  return (
    <div className="red-box">
      Client Component
      {children}
    </div>
  );
};

export default ClientComponent;

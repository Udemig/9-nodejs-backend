// import { useState } from "react";

import { redirect, notFound } from "next/navigation";
import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";

const About = () => {
  if ("Kullanıcı admin değilse") {
    // return redirect("/");
    return notFound();
  }

  return (
    <div className="text-4xl text-center space-y-10">
      <h1>ABOUT SAYFASI</h1>

      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
};

export default About;

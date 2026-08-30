import type { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Search from "./pages/search";
import Detail from "./pages/detail";
import AddGig from "./pages/add-gig";
import MyGigs from "./pages/my-gigs";
import Footer from "./components/footer";
import Header from "./components/header";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<Detail />} />

            <Route path="/add-gig" element={<AddGig />} />
            <Route path="/my-gigs" element={<MyGigs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import Hero from "./Hero";
import Home from "./Home";
import NotFound from "./NotFound";
import Search from "./Search";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/home" element={<Home />} />
      <Route path="/countries" element={<Search />} />
      <Route path="/countries/:id" element={<CountryDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;

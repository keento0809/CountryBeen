import { Route, Routes } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import Hero from "./Hero";
import Home from "./Home";
import Search from "./Search";
import NotFound from "./NotFound";
import Region from "./Region";
import Listing from "./Listing";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/home" element={<Home />} />
      <Route path="/record" element={<Listing name={"Record"} />} />
      <Route path="/bucket-list" element={<Listing name={"Bucket List"} />} />
      <Route path="/countries" element={<Search />} />
      <Route path="/countries/region/:region" element={<Region />} />
      <Route path="/countries/:id" element={<CountryDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;

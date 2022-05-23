import { Route, Routes } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import Hero from "./Hero";
import Home from "./Home";
import Search from "./Search";
import BucketList from "./BucketList";
import NotFound from "./NotFound";
import BeenTo from "./BeenTo";
import Region from "./Region";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/home" element={<Home />} />
      <Route path="/beento" element={<BeenTo />} />
      <Route path="/bucket-list" element={<BucketList />} />
      <Route path="/countries" element={<Search />} />
      <Route path="/countries/region/:region" element={<Region />} />
      <Route path="/countries/:id" element={<CountryDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;

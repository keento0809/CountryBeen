import { Route, Routes } from "react-router-dom";
import Hero from "./Hero";
import Home from "./Home";
import NotFound from "./NotFound";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;

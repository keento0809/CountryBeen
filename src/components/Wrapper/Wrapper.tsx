import Header from "../Nav/Header";
import { Children } from "../../types/index";
import imgUrl from "../../assets/revisedHeroBg-1.jpg";

const Wrapper = ({ children }: Children) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <div className="min-h-screen px-5 sm:px-8">
        <Header />
        <div className="pt-16 mx-auto max-w-374 lg:max-w-780">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;

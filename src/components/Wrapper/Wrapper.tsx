import Header from "../../layouts/Header";
import { ChildrenType } from "../../models/model";
import imgUrl from "../../assets/homeBg.jpg";

const Wrapper = ({ children }: ChildrenType) => {
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

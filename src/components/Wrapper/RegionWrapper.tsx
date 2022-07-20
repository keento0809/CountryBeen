import Header from "../../layouts/Header";
import { RegionWrapperType } from "../../models/model";
import imgUrl from "../../assets/test-cardBg.jpg";

const RegionWrapper = ({ children, imageUrl }: RegionWrapperType) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <div className="min-h-screen px-5 sm:px-8">
        <Header />
        <div className="pt-16">{children}</div>
      </div>
      ;
    </div>
  );
};

export default RegionWrapper;

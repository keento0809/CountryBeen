import { ChildrenType } from "../../models/model";
import imgUrl from "../../assets/test-cardBg.jpg";

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
      <div className="min-h-screen px-5 sm:px-8">{children}</div>;
    </div>
  );
};

export default Wrapper;

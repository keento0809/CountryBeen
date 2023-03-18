import Header from "../Nav/Header";
import imgUrl from "../../assets/revisedHeroBg-1ver2.jpg";

type Props = {
  children: React.ReactNode;
  customStyle?: string;
};

const Wrapper = ({ children, customStyle }: Props) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        minHeight: "100svh",
      }}
    >
      <div className="px-5 sm:px-8">
        <Header />
        <div className={`pt-16 mx-auto ${customStyle && customStyle}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

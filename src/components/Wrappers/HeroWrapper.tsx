import imgUrl from "../../assets/revisedHeroBg-1ver2.jpg";

type Props = {
  children: React.ReactNode;
};

const HeroWrapper = ({ children }: Props) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};

export default HeroWrapper;

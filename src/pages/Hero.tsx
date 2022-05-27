import { Link } from "react-router-dom";
import imgLink from "../assets/revisedHeroBg.jpg";

const Hero = () => {
  return (
    <div className="overflow-hidden">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${imgLink})`,
          backgroundSize: "cover",
          // backgroundPosition: "50% 50%",s
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content rounded-lg bg-slate-800 bg-opacity-70 text-center text-neutral-content p-8">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">CountryBeen</h1>
            <p className="mb-5 text-slate-300">
              Have you ever consider how many countries you've been to so far
              and analyzing it visually? Here's the best tool making that
              request happen. Start a brand new adventure here!
            </p>
            <button className="btn btn-secondary btn-outline">
              <Link to="/home">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
// "backgroundImage: url(https://api.lorem.space/image/fashion?w=1000&h=800);"

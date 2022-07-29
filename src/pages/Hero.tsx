import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthSignupForm from "../components/form/AuthSignupForm";
import AuthLoginForm from "../components/form/AuthLoginForm";
import imgLink from "../assets/revisedHeroBg.jpg";

const Hero = () => {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className="overflow-hidden">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${imgLink})`,
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="w-11/12 mx-auto md:w-7/12">
          <div className="hero-content rounded-lg bg-slate-800 bg-opacity-70 text-center text-neutral-content p-8 lg:p-12 max-w-600 mx-auto">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl lg:text-5xl font-bold text-white">
                CountryBeen
              </h1>
              <p className="mb-5 text-slate-300">
                Have you ever consider how many countries you've been to so far
                and analyzing it visually? Here's the best tool making that
                request happen. Start a brand new adventure here!
              </p>
              {/* <Link to="/home">Get Started</Link> */}
              <p className="mb-2 text-sm">
                {isSignup ? "Have an account?" : "Need an account?"}{" "}
                <span
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-secondary"
                >
                  {isSignup ? "Login" : "Signup"}
                </span>{" "}
                here!
              </p>
              {/* <button className="btn btn-secondary btn-outline">
                <Link to="/home">Get Started</Link>
              </button> */}
              {/* test */}
              {isSignup && <AuthSignupForm />}
              {!isSignup && <AuthLoginForm />}
              {/* <div>
                Need an account?
                <Link to={}>Signup</Link> here! `
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
// "backgroundImage: url(https://api.lorem.space/image/fashion?w=1000&h=800);"

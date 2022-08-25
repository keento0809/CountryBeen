import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import AuthSignupForm from "../components/form/AuthSignupForm";
import AuthLoginForm from "../components/form/AuthLoginForm";
import imgLink from "../assets/revisedHeroBg-1.jpg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Alert from "../components/UI/Alert/Alert";
import { RootState } from "../store";
import { fetchCountries } from "../store/countries-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";

const Hero = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isError, setIsError] = useState("");

  const { isAlerting, alertText } = useSelector(
    (state: RootState) => state.AlertReducer
  );
  const { countries } = useSelector(
    (state: RootState) => state.countriesReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

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
        <div className="w-11/12 mx-auto">
          <div className="hero-content rounded-lg bg-slate-800 bg-opacity-70 text-center text-neutral-content p-8 lg:p-12 max-w-600 lg:max-w-700 mx-auto">
            <div className="max-w-md lg:max-w-500">
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
                  className="text-secondary cursor-pointer"
                >
                  {isSignup ? "Login" : "Signup"}
                </span>{" "}
                here!
              </p>
              {isSignup && <AuthSignupForm setIsError={setIsError} />}
              {!isSignup && <AuthLoginForm setIsError={setIsError} />}
            </div>
          </div>
        </div>
        {isAlerting && <Alert text={alertText} />}
        {isError && <Alert text={isError} />}
      </div>
    </div>
  );
};

export default Hero;
// "backgroundImage: url(https://api.lorem.space/image/fashion?w=1000&h=800);"

import { useState, useEffect } from "react";
import AuthSignupForm from "../../components/form/AuthSignupForm";
import AuthLoginForm from "../../components/form/AuthLoginForm";
import Alert from "../../components/Alert/Alert";
import { RootState } from "../../store";
import { fetchCountries } from "../../store/countries-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import HeroTab from "./HeroTab";

const HeroContainer = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isError, setIsError] = useState("");
  const { isAlerting, alertText } = useSelector(
    (state: RootState) => state.AlertReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="hero-content rounded-lg bg-slate-800 bg-opacity-70 text-center text-neutral-content p-8 lg:p-12 max-w-600 lg:max-w-700 mx-auto">
          <div className="max-w-md lg:max-w-500">
            <HeroTab isSignup={isSignup} onClick={setIsSignup} />
            {isSignup && <AuthSignupForm setIsError={setIsError} />}
            {!isSignup && <AuthLoginForm setIsError={setIsError} />}
          </div>
        </div>
      </div>
      {isAlerting && <Alert text={alertText} />}
      {isError && <Alert text={isError} />}
    </>
  );
};

export default HeroContainer;

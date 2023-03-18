import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AlertActions } from "../../store/alert-slice";
import { AuthActions } from "../../store/auth-slice";
import { AuthFormProps } from "../../types/index";

const AuthForm = ({ setIsError }: AuthFormProps) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const authentication = (email: string, password: string) => {
    if (email === "" || password === "") {
      alert("Invalid credentials");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(AuthActions.signIn());
        localStorage.setItem("currUser", userCredential.user.uid);
        navigate("/home");
        setTimeout(() => {
          dispatch(AlertActions.turnOnAlert("Successfully logged in!"));
        }, 200);
        setTimeout(() => {
          dispatch(AlertActions.turnOffAlert());
        }, 1500);
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsError(errorMessage);
        setTimeout(() => {
          setIsError("");
        }, 2500);
        console.log(errorCode, error);
      });
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    authentication(userInfo.email, userInfo.password);
  };

  const handleGuestLogin = () => {
    const guestUserEmail: string = process.env.REACT_APP_GUEST_USER_EMAIL!;
    const guestUserPass: string = process.env.REACT_APP_GUEST_USER_PASS!;
    authentication(guestUserEmail, guestUserPass);
  };

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-slate-50 rounded-md shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-pink-400 focus:ring-pink-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-pink-400 focus:ring-pink-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end md:justify-center mt-6 md:mt-12">
            <button className="btn btn-secondary btn-outline">
              Get Started
            </button>
          </div>
        </form>
        <div className="">
          <span
            className="inline-block mt-6 text-xs cursor-pointer text-secondary"
            onClick={handleGuestLogin}
          >
            Login as guest user
          </span>
        </div>
      </section>
    </>
  );
};

export default AuthForm;

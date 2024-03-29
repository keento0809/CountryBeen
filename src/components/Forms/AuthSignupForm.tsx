import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useDispatch } from "react-redux";
import { AlertActions } from "../../store/alert-slice";
import { AuthActions } from "../../store/auth-slice";
import { AuthFormProps } from "../../types/index";
import ButtonWithoutLink from "../Button/ButtonWithoutLink";

const AuthForm = ({ setIsError }: AuthFormProps) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
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

  const setUserDoc = async (userId: string, userEmail: string) => {
    await setDoc(doc(db, "users", userId), {
      id: userId,
      email: userEmail,
      bucketList: [],
      record: [],
    });
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (
      userInfo.username === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.passwordConfirmation === "" ||
      userInfo.password !== userInfo.passwordConfirmation
    ) {
      alert("Invalid submission");
      return;
    }

    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        localStorage.setItem("currUser", userCredential.user.uid);
        setUserDoc(userCredential.user.uid, userCredential.user.email!);
        dispatch(AuthActions.signIn());
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
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-slate-50 rounded-md shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-pink-400 focus:ring-pink-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
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
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-pink-400 focus:ring-pink-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                value={userInfo.passwordConfirmation}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-pink-400 focus:ring-pink-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <ButtonWithoutLink text={"Get Started"} />
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;

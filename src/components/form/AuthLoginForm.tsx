import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(userInfo);
  };
  return (
    <Fragment>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="btn btn-secondary btn-outline">
              Get Started
              {/* <Link to="/home">Get Started</Link> */}
            </button>
          </div>
          <div className="">
            <span className="inline-block mt-6 text-xs">
              Login as guest user
            </span>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default AuthForm;

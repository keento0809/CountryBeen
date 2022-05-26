import { useState, Fragment, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CountryViewObj } from "../models/model";

const Header = () => {
  // declare useState
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

  // declare useNavigate
  const navigate = useNavigate();

  function fetchCountryData() {
    setIsLoading(true);

    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;

        const loadedData = [];
        for (const key in resData) {
          loadedData.push({
            name: resData[key].name.common,
            population: resData[key].population,
            continents: resData[key].continents,
            capital: resData[key].capital,
            currencies: resData[key].currencies,
            languages: resData[key].languages,
            coatOfArms: resData[key].coatOfArms.png,
            flagImg: resData[key].flags.png,
            flagIcon: resData[key].flag,
            cca3: resData[key].cca3,
            borders: resData[key].borders,
          });
        }
        setDefaultData(loadedData);
        // setCountryData(loadedData);
      })
      .catch((error) => console.log(error.message));
    setIsLoading(false);
  }

  function handleCheckValue() {
    const currValue = searchInputRef.current!.value;
    if (currValue === "") {
      setIsSearching(false);
      setCountryData([]);
      return;
    } else {
      setIsSearching(true);
    }
    const filteredData = defaultData.filter((country) =>
      country.name
        .toLowerCase()
        .includes(searchInputRef.current!.value.toLowerCase())
    );
    setCountryData(filteredData);
  }

  function handleSearch() {
    setIsSearchMode(true);
  }

  function handleCloseSearch() {
    setIsSearchMode(false);
  }

  function handleTransition() {
    setIsSearchMode(false);
    setIsSearching(false);
    searchInputRef.current!.value = "";
  }

  function handleOpenMenu() {
    console.log("testing menu...");
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <Fragment>
      {isMenuOpen && (
        <Fragment>
          <div className="z-30 backdrop fixed top-0 left-0 right-0 bottom-0 w-full bg-slate-900 opacity-90"></div>
          <section className="z-40 py-4 px-5 fixed top-0 right-0 w-full mx-auto">
            {/* <p className="text-white">Menu is open now.</p> */}
            <svg
              onClick={handleCloseMenu}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white mr-3 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="menuNav text-white flex flex-col justify-center items-center">
              <Link to={"/home"} className="py-5">
                HOME
              </Link>
              <Link to={"/record"} className="py-5">
                Record
              </Link>
              <Link to={"/bucket-list"} className="py-5">
                BucketList
              </Link>
              <Link to={"/countries"} className="py-5">
                Countries
              </Link>
            </div>
          </section>
        </Fragment>
      )}
      {isSearchMode && (
        <Fragment>
          <div className="z-30 backdrop fixed top-0 left-0 right-0 bottom-0 w-full bg-slate-900 opacity-80"></div>
          <section className="z-40 py-4 px-5 md:px-8 fixed top-0 right-0 w-4/5 mx-auto">
            <div className="flex flex-row items-center justify-end">
              <svg
                onClick={handleCloseSearch}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white mr-3 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Country"
                className="bg-white mb-4 input input-bordered input-primary w-full max-w-258 md:max-w-320 max-w-xs outline-none border-0"
                onKeyUp={handleCheckValue}
              />
            </div>
            <div className="bg-white max-w-258 md:max-w-320 max-h-640 overflow-scroll ml-auto rounded-md p-4">
              {!isSearching && (
                <p className="text-slate-900 text-md">No countries searched.</p>
              )}
              {isSearching && countryData.length === 0 && (
                <p className="text-slate-900 text-xl">No result matched.</p>
              )}
              {isSearching &&
                countryData.map((country, index) => {
                  return (
                    <Link
                      to={`/countries/${country.cca3}`}
                      onClick={() => handleTransition()}
                      key={index}
                      className="py-3 block"
                    >
                      <p className="text-slate-900 text-xl">{country.name}</p>
                    </Link>
                  );
                })}
            </div>
          </section>
        </Fragment>
      )}
      <header className="fixed top-0 left-0 w-full bg-transparent text-slate-100">
        <div className="navbar lg:hidden mx-auto md:px-6">
          <div className="navbar-start">
            <div className="dropdown">
              <label tab-index="0" className="btn btn-ghost btn-circle">
                <svg
                  onClick={handleOpenMenu}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tab-index="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Homepage</a>
                </li>
                <li>
                  <a>Portfolio</a>
                </li>
                <li>
                  <a>About</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Link to="/home" className="btn btn-ghost normal-case text-xl">
              CountryBeen
            </Link>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
              <svg
                onClick={handleSearch}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:block mx-auto px-6">
          <div className="flex flex-row items-center justify-between">
            <div className="nav-left">
              <Link to="/home" className="btn btn-ghost normal-case text-xl">
                CountryBeen
              </Link>
            </div>
            <div className="nav-right flex justify-center items-center min-w-300">
              <nav className="nav-list grow flex justify-between items-center">
                {/* <Link to={"/home"} className="py-5">
                HOME
              </Link> */}
                <button className="btn btn-ghost btn-circle">
                  <svg
                    onClick={handleSearch}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <Link to={"/record"} className="text-sm">
                  Record
                </Link>
                <Link to={"/bucket-list"} className="text-sm">
                  BucketList
                </Link>
                <Link to={"/countries"} className="text-sm">
                  Countries
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;

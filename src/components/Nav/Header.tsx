import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Countries, CountryViewObj } from "../../types/country";
import { getAuth, signOut } from "firebase/auth";
import { AlertActions } from "../../store/alert-slice";
import { AuthActions } from "../../store/auth-slice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchCountries } from "../../store/countries-slice";
import Menu from "../Backdrop/Menu";
import { createCountryObj } from "../../helpers/Listing";

const Header = () => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { countries }: Countries = useSelector(
    (state: RootState) => state.countriesReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  const setCountriesForSearch = () => {
    const resData = countries;
    const loadedData: CountryViewObj[] = createCountryObj(resData);
    setDefaultData(loadedData);
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    countries.length === 0 && dispatch(fetchCountries());
    setIsMenuOpen(false);
  }, [window.location.pathname]);

  useEffect(() => {
    setCountriesForSearch();
  }, [countries.length]);

  const handleCheckValue = () => {
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
  };

  const handleToggleSearch = () => {
    setIsSearchMode(!isSearchMode);
  };

  const handleTransition = () => {
    setIsSearchMode(false);
    setIsSearching(false);
    searchInputRef.current!.value = "";
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("currUser");
        dispatch(AuthActions.signOut());
        setTimeout(() => {
          dispatch(AlertActions.turnOnAlert("Successfully signed out!"));
        }, 200);
        navigate("/");
        setTimeout(() => {
          dispatch(AlertActions.turnOffAlert());
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {isMenuOpen && (
        <Menu onClickIcon={handleToggleMenu} onClick={handleSignOut} />
      )}
      {isSearchMode && (
        <div className="fixed z-40">
          <div className="z-30 backdrop fixed top-0 left-0 right-0 bottom-0 w-full bg-slate-900 opacity-80"></div>
          <section className="z-40 py-4 px-5 md:px-8 fixed top-0 right-0 w-4/5 mx-auto">
            <div className="flex flex-row items-center justify-end">
              <svg
                onClick={handleToggleSearch}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white mr-3 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ cursor: "pointer" }}
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
                className="bg-white dark:text-slate-600 mb-4 input input-bordered input-primary w-full max-w-258 md:max-w-320 max-w-xs outline-none border-0"
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
        </div>
      )}
      <header className="fixed top-0 left-0 w-full bg-transparent text-slate-100">
        <div className="navbar lg:hidden mx-auto md:px-6">
          <div className="navbar-start">
            <div className="dropdown">
              <label tab-index="0" className="btn btn-ghost btn-circle">
                <svg
                  onClick={handleToggleMenu}
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
                onClick={handleToggleSearch}
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
            <div className="nav-right flex justify-center items-center min-w-400 lg:min-w-450 xl:min-w-600">
              <nav className="nav-list grow flex justify-between items-center">
                <button className="btn btn-ghost btn-circle">
                  <svg
                    onClick={handleToggleSearch}
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
                <Link
                  to={"/record"}
                  className="text-sm btn-ghost py-1 px-3 rounded-lg"
                >
                  Record
                </Link>
                <Link
                  to={"/bucket-list"}
                  className="text-sm btn-ghost py-1 px-3 rounded-lg"
                >
                  BucketList
                </Link>
                <Link
                  to={"/countries"}
                  className="text-sm btn-ghost py-1 px-3 rounded-lg"
                >
                  Countries
                </Link>
                <span
                  className="text-sm btn-ghost py-1 px-3 rounded-lg cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign out
                </span>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

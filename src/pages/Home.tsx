import Header from "../layouts/Header";
import Wrapper from "../components/UI/Wrapper";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const styling = {
  "--value": 70,
};

const Home = () => {
  // declare selector
  const totalNumber = useSelector(
    (state: RootState) => state.favoriteReducer.totalNumber
  );
  const totals = useSelector((state: RootState) => state.beenReducer.totals);
  const beenToList = useSelector(
    (state: RootState) => state.beenReducer.beenToList
  );

  console.log(beenToList);

  const percentage = (totals / 250) * 100;

  return (
    <Fragment>
      <Wrapper>
        <Header />
        <div className="pt-16">
          <section className="mapping"></section>
          <section className="to-search flex flex-row items-center">
            <button className="btn btn-wide basis-1/2">
              <Link to="/countries" className="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                Search
              </Link>
            </button>
            <button className="btn btn-wide basis-1/2">
              <Link to="/bucket-list" className="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                BucketList
              </Link>
            </button>
          </section>
          <section className="statistic-data py-4">
            <div className="stats shadow flex flex-col">
              <div className="stat basis-4/12 pb-3">
                <div className="stat-figure text-secondary">
                  <Link to="/beento">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block w-8 h-8 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="stat-title">You've been to</div>
                <div className="stat-value">{totals}</div>
                <div className="stat-desc">Countries</div>
              </div>

              <div className="stat basis-4/12">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      //   stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Percentage</div>
                <div className="stat-value">{percentage}%</div>
                <div className="stat-desc">{totals}/250</div>
              </div>

              <div className="stat basis-4/12">
                <div className="stat-figure text-secondary">
                  <Link to="/bucket-list">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block w-8 h-8 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="stat-title">Number of Bucket-list</div>
                <div className="stat-value">{totalNumber}</div>
                <div className="stat-desc">Countries</div>
              </div>
            </div>
          </section>
          {/* <section className="trying">
            <div className="radial-progress text-white">70%</div>
          </section> */}
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default Home;

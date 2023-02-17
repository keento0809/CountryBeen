import { Link } from "react-router-dom";

type DataObj = {
  totalBeenToCountries: number;
  percentage: number;
  totalFavoriteCountries: number;
};

type Props = {
  isLoading: boolean;
  data: DataObj;
};

const UserDashboard = ({ isLoading, data }: Props) => {
  return (
    <div className="statistic-data pt-2 xl:pt-0 xl:min-w-500 pb-5 md:basis-3/5">
      <div className="stats shadow flex flex-col">
        <div className="stat basis-4/12 pb-3">
          <div className="stat-figure text-secondary">
            <Link to="/record">
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
          <div className="stat-value">
            <span
              className={`${isLoading ? "hidden" : "block"} dark:text-slate-50`}
            >
              {data.totalBeenToCountries}
            </span>
          </div>
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
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Achievement rate</div>
          <div className="stat-value">
            <span
              className={`${isLoading ? "hidden" : "block"} dark:text-slate-50`}
            >
              {data.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="stat-desc">
            {data.totalBeenToCountries} / 245 Countries
          </div>
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
          <div className="stat-value">
            <span className={`${isLoading && "hidden"} dark:text-slate-50`}>
              {data.totalFavoriteCountries}
            </span>
          </div>
          <div className="stat-desc">Countries</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

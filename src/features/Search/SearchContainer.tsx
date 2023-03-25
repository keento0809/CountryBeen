import { Link } from "react-router-dom";
import { regionArrFixed } from "../../data/data";
import RegionCard from "../../components/Cards/RegionCard";
import Title from "../../components/Title/Title";

const SearchContainer = () => {
  const regionData = regionArrFixed;
  return (
    <>
      <Title title={"Select Region"} />
      <section className="countries lg:pb-6">
        <div className="countries-container max-h-680 overflow-scroll md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:max-w-1024 xl:mx-auto">
          {regionData.length === 0 && (
            <p className="text-slate-800">Loading...</p>
          )}
          {regionData &&
            regionData.map((region, index) => {
              return (
                <Link
                  to={`/countries/region/${region}`}
                  key={index}
                  className="lg:block lg:max-w-374"
                >
                  <RegionCard region={region} />
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default SearchContainer;

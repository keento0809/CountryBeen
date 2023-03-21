import Wrapper from "../components/Wrappers/Wrapper";
import SearchContainer from "../features/Search/SearchContainer";
import RegionWrapper from "../components/Wrappers/RegionWrapper";

const Search = () => {
  return (
    <RegionWrapper customStyle={`md:max-w-374 lg:max-w-780 xl:max-w-full`}>
      <SearchContainer />
    </RegionWrapper>
  );
};

export default Search;

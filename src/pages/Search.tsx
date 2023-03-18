import Wrapper from "../components/Wrappers/Wrapper";
import SearchContainer from "../features/Search/SearchContainer";

const Search = () => {
  return (
    <Wrapper customStyle={`md:max-w-374 lg:max-w-780 xl:max-w-full`}>
      <SearchContainer />
    </Wrapper>
  );
};

export default Search;

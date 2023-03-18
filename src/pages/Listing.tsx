import Wrapper from "../components/Wrappers/Wrapper";
import CountriesList from "../features/Listing/CountriesList";

type ListingName = {
  name: string;
};

const Listing = ({ name }: ListingName) => {
  return (
    <Wrapper customStyle={`max-w-374 md:max-w-full`}>
      <CountriesList name={name} />
    </Wrapper>
  );
};

export default Listing;

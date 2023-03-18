import Wrapper from "../components/Wrappers/Wrapper";
import HomeContainer from "../features/Home/HomeContainer";

const Home = () => {
  return (
    <Wrapper customStyle={`max-w-374 md:max-w-600 xl:max-w-none`}>
      <HomeContainer />
    </Wrapper>
  );
};

export default Home;

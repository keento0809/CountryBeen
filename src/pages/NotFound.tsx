import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Wrapper from "../components/UI/Wrapper";

const NotFound = () => {
  return (
    <Wrapper>
      {/* <Header /> */}
      <div className="">
        <p>Page Not Found</p>
        <Link to="/">BACK</Link>
      </div>
    </Wrapper>
  );
};

export default NotFound;

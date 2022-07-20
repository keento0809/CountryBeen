import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Wrapper from "../components/Wrapper/Wrapper";

const NotFound = () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-start items-center min-h-screen pt-8">
        <p className="text-slate-100 text-2xl pb-6">Page Not Found</p>
        <button className="btn btn-secondary btn-outline">
          <Link to="/" className="">
            BACK
          </Link>
        </button>
      </div>
    </Wrapper>
  );
};

export default NotFound;

import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";

const NotFound = () => {
  console.log(Boolean(localStorage.getItem("currUser")));
  return (
    <Wrapper>
      <div className="flex flex-col justify-start items-center min-h-screen pt-8">
        <p className="text-slate-100 text-2xl pb-6">Page Not Found</p>
        <Link to="/">
          <button className="btn btn-secondary btn-outline">BACK</button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default NotFound;

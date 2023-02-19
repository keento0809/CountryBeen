import { Link } from "react-router-dom";

const NotFoundContainer = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-8 pb-32">
      <p className="text-slate-100 text-2xl pb-6">Page Not Found</p>
      <Link to="/">
        <button className="btn btn-secondary btn-outline">BACK</button>
      </Link>
    </div>
  );
};

export default NotFoundContainer;

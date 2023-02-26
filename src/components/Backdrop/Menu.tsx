import { Link } from "react-router-dom";

type Props = {
  onClick: () => void;
  onClickIcon: () => void;
};

const Menu = ({ onClickIcon, onClick }: Props) => {
  return (
    <>
      <div className="z-30 backdrop fixed top-0 left-0 right-0 bottom-0 w-full bg-slate-900 opacity-95"></div>
      <section className="z-40 py-4 px-5 fixed top-0 right-0 w-full mx-auto">
        <svg
          onClick={onClickIcon}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white mr-3 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div className="menuNav text-white flex flex-col justify-center items-center">
          <Link to={"/home"} className="py-5">
            HOME
          </Link>
          <Link to={"/record"} className="py-5">
            Record
          </Link>
          <Link to={"/bucket-list"} className="py-5">
            BucketList
          </Link>
          <Link to={"/countries"} className="py-5">
            Countries
          </Link>
          <span className="inline-block py-5" onClick={onClick}>
            Sign out
          </span>
        </div>
      </section>
    </>
  );
};

export default Menu;

import { Link } from "react-router-dom";

type Props = {
  link: string;
};

const BasicButton = ({ link }: Props) => {
  return (
    <button className="btn btn-outline btn-secondary gap-2">
      <Link to={link} className="flex flex-row items-center">
        Explore World
      </Link>
    </button>
  );
};

export default BasicButton;

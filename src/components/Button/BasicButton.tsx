import { Link } from "react-router-dom";

type Props = {
  link: string;
  text?: string;
};

const BasicButton = ({ link, text = "Explore World" }: Props) => {
  return (
    <button className="btn btn-outline btn-secondary gap-2">
      <Link to={link} className="flex flex-row items-center">
        {text}
      </Link>
    </button>
  );
};

export default BasicButton;

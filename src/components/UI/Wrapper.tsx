import { ChildrenType } from "../../models/model";

const Wrapper = ({ children }: ChildrenType) => {
  return <div className="min-h-screen px-5 sm:px-8">{children}</div>;
};

export default Wrapper;

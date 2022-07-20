import { AlertText } from "../../../models/model";

const Alert = ({ text }: AlertText) => {
  return (
    <div className="px-5 mx-auto fixed bottom-10 left-0 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 z-50">
      <div className="alert shadow-lg items-start bg-slate-600 text-white">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Alert;

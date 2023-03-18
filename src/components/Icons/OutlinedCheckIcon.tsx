type Props = {
  onClick: () => Promise<void>;
};

const OutlinedCheckIcon = ({ onClick }: Props) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 inline-block cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#f92fca"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default OutlinedCheckIcon;

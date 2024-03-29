type Props = {
  onClick: () => Promise<void>;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

const CheckIcon = ({
  onClick,
  fill = "",
  stroke = "",
  strokeWidth = 0,
}: Props) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 inline-block cursor-pointer"
      viewBox="0 0 20 20"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default CheckIcon;

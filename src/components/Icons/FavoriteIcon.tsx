type Props = {
  onClick: () => Promise<void>;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
};

const FavoriteIcon = ({
  onClick,
  fill,
  stroke = "",
  strokeWidth = 0,
}: Props) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 mr-4 inline-block cursor-pointer"
      viewBox="0 0 20 20"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default FavoriteIcon;

type Props = {
  flagImgUrl: string;
};

const FlagImgSection = ({ flagImgUrl }: Props) => {
  return (
    <figure className="pb-3 lg:min-w-374 lg:mr-2">
      <img
        src={`${flagImgUrl}`}
        alt="country-flag"
        className="w-full max-w-374 h-248 rounded-3xl"
      />
    </figure>
  );
};

export default FlagImgSection;

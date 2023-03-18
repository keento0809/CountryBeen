import FavoriteIcon from "../../components/Icons/FavoriteIcon";
import CheckIcon from "../../components/Icons/CheckIcon";

type Props = {
  isFavorite: boolean;
  handleAddFavorite: () => Promise<void>;
  handleRemoveFavorite: () => Promise<void>;
  isBeenTo: boolean;
  handleAddBeenTo: () => Promise<void>;
  handleRemoveBeenTo: () => Promise<void>;
};

const IconsSection = ({
  isFavorite,
  handleAddFavorite,
  handleRemoveFavorite,
  isBeenTo,
  handleAddBeenTo,
  handleRemoveBeenTo,
}: Props) => {
  return (
    <div className="icons max-h-32 my-2">
      <div
        className="tooltip tooltip-left"
        data-tip={!isFavorite ? "Add BucketList" : "Remove from BucketList"}
      >
        {!isFavorite && (
          <FavoriteIcon
            onClick={handleAddFavorite}
            stroke={"#f92fca"}
            strokeWidth={2}
            fill={"none"}
          />
        )}
        {isFavorite && (
          <FavoriteIcon onClick={handleRemoveFavorite} fill={"#f92fca"} />
        )}
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip={!isBeenTo ? "Add Record" : "Remove from Record"}
      >
        {!isBeenTo && (
          <CheckIcon
            onClick={handleAddBeenTo}
            stroke={"#f92fca"}
            strokeWidth={2}
            fill={"none"}
          />
        )}
        {isBeenTo && (
          <CheckIcon onClick={handleRemoveBeenTo} fill={"#f92fca"} />
        )}
      </div>
    </div>
  );
};

export default IconsSection;

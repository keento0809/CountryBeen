import { CountryViewObj } from "../../types/country";
import LinkIcon from "../Icons/LinkIcon";

interface Props {
  countryData: CountryViewObj;
}

const WikipediaLink = ({ countryData }: Props) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://en.wikipedia.org/wiki/${
        countryData.name[0]
      }${countryData.name.slice(1)}`}
      className="flex flex-row items-center"
    >
      <LinkIcon />
      <span className="cursor-pointer">Wikipedia</span>
    </a>
  );
};

export default WikipediaLink;

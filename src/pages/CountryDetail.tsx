import { useEffect, useState } from "react";

const CountryDetail: React.FC = () => {
  const [countryCode, setCountryCode] = useState("");

  function getCountryCode() {
    const pathName = window.location.pathname.toString();
    const cca3Code = pathName.substring(pathName.length - 3, pathName.length);
    setCountryCode(cca3Code);
  }

  useEffect(() => {
    getCountryCode();
  }, []);

  return (
    <div>
      <p>Let's add the country detail page.</p>
      <p>Now, cca3 code is {`${countryCode}`}</p>
    </div>
  );
};

export default CountryDetail;

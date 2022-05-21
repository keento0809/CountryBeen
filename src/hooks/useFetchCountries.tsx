import axios from "axios";

const useFetchCountries = () => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((res) => {
      if (!res) throw new Error("Request failed.");
      const resData = res.data;

      return resData;
    })
    .catch((error) => console.log(error.message));
};

export default useFetchCountries;

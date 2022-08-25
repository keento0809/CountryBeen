import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { countriesActions } from "../store/countries-slice";

const useFetchCountries = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetching() {
      try {
        setLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        dispatch(countriesActions.fetchCountries(response.data));
        setData(response.data);
      } catch (error: any) {
        setError(error);
        throw new Error(error);
      }
      setLoading(false);
    }
    fetching();
  }, []);

  return { data, error, loading };
};

export default useFetchCountries;

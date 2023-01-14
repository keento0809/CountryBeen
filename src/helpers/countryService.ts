const countryService = {
  get: async () => {
    const res = await fetch(
      `${process.env.REACT_APP_FETCH_COUNTRY_DATA_ENDPOINT}`
    );
    const data = await res.json();
    return data;
  },
};

export default countryService;

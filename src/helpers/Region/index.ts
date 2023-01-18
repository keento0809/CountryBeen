export const createLoadedDataArray = (
  resData: any,
  currRegion: string,
  selectedRegion?: string
) => {
  const loadedData = [];
  for (const key in resData) {
    if (
      resData[key].continents[0] ===
      (!selectedRegion ? currRegion : selectedRegion)
    ) {
      loadedData.push({
        name: resData[key].name.common,
        population: resData[key].population,
        continents: resData[key].continents,
        capital: resData[key].capital,
        currencies: resData[key].currencies,
        languages: resData[key].languages,
        coatOfArms: resData[key].coatOfArms.png,
        flagImg: resData[key].flags.png,
        flagIcon: resData[key].flag,
        cca3: resData[key].cca3,
        borders: resData[key].borders,
      });
    }
  }
  return loadedData;
};

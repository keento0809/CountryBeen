import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";

const geoUrl =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const WorldMap = () => {
  const [cca3List, setCca3List] = useState<string[]>([]);
  const { beenToList } = useSelector((state: RootState) => state.beenReducer);
  let cca3Arr: string[] = [];
  useEffect(() => {
    beenToList.map((country) => {
      cca3Arr.push(country.cca3);
    });
    setCca3List(cca3Arr);
  }, [beenToList.length]);

  return (
    <div className="bg-transparent xl:max-w-780 xl:max-h-532">
      <ComposableMap>
        <Geographies
          geography={geoUrl}
          fill="#F7F7F7"
          stroke="#888888"
          className="max-h-500"
        >
          {({ geographies }) =>
            geographies.map((geo) => {
              let boolBeen = false;
              for (let i = 0; i < cca3List.length; i++) {
                if (geo.id == cca3List[i]) {
                  boolBeen = true;
                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={boolBeen ? "#F000B8" : ""}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;

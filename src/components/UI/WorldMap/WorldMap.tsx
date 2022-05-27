import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// import "../../../reactMap.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = () => {
  const cca3s = ["JPN", "THA", "VNM", "MMR", "AUS", "ITA"];

  // style={{ background: "#333" }}

  return (
    <div className="bg-transparent">
      <ComposableMap>
        <Geographies geography={geoUrl} fill="#F7F7F7" stroke="#888888">
          {({ geographies }) =>
            geographies.map((geo) => {
              // cca3
              // console.log(geo.properties.NAME, geo.properties.ISO_A3);
              let boolBeen = false;
              for (let i = 0; i < cca3s.length; i++) {
                if (geo.properties.ISO_A3 == cca3s[i]) {
                  boolBeen = true;
                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={boolBeen ? "#FF0000" : ""}
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

// const rootElement = document.getElementById("root");
// ReactDOM.render(<ReactSimpleMap />, rootElement);

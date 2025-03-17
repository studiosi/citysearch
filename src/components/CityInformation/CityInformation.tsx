"use client"

import {ReactNode, useContext} from "react";
import {CitySearchGlobalStateContext} from "@/components/CitySearchGlobalState/CitySearchGlobalState";
import {GeoDBDataCityType} from "@/lib/GeoDBClient";
import styles from "./CityInformation.module.scss";

const CityInformation = (): ReactNode => {
  const globalData = useContext(CitySearchGlobalStateContext);

  const currentCityData = globalData?.cityData?.find((cityData: GeoDBDataCityType) => cityData.id === globalData.cityId);

  return globalData.cityId !== null && currentCityData && (
    <div className={styles.cityInformation}>
      <h2>Information</h2>
      <div className={styles.cityInformationTableContainer}>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{currentCityData.name || "N/A"}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{currentCityData.country || "N/A"}</td>
            </tr>
            <tr>
              <th>Region</th>
              <td>{currentCityData.region || "N/A"}</td>
            </tr>
            <tr>
              <th>Population</th>
              <td>{currentCityData.population || "N/A"}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{currentCityData.latitude || "N/A"}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{currentCityData.longitude || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CityInformation;
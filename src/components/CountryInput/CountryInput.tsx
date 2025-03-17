"use client"

import {ChangeEventHandler, ReactNode, useContext} from "react";
import * as countryCodes from "country-codes-list";
import styles from "./CountryInput.module.scss";
import {CitySearchGlobalStateContext} from "@/components/CitySearchGlobalState/CitySearchGlobalState";

const countryList = countryCodes.customList(
  "countryCode",
  "{countryNameEn}"
)

const CountryInput = (): ReactNode => {
  const globalData = useContext(CitySearchGlobalStateContext);

  const inputCountryOnChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    const countryCode = evt.currentTarget.value;
    if(countryCode === "XX") {
      globalData.setCountryCode(null);
    } else {
      globalData.setCountryCode(countryCode);
    }
  }

  return (
    <div className={styles.countryInput}>
      <label htmlFor="input-country">Country</label>
      <select name="input-country" id="input-country" onChange={inputCountryOnChange}>
        <option key={"input-country-XX"} value="XX">Select a country...</option>
        {
          Object.keys(countryList).map((code) => {
            return (
              <option key={`input-country-${code}`} value={code}>{countryList[code]}</option>
            )
          })
        }
      </select>
    </div>
  )
}

export default CountryInput;
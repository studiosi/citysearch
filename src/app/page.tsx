import Header from "@/components/Header/Header";
import CityInput from "@/components/CityInput/CityInput";
import CountryInput from "@/components/CountryInput/CountryInput";
import CityInformation from "@/components/CityInformation/CityInformation";

export default function Home() {

  return (
    <>
      <Header />
      <CountryInput />
      <CityInput />
      <CityInformation />
    </>
  );
}

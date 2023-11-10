import { createContext, useEffect, useState } from "react";
import { supabase } from "../SupabaseConfig";
import BackgroundImage from "../assets/auto-repair-chicago.jpg";
import ProviderCard from "../Components/ProviderCard";
import { GetCountries, GetCity, GetState } from "react-country-state-city";
const AllServiceProviders = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [providerList, setProviderList] = useState(null);

  const [countryid, setCountryid] = useState(101); // setting defalut country to india
  const [stateid, setStateid] = useState(null);
  const [cityid, setCityid] = useState(null);

  const [stateIndex, setStateIndex] = useState(null);
  const [cityIndex, setCityIndex] = useState(null);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    // GetCountries().then((result) => {
    //   setCountriesList(result);
    // });

    GetState(countryid).then((result) => {
      setStateList(result);
    });
    GetCity(countryid, stateid).then((result) => {
      setCityList(result);
    });

    const fetchProviderList = async () => {
      const { data, error } = await supabase.from("ServiceProvider").select();
      if (error) {
        setErrorMessage("could not fetch the data");
        setProviderList(null);
        console.log("error");
      }
      if (data) {
        setProviderList(data);
        setErrorMessage(null);
        console.log(data);
        // console.log("data received");
      }
    };
    fetchProviderList();
  }, []);

  return (
    <div className="flex flex-col w-full h-fit mt-10">
      <div className="flex justify-evenly mt-10">
        {/* <h6>Country</h6>
      <select
        onChange={(e) => {
          const country = countriesList[e.target.value]; //here you will get full country object.
          setCountryid(country.id);
          GetState(country.id).then((result) => {
            setStateList(result);
          });
        }}
        value={countryid}
      >
        {countriesList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select> */}
        <h6>State</h6>
        <select
          onChange={(e) => {
            const state = stateList[e.target.value]; //here you will get full state object.
            setStateid(state.id);
            setStateIndex(e.target.value);
            GetCity(countryid, state.id).then((result) => {
              setCityList(result);
            });
          }}
          value={stateIndex}
        >
          {stateList.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item.name}
              </option>
            );
          })}
        </select>
        <h6>City</h6>
        <select
          onChange={(e) => {
            const city = cityList[e.target.value]; //here you will get full city object.
            setCityIndex(e.target.value);
            setCityid(city.id);
          }}
          value={cityIndex}
        >
          {cityList.map((item, index) => (
            <option key={index} value={index}>
              {item.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setStateIndex(null);
            setStateid(null);
            setCityIndex(null);
            setCityid(null);
          }}
        >
          Reset Filter
        </button>
      </div>
      <div className="grid-container">
        {providerList
          ? providerList.map((f) => {
              if (
                stateIndex &&
                cityIndex &&
                (f.state != stateList[stateIndex].name ||
                  f.city != cityList[cityIndex].name)
              ) {
                return null;
              }
              return (
                <ProviderCard
                  key={f.id}
                  id={f.id}
                  name={f.name}
                  address={f.city}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default AllServiceProviders;

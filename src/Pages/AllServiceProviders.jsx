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

  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);

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
    <div className="flex flex-col max-w-6xl w-full h-fit bg-white mt-6 rounded-sm p-10 align-center">
      <h1 className="font-bold text-4xl py-3">Explore Top Choices:</h1>
      <div className="flex w-full gap-8">
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
       <option selected>Choose a country</option>
        {countriesList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select> */}
        <select
          className="w-40 outline-none focus:outline-none font-semibold scrollable-content"
          // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            const state = stateList[e.target.value];
            //here you will get full state object.
            setStateid(state.id);
            setStateIndex(e.target.value);
            GetCity(countryid, state.id).then((result) => {
              setCityList(result);
            });
          }}
          value={stateIndex}
        >
          <option
            selected
            className=" text-sm bg-gray-700 dark:text-gray-200 block px-4 py-2 hover:bg-gray-600 hover:text-white "
          >
            Choose a State
          </option>
          {stateList.map((item, index) => {
            return (
              <option
                key={index}
                value={index}
                className=" text-sm bg-gray-700 dark:text-gray-200 block px-4 py-2 hover:bg-gray-600 hover:text-white "
              >
                {item.name}
              </option>
            );
          })}
        </select>
        <select
          className="w-40 font-semibold appearance-none outline-none bg-transparent px-4 py-2 pr-8 leading-tight focus:outline-none"
          onChange={(e) => {
            const city = cityList[e.target.value]; //here you will get full city object.
            setCityIndex(e.target.value);
            setCityid(city.id);
          }}
          value={cityIndex}
        >
          <option
            selected
            className=" text-sm bg-gray-700  dark:text-gray-200    hover:bg-gray-600 hover:text-white "
          >
            Choose a city
          </option>
          {cityList.map((item, index) => (
            <option
              className=" text-sm bg-gray-700 dark:text-gray-200 block px-4 py-2 hover:bg-gray-600 hover:text-white "
              key={index}
              value={index}
            >
              {item.name}
            </option>
          ))}
        </select>
        <button
          className="my-2 align-middle text-white w-auto bg-gradient-to-r py-3 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 text-center"
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
      <div className="gap-4 w-full grid-container h-fit py-8">
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
                  rating={(f.NoOfFeedback == 0)?null : f.RatingS/f.NoOfFeedback}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default AllServiceProviders;

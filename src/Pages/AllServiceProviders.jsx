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
    <div className="flex flex-col w-full h-fit ">
      <div
        className="relative bg-cover h-screen w-full"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <div className="flex justify-center items-center flex-col opacity-80 bg-black absolute z-10  w-full top-0 left-0  h-screen">
          <h1 className="text-white text-5xl font-bold min-w-max">
            FULL SERVICE AUTO CARE!
          </h1>
          <p className="text-white max-w-3xl tracking-wide text-center font-light  leading-5 my-6 text-lg">
            we've curated a diverse and extensive network of reputable car
            servicing providers, all in one convenient place.Explore our
            extensive network of car servicing providers and take the hassle out
            of finding the right match for your automotive needs. Your car, your
            choice, your convenience
          </p>
          <div className="flex justify-center items-center flex-col">
            <button className=" text-white bg-transparent  text-center border transition-all duration-500 hover:scale-105 border-white px-3 py-2.5 hover:opacity-100 hover:bg-red-800">
              Browse through Services
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
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
          ? providerList
  
              .map((f) => {
                if(stateIndex && cityIndex && ((f.state != stateList[stateIndex].name) || (f.city != cityList[cityIndex].name)))
                {
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

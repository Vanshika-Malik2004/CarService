import { createContext, useEffect, useState } from "react";
import { supabase } from "../SupabaseConfig";
import BackgroundImage from "../assets/auto-repair-chicago.jpg";
import ProviderCard from "../Components/ProviderCard";
const AllServiceProviders = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [providerList, setProviderList] = useState(null);
  useEffect(() => {
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
        console.log("data received");
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
      <div className="grid-container">
        {providerList
          ? providerList.map((f) => {
              return <ProviderCard id={f.id} name={f.name} address={f.city} />;
            })
          : null}
      </div>
    </div>
  );
};

export default AllServiceProviders;

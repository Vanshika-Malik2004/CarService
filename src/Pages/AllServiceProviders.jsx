import { createContext, useEffect, useState } from "react";
import { supabase } from "../SupabaseConfig";
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
  return <div>AllServiceProviders List</div>;
};

export default AllServiceProviders;

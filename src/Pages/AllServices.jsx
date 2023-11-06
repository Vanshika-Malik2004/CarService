import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../SupabaseConfig";
const AllServices = () => {
  const location = useLocation();
  const [servicesList, setServicesList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchAllServices = async (id) => {
      const { data, error } = await supabase
        .from("ServicesTable")
        .select()
        .eq("ProviderID", id);
      if (data) {
        console.log(data);
        console.log("data reveived");
        setServicesList(data);
        setErrorMessage(null);
      }
      if (error) {
        setErrorMessage("could not fetch the data");
        setServicesList(null);
        console.log("error");
      }
    };
    fetchAllServices(15);
  }, []);
  return <div>AllServices</div>;
};

export default AllServices;

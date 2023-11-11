import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { supabase } from "../SupabaseConfig";
const AllServices = () => {
  const location = useLocation();
  const [servicesList, setServicesList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
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
    fetchDetails(id);
    fetchAllServices(id);
  }, []);
  return <div>AllServices</div>;
};

export default AllServices;

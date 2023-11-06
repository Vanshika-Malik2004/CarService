import React from "react";
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../SupabaseConfig";
const ServicesContext = createContext();
const ServicesProvider = ({ children }) => {
  return <ServicesContext.Provider>{children}</ServicesContext.Provider>;
};

export { ServicesProvider, ServicesContext };

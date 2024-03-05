import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const RealDataContext = createContext({});

export const StateRealDataContext = ({ children }) => {
  const [reveal, setreveal] = useState(false);
  const [RealData, setRealData] = useState([
    {
      id: "1",
      companyName: "Apple",
      industry: "Automobile",
      type: "Org",
      project_details: "https://details",
      status: "pending",
      limits: 45151,
      issues: 812,
      eligibility: "No",
    },
  ]);
  useEffect(() => {
    axios.get("http://localhost:3001/comp").then((response) => {
      if (response.data) {
        setRealData(response.data);
      }
    });
  }, []);

  return (
    <RealDataContext.Provider
      value={{ RealData, setRealData, reveal, setreveal }}
    >
      {children}
    </RealDataContext.Provider>
  );
};

export const useRealDataContext = () => useContext(RealDataContext);

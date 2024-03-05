import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { AiOutlineDownload, AiFillEye } from "react-icons/ai";
import axios from "axios";

const Certificate = () => {
  const [certificates, setCertificates] = useState([
    {
      companyName: "GreenTech Solutions Inc.",
      date: "2023-10-20T00:00:00.000Z",
      certificateURL: "https://greentechsolutions.com/certificate",
      project: "Renewable Energy Initiative",
      carbonReduced: 1500,
    },
    {
      companyName: "Renewable Energy Corporation",
      date: "2023-09-15T00:00:00.000Z",
      certificateURL: "https://renewableenergycorp.com/certificate",
      project: "Solar Power Project",
      carbonReduced: 2000,
    },
    {
      companyName: "Sustainable Solutions Ltd.",
      date: "2023-11-30T00:00:00.000Z",
      certificateURL: "https://sustainablesolutionsltd.com/certificate",
      project: "Carbon Sequestration Project",
      carbonReduced: 1800,
    },
    {
      companyName: "CleanTech Innovations",
      date: "2023-10-10T00:00:00.000Z",
      certificateURL: "https://cleantechinnovations.com/certificate",
      project: "Energy Efficiency Initiative",
      carbonReduced: 2500,
    },
    {
      companyName: "Renewable Power Ltd.",
      date: "2023-12-20T00:00:00.000Z",
      certificateURL: "https://renewablepowerltd.com/certificate",
      project: "Hydroelectric Project",
      carbonReduced: 3000,
    },
    {
      companyName: "EcoSolutions Group",
      date: "2023-11-05T00:00:00.000Z",
      certificateURL: "https://ecosolutionsgroup.com/certificate",
      project: "Biodiversity Conservation Program",
      carbonReduced: 2200,
    },
    {
      companyName: "GreenEarth Innovations",
      date: "2023-09-25T00:00:00.000Z",
      certificateURL: "https://greenearthinnovations.com/certificate",
      project: "Reforestation Initiative",
      carbonReduced: 2800,
    },
    {
      companyName: "Climate Action Corporation",
      date: "2023-08-15T00:00:00.000Z",
      certificateURL: "https://climateactioncorp.com/certificate",
      project: "Renewable Energy Adoption Program",
      carbonReduced: 3500,
    },
    {
      companyName: "Ocean Conservancy Alliance",
      date: "2023-07-20T00:00:00.000Z",
      certificateURL: "https://oceanconservancyalliance.com/certificate",
      project: "Marine Pollution Prevention Campaign",
      carbonReduced: 1600,
    },
    {
      companyName: "CleanAir Technologies",
      date: "2023-06-10T00:00:00.000Z",
      certificateURL: "https://cleanairtech.com/certificate",
      project: "Air Quality Improvement Initiative",
      carbonReduced: 2700,
    },
    {
      companyName: "Forest Guardians Association",
      date: "2023-05-05T00:00:00.000Z",
      certificateURL: "https://forestguardians.org/certificate",
      project: "Forest Protection Program",
      carbonReduced: 3200,
    },
    {
      companyName: "Water Conservation Coalition",
      date: "2023-04-01T00:00:00.000Z",
      certificateURL: "https://waterconservationcoalition.com/certificate",
      project: "Water Resource Management Project",
      carbonReduced: 1800,
    },
    {
      companyName: "Renewable Resources Group",
      date: "2023-03-15T00:00:00.000Z",
      certificateURL: "https://renewableresourcesgroup.com/certificate",
      project: "Community Solar Program",
      carbonReduced: 2100,
    },
    {
      companyName: "Sustainable Energy Solutions",
      date: "2023-02-10T00:00:00.000Z",
      certificateURL: "https://sustainableenergy.com/certificate",
      project: "Energy Access Expansion Initiative",
      carbonReduced: 2400,
    },
    {
      companyName: "GreenWorld Initiatives",
      date: "2023-01-05T00:00:00.000Z",
      certificateURL: "https://greenworldinitiatives.com/certificate",
      project: "Sustainable Transportation Project",
      carbonReduced: 2800,
    },
    {
      companyName: "Climate Solutions Foundation",
      date: "2022-12-20T00:00:00.000Z",
      certificateURL: "https://climatesolutionsfoundation.com/certificate",
      project: "Climate Change Education Program",
      carbonReduced: 1900,
    },
    {
      companyName: "Earth Guardians Alliance",
      date: "2022-11-15T00:00:00.000Z",
      certificateURL: "https://earthguardiansalliance.com/certificate",
      project: "Environmental Advocacy Campaign",
      carbonReduced: 3000,
    },

    // Add more certificates as needed
  ]);

  return (
    <div className="flex justify-start lg:mr-[5%] gap-5">
      <Sidebar />
      <div className="p-4 sm:ml-64 w-full mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2  justify-start gap-5 mt-10">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="col shadow-lg rounded-lg h-auto  shodow-md inset-1 border-[1px] border-gray-200 hover:scale-105 duration-500 ease-in"
            >
              <div className="w-full  overflow-hidden">
                <span></span>
                <img
                  // src="./images/carboncertificate.jpeg"

                  src="https://img.freepik.com/free-vector/luxury-certificate-achievement-template-design_4513-413.jpg?size=626&ext=jpg&ga=GA1.1.570651861.1704119948&semt=sph"
                  alt="aaa"
                  title="certificate"
                  className="object-cover w-full h-auto p-2"
                />
              </div>

              <div className="flex px-3 pb-2 items-center">
                <span className="text-lg">
                  Company Name: {certificate.companyName}
                </span>

                <span className="text-gray-500">Date: {certificate.date}</span>
              </div>
              <div className="flex justify-between px-3 py-2">
                <span>
                  <span className="font-bold">Project: </span>
                  {certificate.project}
                </span>
                <div className="flex items-center gap-2">
                  <AiFillEye
                    className="text-lg text-blue-500 cursor-pointer hover:scale-110"
                    title="view certificate"
                  />
                  <AiOutlineDownload
                    type="button"
                    className="text-lg text-green-500 cursor-pointer hover:scale-110"
                    title="download"
                  />
                </div>
              </div>
              <div className="px-3 py-2">
                <span>
                  <span className="font-bold">Total Emission: </span>
                  {certificate.carbonReduced} Tons
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificate;

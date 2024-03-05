import React, { useState } from "react";
import axios from "axios";
import AlertsMessgae from "../miscellaneous/AlertsMessgae";

function CreateCompany() {
  const [aler, setaler] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    size: "",
    projectDetails: "",
    status: "",
    limits: 0,
    issues: "",
    eligibility: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/comp/add",
        formData
      );
      console.log(response.data);
      alert("Company details submitted successfully!");
      setaler(true);
      setTimeout(() => {
        setaler(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit company details.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/abstract-fantasy-landscape-background_23-2149124337.jpg?w=1380&t=st=1709217033~exp=1709217633~hmac=bbd8e3dd54a8910ba47151563107b8dc9e95d0be8923561eccab8881743712bd")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
      className="lg:mt-24"
    >
      {aler ? (
        <AlertsMessgae message={"Added Sucessfully"} />
      ) : (
        <div className="max-w-md lg:mt-12 mx-auto mt-8 px-8 py-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-6xl font-bold shadow-md p-4 m-2 text-center mb-6">
            Submit Company Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
            </div>
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700"
              >
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
            </div>
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
            </div>
            <div>
              <label
                htmlFor="projectDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Project Details
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
            </div>
            <div>
              <label
                htmlFor="limits"
                className="block text-sm font-medium text-gray-700"
              >
                Limits
              </label>
              <input
                type="number"
                id="limits"
                name="limits"
                value={formData.limits}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
            </div>
            <div>
              <label
                htmlFor="issues"
                className="block text-sm font-medium text-gray-700"
              >
                Issues
              </label>
              <textarea
                id="issues"
                name="issues"
                value={formData.issues}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              ></textarea>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="eligibility"
                name="eligibility"
                checked={formData.eligibility}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 h-4 w-4"
                required
              />
              <label
                htmlFor="eligibility"
                className="ml-2 block text-sm text-gray-900"
              >
                Eligibility
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
            >
              Submits
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateCompany;

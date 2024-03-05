import React from "react";
import Sidebar from "../Sidebar";

const Certificate = ({ companyName, projectDetails, completionDate }) => {
  return (
    <div className="flex justify-start gap-5">
      <Sidebar />
      <div
        style={{
          position: "relative",
          marginLeft: "4rem", // Adjust the margin to match your design
          marginTop: "2.5rem", // Adjust the margin to match your design
          height: "140mm", // Adjust the height to match your design
          width: "297mm", // Adjust the width to match your design
          border: "1mm solid #991B1B", // Adjust the border to match your design
          backgroundColor: "#d6d6e4", // Adjust the background color to match your design
          backgroundImage: `url(https://img.freepik.com/free-vector/blue-certificate-background-gold-modern-border-vector_53876-156358.jpg?w=996&t=st=1709374131~exp=1709374731~hmac=7e6dd225167499d7b5635ae134e60f14d0338b30cb4a7e833a120cb824f3df59)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="p-4 w-full"
      >
        <div className="border-pattern capitalize p-4 rounded-lg bg-transparent">
          <div className="inner-content">
            <div className="border-pattern p-8 rounded-lg bg-green shadow-lg relative">
              <div className="inner-content">
                <h1 className="text-4xl font-bold mb-4">Certificate</h1>
                <h2 className="text-3xl font-bold mb-6">of Excellence</h2>
                <div className="text-lg mb-6">
                  <h3 className="font-semibold">
                    This Certificate Is Proudly Presented To
                  </h3>
                  <p className="text-xl font-bold mb-2">{companyName}</p>
                </div>
                <div className="text-lg mb-6">
                  <h3 className="font-semibold">Has Completed</h3>
                  <p className="text-xl font-bold mb-2">{projectDetails}</p>
                </div>
                <div className="text-lg mb-6">
                  <h3 className="font-semibold">On</h3>
                  <p className="text-xl font-bold mb-4">{completionDate}</p>
                </div>
                <div className="absolute bottom-8 right-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;

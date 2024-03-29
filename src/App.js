import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/miscellaneous/Home";
import Navbar from "./Components/miscellaneous/Navbar";
import Contact from "./Components/miscellaneous/Contact";
import Error from "./Components/miscellaneous/Error";
import "./App.css";
import Login from "./Components/Auth/Login";
import Company from "./Components/govt/Company";
import CompanyData from "./Components/govt/CompanyData";
import CompanyIndex from "./Components/Company/CompanyIndex";
import Data from "./Components/Company/Data";
import BuyCredits from "./Components/Company/BuyCredits";
import PollutionGraph from "./Components/miscellaneous/PollutonGraph";
import Certificate from "./Components/Company/Certificate";
import GovtCertificate from "./Components/govt/GovtCertificate";
import Governmap from "./Components/govt/Governmap";
import GenerateCerticate from "./Components/govt/utils/GenerateCerticate";
import PendingApprovals from "./Components/govt/PendingApprovals";
import ViewDetails from "./Components/govt/ViewDetails";
import Datastate from "./context/Datastate";
import CompanyCards from "./Components/Company/utils/CompanyCards";
import WalletCard from "./Components/Company/Web3/WalletCard";
import Index from "./Components/Landing/Index";
import { StateRealDataContext } from "./context/Compnaycontext.jsx";
import CarbonEmissionDocumentation from "./Components/govt/documentation.js";
import Signup from "./Components/Auth/Signup.jsx";
import CompanyCard from "./Components/Company/compnayCard.jsx";
import CreateCompany from "./Components/Company/CreateCompnay.jsx";
import SellCredits from "./Components/Company/SellCredit.jsx";
function App() {
  return (
    <Datastate>
      <StateRealDataContext>
        <div className="w-full">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />

            {/* Government */}
            <Route path="/govt/dashboard" element={<Company />} />
            <Route path="/govt/company/data" element={<CompanyData />} />
            <Route
              path="/govt/company/certificates"
              element={<GovtCertificate />}
            />
            <Route path="/govt/map" element={<Governmap />} />
            <Route
              path="/govt/company/certificates/generate"
              element={<GenerateCerticate />}
            ></Route>
            <Route
              path="/govt/company/approvals"
              element={<PendingApprovals />}
            ></Route>
            <Route
              path="/govt/documentation"
              element={<CarbonEmissionDocumentation />}
            ></Route>
            <Route
              path="/govt/company/approvals/details/:id"
              element={<ViewDetails />}
            ></Route>

            {/* Company */}
            <Route path="/company/data" element={<Data />} />
            <Route path="/company" element={<CompanyIndex />} />
            <Route
              path="/company/licence-transaction"
              element={<BuyCredits />}
            />

            <Route path="/company/certificate" element={<Certificate />} />
            <Route path="/company/project/inves" element={<CompanyCards />} />
            <Route path="/company/wallet/balance" element={<WalletCard />} />

            {/* Miscellanous */}

            <Route path="/demo/map" element={<PollutionGraph />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
            <Route path="/card" element={<CompanyCard name={"Amazon"} />} />
            <Route path="/createcompnay" element={<CreateCompany />} />
            <Route path="/sell" element={<SellCredits />} />
          </Routes>
        </div>
      </StateRealDataContext>
    </Datastate>
  );
}

export default App;

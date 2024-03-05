import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Button, Checkbox, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { Label } from "flowbite-react";
// import { compact } from "@headlessui/react/dist/utils/render";

function Login() {
  const [govtID, setgovtID] = useState("");
  const [govtpassword, setgovtpassword] = useState("");
  const [compID, setcomptID] = useState("");
  const [comppassword, setcomppassword] = useState("");
  var history = useNavigate();

  const Complogin = async (id, Password) => {
    // Default options are marked with *
    const data = {
      email: compID,
      password: comppassword,
    };
    await axios
      .post("http://localhost:3001/company/login", data)
      // http://localhost:3001/company/login
      .then((r) => {
        if (r.status == 200) {
          history("/company");
          window.location.reload();
        }

        console.log(r);
      });
  };

  const GovermentLogin = async () => {
    // e.preventDefault();
    // Default options are marked with *
    const data = {
      email: govtID,
      password: govtpassword,
    };
    await axios
      .post("http://localhost:3001/goverment/login", data)
      // http://localhost:3001/company/login
      .then((r) => {
        if (r.status == 200) {
          history("/govt/dashboard");
          window.location.reload();
        }

        console.log(r);
      });
  };
  return (
    <div>
      <div className="h-screen md:flex align-middle ">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div className="px-5 w-4/5">
            <h1 className="text-white font-bold text-4xl font-sans">
              Sustainable, Transparent, and Efficienty Credit System
            </h1>
            <p className="text-white mt-1"></p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        </div>
        <div className="flex md:w-1/2 justify-center align-middle items-center bg-white">
          <Card className="w-full px-5 items-center justify-center  h-full align-middle my-auto bg-slate-50">
            <CardBody className="mx-auto w-full">
              <Tabs
                value="html"
                className="bg-transparent"
                indicatorProps={{
                  className:
                    "bg-gray-900/10 shadow-none !text-gray-900 p-5  hover:bg-blue-50",
                }}
              >
                <TabsHeader>
                  <Tab key="html" value="html" className="p-5">
                    Company Login
                  </Tab>
                  <Tab key="Government" value="Government" className="p-5">
                    Government Login
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel key="html" value="html">
                    <form className="mt-12 flex flex-col gap-4 px-3">
                      <h1 className="text-2xl">
                        Please Login with your Official Credentials
                      </h1>

                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="email2" value="Your email" />
                        </div>
                        <TextInput
                          id="email2"
                          placeholder="name"
                          required
                          shadow
                          type="text"
                          name="id"
                          onChange={(e) => {
                            setcomptID(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="password2" value="Your password" />
                        </div>
                        <TextInput
                          id="password2"
                          required
                          shadow
                          type="password"
                          name="password"
                          onChange={(e) => {
                            setcomppassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="agree" />
                        <Label
                          htmlFor="agree"
                          className="ml-3 flex items-center text-gray-700 dark:text-gray-300"
                        >
                          <p className="mr-1">I agree with the</p>
                          <Link
                            to="/"
                            className="text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            terms and conditions
                          </Link>
                        </Label>
                        <div className="ml-auto flex items-center">
                          <p className="text-gray-700 dark:text-gray-300 mr-1">
                            Don't have an account?
                          </p>
                          <Link
                            to="/signup"
                            className="text-cyan-900 hover:underline dark:text-cyan-500"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>

                      <Button onClick={Complogin}>LOGIN</Button>
                    </form>
                  </TabPanel>
                  <TabPanel key="Government" value="Government">
                    <form className="mt-12 flex flex-col gap-4 px-3">
                      <h1 className="text-2xl">
                        Please Login with your Official Credentials FOR
                        GOVERMENT
                      </h1>

                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="email2" value="Your UTP" />
                        </div>
                        <TextInput
                          id="email2"
                          placeholder="name@flowbite.com"
                          required
                          shadow
                          type="text"
                          name="id"
                          onChange={(e) => {
                            setgovtID(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="password2" value="Your password" />
                        </div>
                        <TextInput
                          id="password2"
                          required
                          shadow
                          type="password"
                          name="password"
                          onChange={(e) => {
                            setgovtpassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="agree" />
                        <Label
                          htmlFor="agree"
                          className="ml-3 flex items-center text-gray-700 dark:text-gray-300"
                        >
                          <p className="mr-1">I agree with the</p>
                          <Link
                            to="/"
                            className="text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            terms and conditions
                          </Link>
                        </Label>
                        <div className="ml-auto flex items-center">
                          <p className="text-gray-700 dark:text-gray-300 mr-1">
                            Don't have an account?
                          </p>
                          <Link
                            to="/signup"
                            className="text-cyan-900 hover:underline dark:text-cyan-500"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>

                      <Button onClick={GovermentLogin}>Login</Button>
                    </form>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;

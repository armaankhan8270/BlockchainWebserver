import React, { useEffect, useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router";
// import { Fragment } from 'react'
import { MdAccountBalance } from "react-icons/md";
import Datacontext from "../../context/Datacontext";

export default function Navigation() {
  var history = useNavigate();
  var context = useContext(Datacontext);
  var { factoryuser, back } = context;
  const [openNav, setOpenNav] = React.useState(false);
  const [Comp, setComp] = React.useState(false);
  const [Gov, setGov] = React.useState(false);

  const logout = (e) => {
    e.preventDefault();
    if (localStorage.getItem("Comptoken")) {
      localStorage.removeItem("Comptoken");
      localStorage.removeItem("factoryuser");
      setComp(false);
    }
    if (localStorage.getItem("Govtoken")) {
      localStorage.removeItem("Govtoken");
      localStorage.removeItem("factoryuser");
      setGov(false);
    }
    history("/login");
  };
  useEffect(() => {
    if (localStorage.getItem("Govtoken")) {
      setGov(true);
    } else {
      setGov(false);
    }
    if (localStorage.getItem("Comptoken")) {
      setComp(true);
    } else {
      setComp(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("Govtoken")) {
      setGov(true);
    } else {
      setGov(false);
    }
    if (localStorage.getItem("Comptoken")) {
      setComp(true);
    } else {
      setComp(false);
    }
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, [Comp, Gov]);

  const NavList = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Login",
      href: "/login",
    },
    {
      text: "Map",
      href: "/govt/map",
    },
  ];

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black dark:text-white">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full">
      <Navbar className="fixed top-0 z-[2000] h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 text-black">
        <div className=" mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as={Link}
            to={"/a"}
            x
            className="mr-4 cursor-pointer py-1.5 font-medium text-xl text-blue-500 flex items-center gap-2"
          >
            <img className="w-10 " src="./logo2.png" />{" "}
            <span className="font-bold text-xl text-black">Credactions</span>
          </Typography>
          <div className="hidden lg:block">
            <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black dark:text-white">
              {NavList.map((link, index) => (
                <Typography
                  key={index}
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="p-1 font-normal"
                >
                  <Link to={link.href} className="flex items-center">
                    {link.text}
                  </Link>
                </Typography>
              ))}
              {Comp && (
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="p-1 font-normal"
                >
                  <Link to="/company" className="flex items-center">
                    Company
                  </Link>
                </Typography>
              )}

              {Gov && (
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="p-1 font-normal"
                >
                  <Link to="/govt/dashboard" className="flex items-center">
                    Government
                  </Link>
                </Typography>
              )}
            </ul>
          </div>
          {!(Comp || Gov) ? (
            <div className="flex w-max gap-4">
              <Link
                to="/login"
                className="flex items-center gap-3 text-white bg-blue-500 hover:bg-blue-800 
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {" "}
                <MdAccountBalance className="text-xl" />
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <Menu>
              <Menu.Button>
                <div className="flex items-center gap-4">
                  <Avatar
                    src={`${back}${factoryuser.Image}`}
                    alt="avatar"
                    variant="rounded"
                  />
                  <div>
                    <Typography variant="h6">{factoryuser.Name}</Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {factoryuser._id}
                    </Typography>
                  </div>
                </div>
              </Menu.Button>

              <Menu.Items
                className={
                  "absolute right-5 w-40 text-center  shadow-md px-6 py-3 top-20 bg-white"
                }
              >
                <Menu.Item
                  as="a"
                  key={2}
                  href={"jndas"}
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                  onClick={logout}
                >
                  Logout
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className="container mx-auto">
            {navList}
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

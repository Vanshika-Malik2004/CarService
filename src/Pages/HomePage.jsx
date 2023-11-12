import React from "react";
import BackgroundImage from "../assets/homepage-bg.jpg";
import Affortable from "../assets/affordable.png";
import Customisable from "../assets/customizable.png";
import Quality from "../assets/quality.png";
import Experience from "../assets/experience.png";
import DentingPainting from "../assets/dentingpainting.svg";
import BatteriesSupport from "../assets/batteriessupport.svg";
import WheelCare from "../assets/wheelcare.svg";
import PeriodicService from "../assets/periodicservice.svg";
import WashingDetailing from "../assets/washingdetailing.svg";
import { Link } from "react-router-dom";
import { supabase } from "../SupabaseConfig";
import NavbarForHomePage from "../Components/NavbarForHomePage";
import { useState, useEffect } from "react";
const services = [
  { image: DentingPainting, heading: "Denting & Painting" },
  { image: BatteriesSupport, heading: "Battery support" },
  { image: WheelCare, heading: "Wheel Care" },
  { image: PeriodicService, heading: "Periodi Servicing" },
  { image: WashingDetailing, heading: "Washing Detailing" },
];

const features = [
  {
    image: Affortable,
    heading: "Affordable",
    text: "Our affordable prices will satisfy any budget",
  },
  {
    image: Experience,
    heading: "Experienced",
    text: "We are equipped to handle any situation",
  },
  {
    image: Quality,
    heading: "Quality Repairs",
    text: "We provide best Customer Service",
  },
  {
    image: Customisable,
    heading: "Customize Schedule",
    text: "Get car servicing at your time",
  },
];
console.log(supabase);
const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderFeaturesCard = (displayArray) => {
    return (
      <div className="grid-container-home">
        {displayArray.map((f) => {
          return (
            <div className=" cards flex flex-col gap-2 p-3 h-fit items-center justify-center  rounded-md text-center ">
              <img
                src={f.image}
                className="h-40 max-w-xs w-36 object-contain"
              />
              <h2 className="font-semibold text-lg">{f?.heading}</h2>
              <p className="text-gray-600">{f?.text}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center h-fit max-w-screen relative items-center">
      <nav
        className={`fixed top-0 w-screen px-10 py-2 z-50 transition-all duration-500 flex justify-between  ${
          scrollY > 0
            ? "bg-white  backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200"
            : "bg-white"
        }`}
      >
        {/* Your NavbarForHomePage content goes here */}
        <div className="">
          <p className="text-xl font-bold py-2">Your Logo</p>
          {/* Add more navigation links or components */}
        </div>
        <div className="flex justify-center gap-8 py-2">
          <p>About</p>
          <p>Services</p>
          <p>Contact Us</p>
        </div>
        <div>
          <button className="py-2 px-6 rounded-lg  text-white bg-red-700 first-letter: transition-all duration-300 ease-in-out hover:scale-95">
            SignIn
          </button>
        </div>
      </nav>
      {/* .SignIn {
  border: 1px solid rgb(188, 6, 6);
  color: white;
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.SignIn:hover {
  scale: 0.97;
} */}
      <div
        className="relative bg-cover h-screen w-full"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <div className="flex justify-center items-start flex-col opacity-80 bg-black absolute z-10  w-full top-0 left-0  h-screen px-12">
          <h1 className="text-white text-5xl font-bold min-w-max leading-tight">
            Revive your Ride: <br /> Expert Car Servicing <br />
            at Your Doorstep!
          </h1>
          <p className="text-white max-w-xl tracking-wide text-start font-light  leading-tight my-4 text-m">
            Welcome to our car servicing website, your one-stop destination for
            all your automotive maintenance needs. Whether it's routine
            maintenance, repairs, or specialized services, we provide reliable
            solutions tailored to your vehicle's unique requirements.
          </p>
          <div className="flex gap-6">
            <button className="relative inline-flex items-center px-12 py-3 overflow-hidden text-m text-white border-2 border-white rounded-sm hover:text-white group hover:bg-white">
              <Link to="/login/user">
                <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-500 ease"></span>
                <span class="absolute right-0 flex items-center justify-start w-6 h-6 duration-500 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span class="relative">Let's get Started</span>
              </Link>
            </button>
            <button className="rounded-3xl px-4 py-2 bg-white text-lg font-semibold transition-all duration-200 hover:scale-102 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
              <Link to="/createuser">Register</Link>
            </button>
          </div>
        </div>
      </div>

      {/*about us section */}
      <div className="bg-white w-full h-fit  flex flex-col justify-start items-center p-5 gap-6">
        <h1 className=" text-5xl font-bold text-black p-3 border-red-600 border-b-8">
          About us
        </h1>
        <p className=" text-center max-w-3xl">
          Welcome to our car servicing website! We are dedicated to providing
          exceptional automotive maintenance and repair services to keep your
          vehicle running smoothly. With variety of options choose the best car
          servicing . We provide you reliable services in your localities .
        </p>
        {renderFeaturesCard(features)}
      </div>

      {/*OUR SERVICES */}
      <div className="bg-slate-100 w-full h-fit  flex flex-col justify-start items-center p-5 gap-6">
        <h2 className="text-5xl font-bold text-black p-3 border-red-600 border-b-8">
          Our Services
        </h2>
        {renderFeaturesCard(services)}
      </div>
    </div>
  );
};

export default HomePage;

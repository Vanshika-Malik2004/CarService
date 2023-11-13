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
import CarSeviceImg from "../assets/car-service.png";
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
      <div className="grid-container-home max-w-5xl gap-6 ">
        {displayArray.map((f) => {
          return (
            <div className=" cards flex flex-col gap-2 p-3 h-fit items-center justify-center text-center text-white">
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
    <div className="flex justify-center  h-fit max-w-screen align-middle">
      <div className="flex flex-col justify-center h-fit w-full relative items-center">
        <nav
          className={`fixed top-0 w-screen px-10 z-50 transition-all duration-500 flex justify-between  ${
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
          <div className="flex justify-center gap-8">
            <a
              href="#about"
              className="hover:border-b-4 hover:border-red-800 py-4 font-semibold"
            >
              About
            </a>
            <a
              href="#service"
              className="hover:border-b-4 hover:border-red-800 py-4 font-semibold"
            >
              Services
            </a>
            <a className="border-b-4 hover:border-red-800 py-4 border-transparent font-semibold">
              Contact Us
            </a>
          </div>
          <div className="my-2">
            <Link to="/login/user">
              {" "}
              <button className="py-2 px-6 rounded-lg  text-white bg-red-700 first-letter: transition-all duration-300 ease-in-out hover:scale-95">
                SignIn
              </button>
            </Link>
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
          <div className="flex justify-center items-start flex-col opacity-80 bg-black absolute z-10  w-full top-0 left-0  h-screen px-12 pt-12">
            <h1 className="text-white text-5xl font-bold min-w-max leading-tight">
              Revive your Ride: <br /> Expert Car Servicing <br />
              at Your Doorstep!
            </h1>
            <p className="text-white max-w-3xl tracking-wide text-start font-light  leading-tight my-4 text-m">
              Welcome to our car servicing website, your one-stop destination
              for all your automotive maintenance needs. Whether it's routine
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
        <div className="w-full flex justify-between py-6 px-10 items-center gap-10">
          <img src={CarSeviceImg} className="max-h-auto max-w-sm"></img>
          <div>
            <h1 className="text-start text-2xl font-bold text-red-800">
              Auto Assurance
            </h1>
            <p className="text-start max-w-2xl">
              Automobile services play a crucial role in ensuring the longevity,
              efficiency, and safety of vehicles. Regular maintenance and
              servicing are essential for identifying and addressing potential
              issues before they escalate, preventing unexpected breakdowns, and
              preserving the overall health of the vehicle. Professional auto
              services encompass a range of tasks, from routine oil changes and
              brake inspections to more complex diagnostics and repairs.
            </p>
          </div>
        </div>
        <div
          className=" w-full h-fit  flex flex-col justify-start items-center p-10 gap-8 bg-gray-900"
          id="service"
        >
          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-5xl font-bold text-white align-center text-center">
              AUTO REPAIR SERVICES
            </h2>
            <p className="text-sm text-slate-100 max-w-2xl align-middle text-center">
              We Offer A Wide Range Of Services To Help You Get Back On The Road
              Quickly And Safely.
            </p>
          </div>
          {renderFeaturesCard(services)}
        </div>

        {/*about us section */}
        <div
          className="bg-white w-full h-fit  flex flex-col justify-start items-center p-5 gap-6"
          id="about"
        >
          <h1 className=" text-5xl font-bold text-black p-3 border-red-600 border-b-8">
            About us
          </h1>
          <p className=" text-center max-w-3xl">
            Welcome to our car servicing website! We are dedicated to providing
            exceptional automotive maintenance and repair services to keep your
            vehicle running smoothly. With variety of options choose the best
            car servicing . We provide you reliable services in your localities
            .
          </p>
          {renderFeaturesCard(features)}
        </div>

        {/*OUR SERVICES */}
      </div>
    </div>
  );
};

export default HomePage;

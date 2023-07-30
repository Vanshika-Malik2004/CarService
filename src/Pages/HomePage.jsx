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
  const renderFeaturesCard = (displayArray) => {
    return (
      <div className="grid-container">
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
    <div className="flex flex-col w-full h-fit ">
      <div
        className="relative bg-cover h-screen w-full"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <div className="flex justify-center items-center flex-col opacity-80 bg-black absolute z-10  w-full top-0 left-0  h-screen">
          <h1 className="text-white text-5xl font-bold min-w-max">
            Revive your Ride: Expert <br /> Car Servicing at Your Doorstep!
          </h1>
          <p className="text-white max-w-3xl tracking-wide text-center font-light  leading-5 my-6 text-lg">
            Welcome to our car servicing website, your one-stop destination for
            all your automotive maintenance needs. Whether it's routine
            maintenance, repairs, or specialized services, we provide reliable
            solutions tailored to your vehicle's unique requirements.
          </p>
          <button className=" text-white bg-transparent  text-center border transition-all duration-500 hover:scale-105 border-white px-3 py-2.5 hover:opacity-100 hover:bg-red-800">
            <Link to="/login/user"> Let's Get Started</Link>
          </button>
        </div>
      </div>

      {/*about us section */}
      <div className="bg-white w-screen h-fit  flex flex-col justify-start items-center p-5 gap-6">
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
      <div className="bg-slate-100 w-screen h-fit  flex flex-col justify-start items-center p-5 gap-6">
        <h2 className="text-5xl font-bold text-black p-3 border-red-600 border-b-8">
          Our Services
        </h2>
        {renderFeaturesCard(services)}
      </div>
    </div>
  );
};

export default HomePage;

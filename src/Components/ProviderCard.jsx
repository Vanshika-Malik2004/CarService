import React from "react";
import carService1 from "../assets/carService1.avif";
import carService2 from "../assets/carService2.jpg";
import carService3 from "../assets/carService3.jpg";
import carService4 from "../assets/carService4.jpg";
import carService5 from "../assets/carSevice5.jpg";
import carService6 from "../assets/carService6.jpg";
import carService7 from "../assets/carService7.jpg";
import carService9 from "../assets/carService9.jpg";
import carService10 from "../assets/carService10.jpg";
const imageList = [
  carService1,
  carService2,
  carService3,
  carService4,
  carService6,
  carService5,
  carService7,
  carService9,
  carService10,
];
const ProviderCard = ({ id, name, address }) => {
  console.log(id);
  return (
    <div className="movie_container" key={id}>
      <div className="movie_poster">
        <img
          src={imageList[id % 9]}
          className="h-40 max-w-xs w-36 object-contain"
        />
        <h1>{name}</h1>
        <p>{address}</p>
        <button className=" text-white bg-red-800  text-center border transition-all duration-500 hover:scale-105 border-white px-3 py-2.5 hover:opacity-100">
          Explore
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;

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
import { Link } from "react-router-dom";
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
    <div
      className="max-w-lg   rounded-lg shadow bg-white m-4 hover:scale-105"
      key={id}
    >
      <div className="">
        <img src={imageList[id % 9]} class="rounded-t-lg w-full h-1/2" />
        <div className="p-3">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {name}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {address}
          </p>
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <Link to={`/services/${id}`}>Explore</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
/*
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
 */

import React, { useState } from "react";
import {Header} from "../../Components/header/Header";

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Profile");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Reason: ${reason}\nDetails: ${details}`);
  };
  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };
  const toggleDetails2 = () => {
    setIsExpanded2((prev) => !prev);
  };

  const handleLogout = () => {
    Cookies.remove("token");  
    navigate("/"); 
  };

  const handleBack = () => {
    navigate(-1);
  };

  const [activeTab, setActiveTab] = useState("Dashboard"); // Default active tab is Dashboard

  const renderContent = () => {
    // Render content based on the active tab
    switch (activeTab) {
      case "Dashboard":
        return (
          <>
            <div className="w-[100%] flex flex-col   gap-2 3xl:!gap-3">
              <div className="w-100 flex gap-[20px] 3xl:!gap-3 flex-wrap justify-start">
                <div className="flex flex-col items- justify-center shadow-capsule bs-white rounded-[13px] px-4 w-[clamp(260px,260px,260px)] h-[clamp(102px,102px,102px)] duration-300 ease-in-out relative overflow-hidden">
                  <p className="text-[16px] font-[600] font-Montserrat tracking-wide  opacity-80">
                    Pending Reservation
                  </p>
                  <p className="text-[25px] py- leading-[25px] mt-[10px]  font-Outfit tx- font-semibold ">
                    61531
                  </p>

                  <div className="h-[clamp(66px,66px,66px)] w-[clamp(66px,66px,66px)] blue-gradi flex items-center justify-center absolute top-50 end-[-15px] translate-middle rounded-full">
                    <i className="fa-light fa-box-circle-check text-[#ff8d29] text-[23px]"></i>
                  </div>
                </div>
                <div className="flex flex-col items- justify-center shadow-capsule bs-white rounded-[13px] px-4 w-[clamp(260px,260px,260px)] h-[clamp(102px,102px,102px)] duration-300 ease-in-out relative overflow-hidden">
                  <p className="text-[16px] font-[600] font-Montserrat tracking-wide font-semiibold opacity-80">
                    Accepted Reservation
                  </p>
                  <p className="text-[25px] py- leading-[25px] mt-[10px]  font-Outfit tx- font-semibold ">
                    653
                  </p>

                  <div className="h-[clamp(66px,66px,66px)] w-[clamp(66px,66px,66px)] yellow-gradi flex items-center justify-center absolute top-50 end-[-15px] translate-middle rounded-full">
                    <i className="fa-light fa-box-circle-check text-[#ffaf14] text-[23px]"></i>
                  </div>
                </div>
                <div className="flex flex-col items- justify-center shadow-capsule bs-white rounded-[13px] px-4 w-[clamp(260px,260px,260px)] h-[clamp(102px,102px,102px)] duration-300 ease-in-out relative overflow-hidden">
                  <p className="text-[16px] font-[600] font-Montserrat tracking-wide  font-semiibold opacity-80">
                    Cancelled Reservation
                  </p>
                  <p className="text-[25px] py- leading-[25px] mt-[10px]  font-Outfit tx- font-semibold ">
                    546
                  </p>

                  <div className="h-[clamp(66px,66px,66px)] w-[clamp(66px,66px,66px)] red-gradi flex items-center justify-center absolute top-50 end-[-15px] translate-middle rounded-full">
                    <i className="fa-light fa-box-circle-check text-[#f83f6e] text-[23px]"></i>
                  </div>
                </div>
                <div className="flex flex-col items- justify-center shadow-capsule bs-white rounded-[13px] px-4 w-[clamp(260px,260px,260px)] h-[clamp(102px,102px,102px)] duration-300 ease-in-out relative overflow-hidden">
                  <p className="text-[16px] font-[600] font-Montserrat tracking-wide  font-semiibold opacity-80">
                    Completed Reservation
                  </p>
                  <p className="text-[25px] py- leading-[25px] mt-[10px]  font-Outfit tx- font-semibold ">
                    216
                  </p>

                  <div className="h-[clamp(66px,66px,66px)] w-[clamp(66px,66px,66px)] green-gradi flex items-center justify-center absolute top-50 end-[-15px] translate-middle rounded-full">
                    <i className="fa-light fa-box-circle-check text-[#54ba61] text-[23px]"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-[80%] ">
              <div
                className={`flex flex-col p-[15px] bg-[#fff] rounded-lg w-[100%]${
                  isExpanded ? "" : "max-h-0"
                }`}
              >
                <div className="w-[100%] items-center flex justify-between">
                  <div className="font-[500] font-Montserrat">
                    <p className="text-[17px]">Reservation ID</p>
                    <p className="text-[#2565df]">#824409583563</p>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <div className="text-[19px] text-[#ffebeb] w-[120px] justify-center flex items-center py-[5px] rounded-md bg-[#eeab68] font-[600]">
                      <p>Pending</p>
                    </div>
                    <div
                      className="bg-[#dddcdc] w-[25px] h-[25px] flex justify-center items-center rounded-[50%] cursor-pointer"
                      onClick={toggleDetails}
                    >
                      <i
                        className={`fa-solid ${
                          isExpanded ? "fa-angle-up" : "fa-angle-down"
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isExpanded ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="font-[500] font-Montserrat w-[100%]">
                    <p className="text-[23px]">Nelson Norman</p>
                    <p className="text-[13px] text-[#b4b2b2]">
                      (208) 555-0112 · 8502 Preston Rd. Inglewood, Maine 98380
                    </p>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] flex items-center justify-between w-[100%]">
                    <div>
                      <p className="font-[500]">Check In</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Check Out</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Guests & Rooms</p>
                      <p className="font-[600] font-Montserrat">
                        4 Adults, 2 Children, 3 Rooms
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Booked</p>
                      <p className="font-[600] font-Montserrat">28 Jun 22</p>
                    </div>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] w-[100%] items-center flex justify-between">
                    <div className="font-[500] font-Montserrat">
                      <p className="text-[17px]">Total Bill</p>
                      <p className="font-[600] text-[30px] text-[#2565df]">
                        $250
                      </p>
                    </div>
                    <div className="font-[600] flex gap-[10px] items-center">
                      <p>****464723</p>
                    </div>
                  </div>
                  <div className="w-[100%] flex justify-between my-[10px]">
                    <div className="font-[500] font-Montserrat w-[100%]">
                      <p className="text-[23px]">Hotel Damji</p>
                      <p className="text-[13px] text-[#b4b2b2]">
                        4140 Parker Rd. Allentown, New Mexico 31134
                      </p>
                    </div>
                    <div className="text-[19px] text-[red] w-[120px] justify-center flex items-center h-[40px] rounded-md border-[1.9px] border-[red] font-[600] cursor-pointer">
                      <p>Cancel ?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-[80%] ">
              <div
                className={`flex flex-col p-[15px] bg-[#fff] rounded-lg w-[100%]${
                  isExpanded ? "" : "max-h-0"
                }`}
              >
                <div className="w-[100%] items-center flex justify-between">
                  <div className="font-[500] font-Montserrat">
                    <p className="text-[17px]">Reservation ID</p>
                    <p className="text-[#2565df]">#824409583563</p>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <div className="text-[19px] text-[#ffebeb] w-[120px] justify-center flex items-center py-[5px] rounded-md bg-[#f88d22] font-[600]">
                      <p>Upcoming</p>
                    </div>
                    <div
                      className="bg-[#dddcdc] w-[25px] h-[25px] flex justify-center items-center rounded-[50%] cursor-pointer"
                      onClick={toggleDetails2}
                    >
                      <i
                        className={`fa-solid ${
                          isExpanded2 ? "fa-angle-up" : "fa-angle-down"
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isExpanded2 ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="font-[500] font-Montserrat w-[100%]">
                    <p className="text-[23px]">Nelson Norman</p>
                    <p className="text-[13px] text-[#b4b2b2]">
                      (208) 555-0112 · 8502 Preston Rd. Inglewood, Maine 98380
                    </p>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] flex items-center justify-between w-[100%]">
                    <div>
                      <p className="font-[500]">Check In</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Check Out</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Guests & Rooms</p>
                      <p className="font-[600] font-Montserrat">
                        4 Adults, 2 Children, 3 Rooms
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Booked</p>
                      <p className="font-[600] font-Montserrat">28 Jun 22</p>
                    </div>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] w-[100%] items-center flex justify-between">
                    <div className="font-[500] font-Montserrat">
                      <p className="text-[17px]">Total Bill</p>
                      <p className="font-[600] text-[30px] text-[#2565df]">
                        $250
                      </p>
                    </div>
                    <div className="font-[600] flex gap-[10px] items-center">
                      <p>****464723</p>
                    </div>
                  </div>
                  <div className="w-[100%] flex justify-between my-[10px]">
                    <div className="font-[500] font-Montserrat w-[100%]">
                      <p className="text-[23px]">Hotel Damji</p>
                      <p className="text-[13px] text-[#b4b2b2]">
                        4140 Parker Rd. Allentown, New Mexico 31134
                      </p>
                    </div>
                    <div className="text-[19px] text-[red] w-[120px] justify-center flex items-center h-[40px] rounded-md border-[1.9px] border-[red] font-[600] cursor-pointer">
                      <p>Cancel ?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[80%] ">
              <div
                className={`flex flex-col p-[15px] bg-[#fff] rounded-lg w-[100%]${
                  isExpanded ? "" : "max-h-0"
                }`}
              >
                <div className="w-[100%] items-center flex justify-between">
                  <div className="font-[500] font-Montserrat">
                    <p className="text-[17px]">Reservation ID</p>
                    <p className="text-[#2565df]">#824409583563</p>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <div className="text-[19px] text-[#ff2d2d] w-[120px] justify-center flex items-center py-[5px] rounded-md border-[1.9px] border-[red] font-[600]">
                      <p>Cancel</p>
                    </div>
                    <div
                      className="bg-[#dddcdc] w-[25px] h-[25px] flex justify-center items-center rounded-[50%] cursor-pointer"
                      onClick={toggleDetails2}
                    >
                      <i
                        className={`fa-solid ${
                          isExpanded2 ? "fa-angle-up" : "fa-angle-down"
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isExpanded2 ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="font-[500] font-Montserrat w-[100%]">
                    <p className="text-[23px]">Nelson Norman</p>
                    <p className="text-[13px] text-[#b4b2b2]">
                      (208) 555-0112 · 8502 Preston Rd. Inglewood, Maine 98380
                    </p>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] flex items-center justify-between w-[100%]">
                    <div>
                      <p className="font-[500]">Check In</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Check Out</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Guests & Rooms</p>
                      <p className="font-[600] font-Montserrat">
                        4 Adults, 2 Children, 3 Rooms
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Booked</p>
                      <p className="font-[600] font-Montserrat">28 Jun 22</p>
                    </div>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] w-[100%] items-center flex justify-between">
                    <div className="font-[500] font-Montserrat">
                      <p className="text-[17px]">Total Bill</p>
                      <p className="font-[600] text-[30px] text-[#2565df]">
                        $250
                      </p>
                    </div>
                    <div className="font-[600] flex gap-[10px] items-center">
                      <p>****464723</p>
                    </div>
                  </div>
                  <div className="w-[100%] flex justify-between my-[10px]">
                    <div className="font-[500] font-Montserrat w-[100%]">
                      <p className="text-[23px]">Hotel Damji</p>
                      <p className="text-[13px] text-[#b4b2b2]">
                        4140 Parker Rd. Allentown, New Mexico 31134
                      </p>
                    </div>
                    <div className="text-[19px] text-[red] w-[120px] justify-center flex items-center h-[40px] rounded-md border-[1.9px] border-[red] font-[600] cursor-pointer">
                      <p>Cancel ?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "Cancellation":
        return (
          <>
            <div className=" w-[80%] ">
              <div className="flex flex-col p-[15px] bg-[#fff] rounded-lg w-[100%]">
                <div className="w-[100%] items-center flex justify-between">
                  <div className="font-[500] font-Montserrat">
                    <p className="text-[17px]">Reservation ID</p>
                    <p className="text-[#2565df]">#824409583563</p>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <div className="text-[19px] text-[#ff2d2d] w-[120px] justify-center flex items-center py-[5px] rounded-md border-[1.9px] border-[red] font-[600]">
                      <p>Cancel</p>
                    </div>
                  </div>
                </div>

                <div className="transition-all duration-300 overflow-hidden">
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="font-[500] font-Montserrat w-[100%]">
                    <p className="text-[23px]">Nelson Norman</p>
                    <p className="text-[13px] text-[#b4b2b2]">
                      (208) 555-0112 · 8502 Preston Rd. Inglewood, Maine 98380
                    </p>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] flex items-center justify-between w-[100%]">
                    <div>
                      <p className="font-[500]">Check In</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Check Out</p>
                      <p className="font-[600] font-Montserrat">
                        10:30 AM, 23 Jun 22
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Guests & Rooms</p>
                      <p className="font-[600] font-Montserrat">
                        4 Adults, 2 Children, 3 Rooms
                      </p>
                    </div>
                    <span className="w-[2px] bg-[black] h-[56px]"></span>
                    <div>
                      <p className="font-[500]">Booked</p>
                      <p className="font-[600] font-Montserrat">28 Jun 22</p>
                    </div>
                  </div>
                  <div className="w-[100%] border-[1px] my-[10px]"></div>
                  <div className="px-[10px] w-[100%] items-center flex justify-between">
                    <div className="font-[500] font-Montserrat">
                      <p className="text-[17px]">Total Bill</p>
                      <p className="font-[600] text-[30px] text-[#2565df]">
                        $250
                      </p>
                    </div>
                    <div className="font-[600] flex gap-[10px] items-center">
                      <p>****464723</p>
                    </div>
                  </div>
                  <div className="w-[100%] flex justify-between my-[10px]">
                    <div className="font-[500] font-Montserrat w-[100%]">
                      <p className="text-[23px]">Hotel Damji</p>
                      <p className="text-[13px] text-[#b4b2b2]">
                        4140 Parker Rd. Allentown, New Mexico 31134
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "Profile":
        return (
          <>
            <div className="bg-white p-6 rounded-lg flex-col flex shadow-md">
              <div className="flex justify-between items-center">
                <div className=" flex justify-start items-center  gap-[20px]">
                  <div className="">
                    <img
                      src="../../../public/img/avter/author (1).jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Cameron Williamson
                    </h2>
                    <p className="text-[14px] text-gray-500  font-Montserrat  font-[400]">
                      Member since 2019
                    </p>
                  </div>
                </div>
                <button
                  className="text-blue-500  font-[600] border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
                  onClick={() => setActivePage("EditProfile")}
                >
                  Edit Profile
                </button>
              </div>
              {/* 
              <div className="mt-6">
                <div className=" p-4 rounded-md flex justify-between items-center">
                  <p className="text-gray-800 font-semibold">Password</p>
                  <button
                    className="text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
                    onClick={() => setActivePage("ChangePassword")}
                  >
                    Change Password
                  </button>
                </div>
              </div> */}
              <div className="">
                <div className="w-[100%] border-[1px] my-[10px]"></div>
                <div className="px-[10px] flex items-center justify-between w-[100%]">
                  <div>
                
                    <p className="font-[600] font-Montserrat">
                      8502 Preston Rd. Inglewood, Maine 98380
                    </p>
                  </div>
                  <span className="w-[2px] bg-[gray] h-[36px]"></span>
                  <div>
             
                    <p className="font-[600] font-Montserrat">
                      nelso.norman@example.com
                    </p>
                  </div>
                  <span className="w-[2px] bg-[gray] h-[36px]"></span>
                  <div>
                  
                    <p className="font-[600] font-Montserrat">(208) 555-0112</p>
                  </div>
            
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Profile
              </h2>
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="col-span-2 border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="col-span-2 border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="col-span-2 border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 bs-mix-green text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => setActivePage("Profile")}
                >
                  Save Changes
                </button>
              </form>
            </div>
            ); case "ChangePassword": return (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Change Password
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p className="text-green-600 mb-1">
                    ✅ Password must be minimum 8 characters
                  </p>
                  <p>🔘 Must contain at least one special character</p>
                  <p>🔘 Must contain at least one numeric value</p>
                </div>
                <button
                  type="button"
                  className="mt-4 bs-mix-green  text-white px-4 py-2 rounded-md bs-mix-green"
                  onClick={() => setActivePage("Profile")}
                >
                  Save Changes
                </button>
              </form>
            </div>
            )
          </>
        );
      case "Support":
        return (
          <>
            <div className="bg-[#fff] p-6 rounded-lg shadow-lg  w-[100%] mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Support Tickets
                </h2>
                <button
                  className="bs-mix-green text-white px-4 py-2 rounded-md "
                  onClick={toggleForm}
                >
                  {isFormVisible ? "Close Form" : "Add a Ticket"}
                </button>
              </div>

              {/* Add Ticket Form */}
              {isFormVisible && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src="../../../public/img/avter/author (1).jpg"
                      alt="User"
                    />
                    <p className="text-lg font-semibold text-gray-800">
                      What is the issue?
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Lost Luggages"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departments
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                      <option>Baggage & Luggages</option>
                      <option>Customer Service</option>
                      <option>Room Service</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priorities
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Details
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write Details..."
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
                      Add Fields
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Submit Ticket
                    </button>
                  </div>
                </div>
              )}

              {/* Example Ticket Card */}
              {!isFormVisible && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src="https://via.placeholder.com/50"
                      alt="User"
                    />
                    <div>
                      <p className="text-sm text-blue-500 font-medium">
                        #839464283
                      </p>
                      <h3 className="text-lg font-semibold text-gray-800">
                        I lost my luggage in hotel lobby
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="bg-red-100 text-red-600 px-3 py-1 text-xs font-medium rounded-full">
                      Closed
                    </span>
                    <p className="text-sm text-gray-500">3h ago</p>
                  </div>
                  <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                    I would like to state that my name is Nelson Norman and I
                    reside at 8502 Preston Rd. Inglewood, Maine 98380, On 23
                    April 2022, I stayed in your hotel.
                  </p>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    I am writing this letter to you in order to complain about
                    the loss of luggage I recently encountered on the above-said
                    date in your hotel. My luggage was checked in at 11:00 AM on
                    23 April 2022 and upon arrival at the room my luggage was
                    not seen which would be considered as lost.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
                      Luggage
                    </span>
                    <span className="bg-pink-100 text-pink-600 text-xs font-medium px-3 py-1 rounded-full">
                      Lost
                    </span>
                    <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                      Hotel
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case "Logout":
        handleLogout();
        return <p>Logging out...</p>;
      default:
        return null;
    }
  };

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };
  return (
    <>
      <div className="w-[100%] md11:w-[100%] md150:w-[100%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  px-[30px] py-[30px] ">
        <div className="  flex   w-[100%] md11:h-[100vh] overflow-hidden md150:h-[90vh]  relative    rounded-[19px] border-[1px] border-[#007e2c]">
        <Header />
        <div className=" flex flex-col w-[100%] mt-[20px] gap-[30px]">
          <div className="flex  gap-[10px] border-b-[1px] border-[#007e2c] pl-[30px]  pb-[10px]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
            <i
              className="fa-solid fa-angle-up fa-rotate-270"
              onClick={handleBack}
            ></i>

            <div
              className=" font-Potua  flex items-center gap-[10px] cursor-pointer"
              onClick={handleBack}
            >
              <p>DASHBOARD</p>
            
            </div>
          </div>

          <div className=" pl-[20px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">

            <div className="   py-[20px]  px-[20px]  md150:h-[70vh] md11:h-[73vh]   items-center  h-[67vh] bg-[#11aa110d]  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
              <div className=" h-[100%] w-[100%]  gap-[30px]  justify-between flex ">
                <div className="w-[220px] p-[15px] h-fit flex flex-col gap-[15px] rounded-lg bg-[#fff] border-[1px]">
                  <div
                    className={`flex ${
                      activeTab === "Dashboard"
                        ? "bs-mix-green  text-[#fff]   "
                        : "bg-[#fff] text-[#000] border-[1px] border-[#dfdfdf] "
                    } rounded-lg items-center shadow-md  gap-[10px] px-[15px] py-[8px] text-[20px] font-[600] cursor-pointer`}
                    onClick={() => setActiveTab("Dashboard")}
                  >
                    <i className="fa-duotone fa-light fa-table-columns"></i>
                    <p>Dashboard</p>
                  </div>
                  <div
                    className={`flex ${
                      activeTab === "Cancellation"
                          ? "bs-mix-green  text-[#fff]   "
                        : "bg-[#fff] text-[#000] border-[1px] border-[#dfdfdf] "
                    } rounded-lg items-center shadow-sm  gap-[10px] px-[15px] py-[8px] text-[20px] font-[600] cursor-pointer`}
                    onClick={() => setActiveTab("Cancellation")}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                    <p>Cancellation</p>
                  </div>
                  <div
                    className={`flex ${
                      activeTab === "Profile"      ? "bs-mix-green  text-[#fff]   "
                        : "bg-[#fff] text-[#000] border-[1px] border-[#dfdfdf] "
                    } rounded-lg items-center shadow-sm  gap-[10px] px-[15px] py-[8px] text-[20px] font-[600] cursor-pointer`}
                    onClick={() => setActiveTab("Profile")}
                  >
                    <i className="fa-solid fa-user"></i>
                    <p>Profile</p>
                  </div>
                  <div
                    className={`flex ${
                      activeTab === "Support"       ? "bs-mix-green  text-[#fff]   "
                        : "bg-[#fff] text-[#000] border-[1px] border-[#dfdfdf] "
                    } rounded-lg items-center shadow-sm  gap-[10px] px-[15px] py-[8px] text-[20px] font-[600] cursor-pointer`}
                    onClick={() => setActiveTab("Support")}
                  >
                    <i className="fas fa-user-headset"></i>
                    <p>Support</p>
                  </div>
                  <div
                    className={`flex ${
                      activeTab === "Logout"       ? "bs-mix-green  text-[#fff]   "
                        : "bg-[#fff] text-[#000] border-[1px] border-[#dfdfdf] "
                    } rounded-lg items-center shadow-sm  gap-[10px] px-[15px] py-[8px] text-[20px] font-[600] cursor-pointer`}
                    onClick={() => setActiveTab("Logout")}
                  >
                    <i className="fas fa-door-open"></i>
                    <p>Log out</p>
                  </div>
                </div>
                <div className="w-[90%] overflow-y-auto flex flex-col  gap-[20px]">
                  {renderContent()}

                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react'
import {Header} from '../../Components/header/Header'

import Editimg from '../../../public/img/Foodsection/edit.png'
import { ApiGet } from '../../helper/axios';


// import userpng from '../../../public/img/AdminSpalsh/user 3.png'
 
export default function CreateUser() {
 const [isFeatured, setIsFeatured] = useState(false);
 const [contacts, setContacts] = useState([]);

  
 useEffect(() => {
  const fetchContacts = async () => {
    try { 
      const response = await ApiGet("/admin/contact-us");
      console.log('response', response)
      setContacts(response.contacts);
    } catch (error) {
      console.error("Error fetching visa packages:", error);
    }
  };

  fetchContacts();
}, []);


 
 const handleToggle = () => {
   setIsFeatured((prev) => !prev);
 };

  return (
    <>
       <div className="w-[100%] md11:w-[100%] md150:w-[100%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  px-[30px] py-[30px] ">
       <div className="  flex   w-[100%] md11:h-[100vh] overflow-hidden md150:h-[90vh]  relative    rounded-[19px] border-[1px] border-[#007e2c]">
       <Header />
       <div className=" flex flex-col w-[100%] mt-[20px] gap-[30px]">
          <div className="flex  gap-[10px] border-b-[1px] border-[#007e2c] pl-[30px]  pb-[10px]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
            <i className="fa-solid fa-angle-up fa-rotate-270"></i>

            <div className=" font-Potua  flex items-center gap-[10px] cursor-pointer">
              <p>USERS</p>
              <p>MANAGEMENT</p>
            </div>
          </div>

          <div className=" pl-[20px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
            <div className="  py-[20px] px-[20px]  md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
              <div className="flex justify-between w-full gap-[20px]">
                <div className="w-full h-full mx-auto mb-3 scroll-d-none">
                  <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                    <div className="box-border w-full">
                      <div className="sticky top-0 flex  bs-mix-green border-black w-full">
                        <div className="flex justify-center text-center gap-[7px] py-[10px] border-r border-b border-black items-center px-3 min-w-[6%] max-w-[6%]">
                          <input
                            type="checkbox"
                            id="check-all"
                            style={{ width: "15px", height: "15px" }}
                          />
                          <p className="w-fit  md11:text-[14px] md150:text-[18px] font-[600] text-[#fff] font-Outfit">
                            Sr.
                          </p>
                        </div>

                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                           FirstName
                          </p>
                        </div>
                  
                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                          LastName
                          </p>
                        </div>
                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[15%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff] ">
                        PhoneNumber
                          </p>
                        </div>

                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[14%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                          E-Mail
                          </p>
                        </div>
                        <div className="flex justify-left text-left py-2 border-b border-black px-3 min-w-[40%] max-w-[10%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                            Message
                          </p>
                        </div>
                      </div>
                      {contacts?.map((data, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="flex justify-center items-center text-center py-[10px] border-r border-b border-black gap-[7px] px-3 min-w-[6%] max-w-[6%]">
                          <input
                            type="checkbox"
                            style={{ width: "15px", height: "15px" }}
                            className="ml-[-25%]"
                          />
                          <p className="font-[600] md11:text-[15px] md150:text-[17px] md11:mt-[5%] md150:mt-[2%]">{index + 1}</p>
                        </div>

                        <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">{data?.firstName}</p>
                        </div>
                        <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">{data?.lastName}</p>
                        </div>
                        <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit">{data?.phone}</p>
                        </div>
                        <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[15%]">
                          <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">{data?.email}</p>
                        </div>

                   
                        <div className="flex justify-center items-center gap-[15px] text-center py-2 border-b  border-black min-w-[40%] max-w-[9%]">
                        {data?.message}
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex absolute bottom-3 right-6  font-Montserrat  items-center gap-[10px]">
                  <div>
                    <p className="text-[15px] font-[600] text-[#2565df]">
                      Total pages - 1
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-center border-[1.7px] border-[#000] cursor-pointer py-[5px] px-[24px] rounded-[10px] text-[14px] font-[600]">
                      <p>1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent className="md150:w-[390px] md11:w-[360px] rounded-[10px] relative md150:h-[510px] md11:h-[460px]">
                {(onClose) => (
                  <>
                    <div className="relative ">
                      <div className="relative">
                        <div className="flex justify-center md11:p-[25px] md150:p-[30px]">
                          <img className="w-[90px]" src={userpng} />
                        </div>
                        <div className="flex gap-[30px] relative  px-[30px]">
                          <div className="flex flex-col  gap-[10px]">
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] font-[600]">
                                Name:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] font-[600]">
                                Pravruti:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] font-[600]">
                                Kshetra:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] mt-[2px] font-[600]">
                                Designation:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px]   font-[600]">
                                Phone no:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] font-[600]">
                                Mondal name :
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] mt-[3px] font-[600]">
                                Password :
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col md11:gap-[10px] md150:gap-[15px]">
                            <div className="flex items-center  md150:mt-[1px] gap-[40px]">
                              <input
                                className="px-[5px] relative md150:top-[5px] w-[100%] text-[15px] font-[400] outline-none border-b-[1px]"
                                type="text"
                                name="name"
                                value={userData?.name}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="flex relative   md150:mt-[4px] items-center gap-[40px]">
                              <div
                                ref={pravrutiDropdownRef}
                                className="px-[5px] flex justify-between items-center md11:text-[14px] md150:text-[16px] w-[100%] border-b-[1px] cursor-pointer"
                                onClick={toggleDropdown}
                              >
                                <p>{selectedPravruti.name}</p>
                                <i
                                  className={`fa-solid fa-angle-up ${
                                    isDropdownOpen
                                      ? "fa-rotate-0"
                                      : "fa-rotate-180"
                                  }`}
                                ></i>
                              </div>

                              {isDropdownOpen && (
                                <div className="border-[1.5px] w-[100%] md150:w-[110%] left-[-3px] z-[10] top-[29px]  min-h-[100%] overflow-y-auto bg-white absolute rounded-[10px] py-[2px] flex flex-col">
                                  {pravruties?.map((pravruti) => (
                                    <div
                                      key={pravruti._id}
                                      onClick={() =>
                                        handleSelectPravruti(pravruti)
                                      }
                                      className={`px-[8px] py-[5px] border-b-[1.7px] border-[#000] md11:text-[13px] md150:text-[16px] rounded-[5px]  cursor-pointer ${
                                        pravruti._id === selectedPravruti.id
                                          ? " bs-mix-green text-white"
                                          : "hover:bg-[#f5e7ca]"
                                      }`}
                                    >
                                      <p>{pravruti.name}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex relative items-center gap-[40px]">
                              <div
                                ref={kshetraDropdownRef}
                                className="px-[5px] flex justify-between items-center md11:text-[14px] md150:text-[16px] w-[100%] border-b-[1px] cursor-pointer"
                                onClick={toggleKhestraDropdown}
                              >
                                <p>{selectedKshetra.name}</p>
                                <i
                                  className={`fa-solid fa-angle-up ${
                                    isKshetraDropdownOpen
                                      ? "fa-rotate-0"
                                      : "fa-rotate-180"
                                  }`}
                                ></i>
                              </div>

                              {isKshetraDropdownOpen && (
                                <div className="border-[1.5px] w-[100%] md150:w-[110%] left-[-3px] z-[10] top-[29px] h-[100%] min-h-[150px] overflow-y-auto bg-white absolute rounded-[10px] py-[2px] flex flex-col">
                                  {kshetras?.map((kshetra) => (
                                    <div
                                      key={kshetra._id}
                                      onClick={() =>
                                        handleSelectKshetra(kshetra)
                                      }
                                      className={`px-[8px] py-[5px] border-b-[1.7px] border-[#000] rounded-[5px] md11:text-[13px] md150:text-[16px]   cursor-pointer ${
                                        kshetra._id === selectedKshetra.id
                                          ? " bs-mix-green text-white"
                                          : "hover:bg-[#f5e7ca]"
                                      }`}
                                    >
                                      <p>{kshetra.name}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex relative items-center gap-[40px]">
                              <div
                                ref={designationDropdownRef}
                                className="px-[5px] flex justify-between items-center md11:text-[14px] md150:text-[16px] w-[100%] border-b-[1px] cursor-pointer"
                                onClick={toggleDesgnationDropdown}
                              >
                                <p>{selectedDesignation.name}</p>
                                <i
                                  className={`fa-solid fa-angle-up ${
                                    isDesigDropdownOpen
                                      ? "fa-rotate-0"
                                      : "fa-rotate-180"
                                  }`}
                                ></i>
                              </div>

                              {isDesigDropdownOpen && (
                                <div className="border-[1.5px] w-[110%] left-[-3px] z-[10] top-[29px] h-[100%] min-h-[130px] overflow-y-auto bg-white absolute rounded-[10px] py-[2px] flex flex-col">
                                  {designations?.map((designations) => (
                                    <div
                                      key={designations._id}
                                      onClick={() =>
                                        handleSelectDesignation(designations)
                                      }
                                      className={`px-[8px] py-[5px] border-b-[1.7px] border-[#000] rounded-[5px] md11:text-[13px] md150:text-[16px]  cursor-pointer ${
                                        designations._id ===
                                        selectedDesignation.id
                                          ? " bs-mix-green text-white"
                                          : "hover:bg-[#f5e7ca]"
                                      }`}
                                    >
                                      <p>{designations.name}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center md11:mt-[3px] md150:mt-[0px]  gap-[40px]">
                              <input
                                className="px-[5px] text-[14px] w-[100%] font-[400] outline-none border-b-[1px]"
                                type="tel"
                                name="phoneNumber"
                                value={userData?.phoneNumber}
                                onChange={(e) => {
                                  const phoneNumber = e.target.value;
                                  if (/^\d{0,10}$/.test(phoneNumber)) {
                                    setUserData({ ...userData, phoneNumber });
                                  }
                                }}
                                minLength={10}
                                maxLength={10}
                                pattern="\d{10}"
                                required
                              />
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <input
                                className="px-[5px] w-[100%] text-[14px] font-[400] outline-none border-b-[1px]"
                                type="text"
                              />
                            </div>
                            <div className="flex items-center gap-[10px]">
                              <input
                                className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                              />
                              <i
                                className={`fa-regular ${
                                  showPassword ? "fa-eye " : "fa-eye-slash"
                                }`}
                                onClick={togglePasswordVisibility}
                                style={{
                                  cursor: "pointer",
                                  color: showPassword ? "inherit" : "#007e2c ",
                                }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className=" bg-[#00984B] cursor-pointer  font-Montserrat  absolute bottom-0 w-[100%] font-[500] text-[18px]   flex justify-center py-[10px] text-[white]"
                      onClickCapture={onClose}
                      onClick={handleSubmit}
                    >
                      <p>Click here to submit</p>
                    </div>
                  </>
                )}
              </ModalContent>
            </Modal> */}
          </div>
          </div>
        </div>
      </div>

      {/* <Modal isOpen={isDelOpen} onOpenChange={setIsDelOpen}>
        <ModalContent className="md:max-w-[350px] max-w-[333px] relative  flex justify-center !py-0 mx-auto  h-[300px] shadow-delete ">
          {(onClose) => (
            <>
              <div className="relative w-[100%] h-[100%] ">
                <div className="relative  w-[100%] h-[100%]">
                  <div className="w-[100%] flex gap-7 flex-col">
                    <div className="w-[100%] mt-[30px] p-[10px] mx-auto flex justify-center s">
                      <i className=" text-[80px] text-[red] shadow-delete-icon rounded-full fa-solid fa-circle-xmark"></i>
                    </div>
                    <div className=" mx-auto justify-center flex text-[28px] font-[500]  font-Montserrat ">
                      <p>Are you sure ?</p>
                    </div>
                    <div className="absolute bottom-0 flex w-[100%]">
                      <div
                        className="w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[red] rounded-bl-[10px] text-[#fff] font-[600]  font-Montserrat  text-[20px]"
                        onClick={handleDeleteRecord}
                      >
                        <p>Delete</p>
                      </div>
                      <div
                        className="w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[#26b955] rounded-br-[10px] text-[#fff] font-[600]  font-Montserrat  text-[20px]"
                        onClick={closeDeleteModal}
                      >
                        <p>Cancel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
}

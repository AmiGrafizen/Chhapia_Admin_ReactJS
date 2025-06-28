import React, { useEffect, useState } from "react";
import logo from "../../../public/img/logo.png";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";
 
export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    const savedPassword = Cookies.get("password");
    if (savedEmail && savedPassword) {
      setFormData({ email: savedEmail, password: savedPassword });
      setIsChecked(true);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle checkbox toggle
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Handle login submission
  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast("Please fill in both fields.", "error");
      return;
    }
  
    if (isChecked) {
      Cookies.set("email", email, { expires: 1 / 12 }); 
      Cookies.set("password", password, { expires: 1 / 12 });
    } else {
      Cookies.remove("email");
      Cookies.remove("password");
    }

    try {
      // Call login API
      const response = await axios.post("https://server.grafizen.in/api/v2/vinayak/auth/admin/login", formData); 
      console.log("Login API Response:", response); 
      const user = response.data?.user;
      console.log('user', user)
      const token = user?.tokens?.access?.token;
      console.log('token', token)
    if (token) {
      Cookies.set('authToken', token);
      toast("Login successful!", "success");
      navigate("/landing-page"); 
    } else {
      alert("invalid email or password.")
      throw new Error("Login failed: Invalid user data.");
    }
    } catch (error) {
      alert("invalid email or password.")
      console.error("Login error:", error);
      toast(error.message || "Failed to login. Please try again.", "error");
    }
  };

  return (
    <div className="w-[100%] bg-main relative">
      {/* <img
        className="w-[100%] absolute h-[100vh] flex z-[-20] 2xl:hidden"
        src={loginimg}
        alt="Login Background"
      />
      <img
        className="w-[100%] absolute h-[100vh] z-[-20] hidden 2xl:flex"
        src={loginimgdesk}
        alt="Login Background Desktop"
      /> */}
<div>
  {/* <img  className=' absolute top-[25%] right-[21%]' src={logo} /> */}
</div>
      <div className="z-30 flex h-[100vh] bg-[#] justify-end items-center pt-[16%] mr-[12%]">
        <div className="flex flex-col gap-[30px]  bg-white  p-[30px] rounded-[10px] w-[460px]">
        <div className="  border-[1px] border-[#17701b] rounded-[10px]">
          <input
            className="w-[100%] h-[45px]  rounded-[10px] px-[20px] text-[17px] outline-none"
            placeholder="Enter email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          </div>
          <div className="  border-[1px] border-[#17701b] rounded-[10px]">
          <input
            className="w-[100%] h-[45px] rounded-[10px] px-[20px] text-[17px] outline-none"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
      
          />
          </div>
          <label className="flex gap-[10px] px-[10px] text-[17px] cursor-pointer text-[#007e2c]">
            <input
              type="checkbox"
              id="custom-checkbox"
              style={{ display: "none" }}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: isChecked ? "#007e2c" : "#fff",
                borderRadius: "28%",
                border: "1px solid #007e2c",
                display: "inline-block",
                position: "relative",
                cursor: "pointer",
              }}
            >
              {isChecked && (
                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    left: "5px",
                    width: "6px",
                    height: "10px",
                    border: "solid white",
                    borderWidth: "0 2px 2px 0",
                    transform: "rotate(45deg)",
                  }}
                ></span>
              )}
            </span>
            <p>Remember my Preference</p>
          </label>

          <div
            className="text-white cursor-pointer  bs-mix-green  text-[23px] font-bold  bs-mix-green flex justify-center items-center py-[8px] rounded-[10px] transition duration-300 ease-in-out transform hover:bg-[#007e2c] hover:scale-20 active:scale-105"
            onClick={handleLogin}
          >
            <p>LOGIN</p>
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  BarChart3,
  ShoppingCart,
  Users,
  Bed,
  Star,
  Box,
  Home,
  Hotel,
  FileText,
  Utensils,
  Heart,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { image } from "@nextui-org/theme";
import logo from "../../../public/img/logo.png";

export function Header() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate(); // Hook from react-router-dom for navigation
  const location = useLocation();
  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  const handleItemClick = (path) => {
    setSelectedItem(path); // Update selected item
    navigate(path); // Use navigate to go to the clicked path
  };

  const navItems = [
    // { title: "Dashboard", icon: BarChart3, path: "/dashboard" },
    { title: "Landing ", icon: Home, path: "/landing-page" },
    { title: "product", icon: Home, path: "/create-product" },
    { title: "Users", icon: Users, path: "/contact-us" },
    // { title: "Rooms", icon: Bed, path: "" },
    { title: "Category", icon: FileText, path: "" },
    // { title: "Bookings", icon: Box, path: "" },

    // { title: "Support", icon: Heart, path: "/warranty" },
  ];
  return (
    <aside
      style={{
        position: "",
        left: 0,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: isCollapsed ? "4rem" : "13rem",
        borderRight: "1px solid green",
       
        // background: "#007e2c",
        transition: "all 300ms ease-in-out",
      }}
      className=" bs-mix-green  !font-Roboto"
    >
      <div
        style={{
          display: "flex",
          height: "57px",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft:"10px"
        }}
        className=" font-Poppins bg-white"
      >
        {!isCollapsed && (
          <>
            {/* <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>Dashboard</span> */}
            <div className="  text-[13px] font-[600] p-[5px]">
              Vinayak Enterprise
            </div>
          </>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: "transparent",
            border: "none",
            color: "green",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "0.375rem",
          }}
        >
          <ChevronLeft
            style={{
              height: "1.5rem",
              width: "1.5rem",
              transition: "transform 300ms ease-in-out",
              transform: isCollapsed ? "rotate(180deg)" : "none",
            }}
          />
        </button>
      </div>

      <nav
        style={{
          flex: 1,
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop:'20px'
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.title}
            onClick={() => handleItemClick(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: isCollapsed ? "0.75rem" : "0.5rem 1rem",
              background:
                selectedItem === item.path ? "rgba(38, 133, 23)" : "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "0.375rem",
              transition: "background-color 150ms ease-in-out",
              position: "relative",
            }}
            
          >
            <item.icon
              style={{
                height: "1.25rem",
                width: "1.25rem",
                marginRight: isCollapsed ? 0 : "0.5rem",
              }}
            />
            {!isCollapsed && <span>{item.title}</span>}
            {isCollapsed && (
              <div
                className="tooltip font-Montserrat"
                style={{
                  display: "none",
                  position: "absolute",
                  left: "100%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  marginLeft: "0.5rem",
                  whiteSpace: "nowrap",
                  zIndex: 40,
                }}
                
              >
                {item.title}
              </div>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}

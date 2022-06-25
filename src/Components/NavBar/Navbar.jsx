import React from "react";
import { Grid } from "antd";

import Logo from "./../../Assects/accounting.png";
import "./Navbar.css";
import "antd/dist/antd.css";

const { useBreakpoint } = Grid;

const Navbar = () => {
  const { sm, md, lg } = useBreakpoint();

  const headingFontSize = lg ? '1.5rem' : (md ? '1.3rem' : (sm ? '1.1rem' : '10px'));

  return (
    <div className="navbar">
      <img src={Logo} alt="" width="40px" />
      {
        sm && <h2 style={{ fontSize: headingFontSize }}>T-ACCOUNT RULES!!!</h2>
      }
    </div>
  );
};

export default Navbar;

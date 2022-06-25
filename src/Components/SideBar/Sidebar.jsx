import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  SkinOutlined,
  MenuOutlined,
  SecurityScanOutlined,
  AccountBookOutlined,
  DollarCircleOutlined,
  CommentOutlined
} from "@ant-design/icons";

import "./Sidebar.css";
import "antd/dist/antd.css";

const { SubMenu } = Menu;

export const menuItems = [
  {
    label: "TAccounts",
    href: "/",
    id: "tAccounts",
    icon: <AccountBookOutlined />
  },
  {
    label: "Trial Balance",
    href: "/trial-balance",
    id: "trialBalance",
    icon: <DollarCircleOutlined />
  },
  {
    label: "Feedback",
    href: "/feedback",
    id: "feedback",
    icon: <CommentOutlined />
  }
];

const Sidebar = () => {
  const [current, setCurrent] = useState('');

  return (
    <div className="side-bar">
      <Menu
        theme="dark"
        mode="inline"
        onClick={e => setCurrent(e.key)}
        selectedKeys={[current]}
      >
        <div className="logo">
          {/* <AccountBookOutlined style={{fontSize:'35px'}}/> */}
        </div>
        {/* <p className="side-heading">Pages</p> */}
        {/* <Menu.Item key="7" icon={<SecurityScanOutlined />}> */}
        {/* <Menu.Item key="5" icon={<MenuOutlined />}> */}
        {menuItems.map((menuItem, i) => {
          const classes = [];
          const isActive = menuItem.href === window.location.pathname;
          isActive && classes.push('active');

          return (
            <Menu.Item key={String(i)} className={classes.join(' ')}>
              <Link to={menuItem.href}>
                {menuItem.icon}
                <span className="nav-text">{menuItem.label}</span>
              </Link>
            </Menu.Item>
          );
        })}
        {/* <Menu.Item key="4" icon={<SkinOutlined />}>
          <Link to="/profit-and-loss-account">Profit and Loss</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<SecurityScanOutlined />}>
          <Link to="/balance-sheet">Balance Sheet</Link>
        </Menu.Item> */}
      </Menu>
    </div>
  );
};

export default Sidebar;

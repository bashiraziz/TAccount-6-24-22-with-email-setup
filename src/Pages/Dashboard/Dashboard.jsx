import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import Navbar from "../../Components/NavBar/Navbar.jsx";
import Sidebar from "../../Components/SideBar/Sidebar";
import TrialBalance from "../TrialBalance/TrialBalance.jsx";
import ProfitAndLoss from "../ProfitAndLoss/ProfitAndLoss.jsx";
import BalanceSheet from "../BalanceSheet/BalanceSheet.jsx";
import TAccount from "../taccount-page";
import Feedback from "../Feedback";
import "./Dashboard.css";
import "antd/dist/antd.css";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Layout>
        <Layout>
          <Sider
            className={`site-layout-background ${collapsed ? 'sidebar-collapsed': 'sidebar-expanded'}`}
            breakpoint="md"
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          >
            <Sidebar />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background">
              <Navbar />
            </Header>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                maxHeight: '100vh',
                overflow: 'scroll'
              }}
            >
              <Routes>
                <Route exact path="/" element={<TAccount />} />
                <Route exact path="/trial-balance" element={<TrialBalance />} />
                <Route
                  exact
                  path="/profit-and-loss-account"
                  element={<ProfitAndLoss />}
                />
                <Route exact path="/balance-sheet" element={<BalanceSheet />} />
                <Route exact path="/feedback" element={<Feedback />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default Dashboard;

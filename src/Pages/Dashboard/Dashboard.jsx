import React, { useState, useEffect } from "react";
import introJs from "intro.js";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout } from "antd";
import "intro.js/introjs.css";
import Navbar from "../../Components/NavBar/Navbar.jsx";
import Sidebar from "../../Components/SideBar/Sidebar";
import TrialBalance from "../TrialBalance/TrialBalance.jsx";
import ProfitAndLoss from "../ProfitAndLoss/ProfitAndLoss.jsx";
import BalanceSheet from "../BalanceSheet/BalanceSheet.jsx";
import TAccount from "../taccount-page";
import Feedback from "../Feedback";
import { menuItems } from "../../Components/SideBar/Sidebar";
import "./Dashboard.css";
import "antd/dist/antd.css";

const { Header, Content, Sider } = Layout;

const DashboardContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const intro = introJs();

    const ensureElementVisible = (elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    intro.setOptions({
      steps: [
        {
          title: "Welcome to Your Dashboard",
          intro: "Let's take a quick tour of your accounting dashboard!",
          position: "center",
        },
        ...menuItems.map((item) => ({
          element: `#sidebar-${item.id}`,
          title: item.introData.title,
          intro: item.introData.description,
          position: item.introData.position,
          scrollTo: "tooltip",
          scrollPadding: 20,
          beforeChange: () => {
            ensureElementVisible(`sidebar-${item.id}`);
            if (location.pathname !== item.href) {
              navigate(item.href);
            }
          },
        })),
        {
          element: document.querySelector(".add-taccount-btn"),
          title: "Add New TAccount",
          intro: "Click here to add a new TAccount to your dashboard.",
          position: "left",
        },
        {
          title: "Tour Complete!",
          intro: "You're now ready to start using your accounting dashboard.",
          position: "center",
          doneLabel: "Done", // Adding the "Done" label for the last step
        },
      ],
      tooltipClass: "custom-tooltip",
      highlightClass: "custom-highlight",
      exitOnOverlayClick: false,
      showStepNumbers: true,
      keyboardNavigation: true,
      showBullets: true,
      hidePrev: true,
      hideNext: true,
      showProgress: false, // No progress bar
    });

    // Add the "Done" button to the last step
    intro.onafterchange(() => {
      const tooltip = document.querySelector(".introjs-tooltipbuttons");
      if (tooltip) {
        // Remove any existing custom "Done" button to avoid duplicates
        const existingDoneButton = tooltip.querySelector(".introjs-done-btn");
        if (existingDoneButton) {
          existingDoneButton.remove();
        }

        // Create a new "Done" button for the last step
        const doneButton = document.createElement("button");
        doneButton.className = "introjs-done-btn introjs-button";
        doneButton.innerText = "Done";
        doneButton.onclick = () => intro.exit();

        // Insert the "Done" button only for the last step
        const backButton = tooltip.querySelector(".introjs-prevbutton");
        if (backButton) {
          backButton.insertAdjacentElement("afterend", doneButton);
        }
      }
    });

    // Start the tour automatically
    intro.start();

    // Cleanup on unmount
    return () => intro.exit();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <Layout>
      <Sider
        className={`site-layout-background ${
          collapsed ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
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
            maxHeight: "100vh",
            overflow: "auto",
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
  );
};

const Dashboard = () => {
  return (
    <BrowserRouter>
      <DashboardContent />
    </BrowserRouter>
  );
};

export default Dashboard;

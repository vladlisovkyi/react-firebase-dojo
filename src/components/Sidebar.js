import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Avatar from "./Avatar";

import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import { useState } from "react";

export default function Sidebar() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="sidebar w-14 lg:w-64">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} className={'lg:w-16 lg:h-16 w-5 h-5'}/>
          <p className="hidden lg:block">Hey {user.displayName}</p>
        </div>
        <nav className="links lg:ml-5">
          <ul>
            <li>
              <NavLink to="/" onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
                <img src={DashboardIcon} alt="dashboard icon" />
                <span className="hidden lg:inline-block">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create" onClick={() => setActiveTab('new')} className={activeTab === 'new' ? 'active' : ''}>
                <img src={AddIcon} alt="add project icon" />
                <span className="hidden lg:inline-block">New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <header className="header">
      <div className="logo"></div>
      <ul>
        <li>
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </header>
  );
}

export default AdminHeader;

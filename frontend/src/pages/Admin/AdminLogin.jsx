import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ADMIN_URL } from "../../features/auth/authService";
import { BASE_URL } from "../../api/apiUrls";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      navigate("/admin");
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    AdminLogin();
  };

  const AdminLogin = async () => {
    const data = {
      email,
      password,
    };
    const response = await axios.post(BASE_URL + ADMIN_URL + "login", data);
    if (response.data) {
      localStorage.setItem("admin", JSON.stringify(response.data));
      navigate("/admin");
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Admin Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AdminLogin;

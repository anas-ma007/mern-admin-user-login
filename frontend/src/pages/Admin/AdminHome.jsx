import React from "react";
import { useEffect, useState } from "react";
import AdminHeader from "../../Components/AdminHeader";
import axios from "axios";
import { ADMIN_URL } from "../../features/auth/authService";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/apiUrls";

function filterData(searchText, users) {
  const filteredData = users.filter((user) =>
    user.name.toLowerCase()?.includes(searchText)
  );
  return filteredData;
}

function AdminHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [searchText, setSearchquery] = useState("");
  const [filteredUser, setfilteredUser] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    } else {
      axios.get(BASE_URL + ADMIN_URL).then((response) => {
        setUsers(response.data.users);
        setfilteredUser(response.data.users);
        navigate("/admin");
      });
    }
  }, [navigate]);

  const userDelete = (id) => {
    axios.delete(BASE_URL + ADMIN_URL + "remove/" + id).then(() => {
      axios.get(BASE_URL + ADMIN_URL).then((response) => {
        console.log(response.data.users);
        setfilteredUser(response.data.users);
        navigate("/admin");
      });
    });
  };

  const userEdit = (id) => {
    const user = users.find((user) => user._id === id);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditingId(id);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  const handleSave = (id) => {
    const userData = {
      name: editedName,
      email: editedEmail,
    };
    axios.put(BASE_URL + ADMIN_URL + id, userData).then(() => {
      axios.get(BASE_URL + ADMIN_URL).then((response) => {
        setfilteredUser(response.data.users);
      });
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="adminSearch">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchquery(e.target.value)}
        />
        <button
          className="adminSearchButton"
          onClick={() => {
            const data = filterData(searchText, users);
            setfilteredUser(data);
          }}
        >
          Search
        </button>
      </div>
      <table className="adminTable">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUser?.map((user) => (
            <tr key={user._id}>
              <td>
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={handleEmailChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingId === user._id ? (
                  <>
                    <button onClick={() => handleSave(user._id)}>Save</button>
                    <button onClick={() => setEditingId("")}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => userEdit(user._id)}>Edit</button>
                    <button onClick={() => userDelete(user._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminHome;

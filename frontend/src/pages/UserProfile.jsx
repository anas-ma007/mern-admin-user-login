import { useSelector } from "react-redux";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/apiUrls";

function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(user);

  console.log(user);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    setProfilePic(user.profilePic);
  }, [profilePic]);

  const handleFileChange = (event) => {
    let image = event.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(
        "http://localhost:5000/api/users/imageUpload/" + userData._id,
        formData
      )
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("catchedd error");
      });
  };

  return (
    <>
      <Header />
      <section className="heading">
        <img
          src={userData.profilePic}
          alt="Profile-Pic"
          width="200"
          height="200"
        />
        <p>Profile Picture</p>
      </section>

      <section className="form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData && userData.name}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData && userData.email}
          />
        </div>
        <div className="form-group">
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
      </section>
    </>
  );
}

export default UserProfile;

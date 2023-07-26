import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
      </section>
    </>
  );
}

export default Dashboard;

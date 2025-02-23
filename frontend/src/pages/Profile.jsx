import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/user/profile`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => setMessage(data?.message || "Error"))
      .catch(() => setMessage("Serverga bog‘lanib bo‘lmadi!"));
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p>{message}</p>
    </div>
  );
}

export default Profile;

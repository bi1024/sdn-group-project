import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Gọi API lấy thông tin user
    axios
      .get(`/api/users/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Lỗi khi lấy thông tin user:", error));
  }, [userId]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">User Profile</h2>
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <img
            src={user.avatarUrl || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h4>{user.fullname || "No Name Provided"}</h4>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Birthday: {user.birthday ? new Date(user.birthday).toLocaleDateString() : "Not provided"}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

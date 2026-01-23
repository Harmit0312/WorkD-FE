import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function FreelancerDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "60px" }}>
      <h1>Freelancer Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

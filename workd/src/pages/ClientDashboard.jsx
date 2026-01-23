import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ClientDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "60px" }}>
      <h1>Client Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

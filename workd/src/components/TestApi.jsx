import React from "react";
import api from "../services/api";

export default function TestApi() {
  const handleClick = async () => {
    console.log("Button clicked");

    try {
      const res = await api.post("/auth/register.php", {
        name: "Test",
        email: "test@test.com",
        password: "123456",
        role: "client"
      });

      console.log("Response:", res.data);
      alert(JSON.stringify(res.data));
    } catch (err) {
      console.log("Error:", err);
      alert(err.response?.data?.error || "Failed");
    }
  };

  return (
    <div>
      <h2>Test API Component</h2>
      <button onClick={handleClick}>Send Test Request</button>
    </div>
  );
}

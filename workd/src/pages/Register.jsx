export default function Register() {
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h2>Register</h2>
      <input placeholder="Name" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <input placeholder="Password" type="password" /><br /><br />
      <select>
        <option>Client</option>
        <option>Freelancer</option>
      </select><br /><br />
      <button>Register</button>
    </div>
  );
}

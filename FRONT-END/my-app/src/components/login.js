import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    
    console.log("Response data:", data.role);
    console.log("Selected role:", role);
  
    if (response.ok) {
      setMessage(data.message);
  
      // Check the user's role
      if (data.role === "Admin" && role === "Admin") {
        // Redirect to the sign-up page for admin
        navigate("/adminpage");
      } else if (data.role === "Normal user" && role === "Normal user") {
        // Redirect to the services page for normal user
        navigate("/userpage");
      } else {
        // Alert the user about an invalid role selection
        alert("Invalid role selection.");
      }
    } else {
      setMessage(data.message);
    }
  };
  
  

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await fetch("/roles");
      const data = await response.json();
      setRoles(data.roles);
    };
    fetchRoles();
  }, []);

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>User Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((roleOption) => (
              <option key={roleOption.name} value={roleOption.name}>
                {roleOption.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

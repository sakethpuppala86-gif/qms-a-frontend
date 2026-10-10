import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        alert("Invalid username or password.");
        return;
      }

      const user = await response.json();

      if (user.role !== "CUSTOMER") {
        alert("Access denied. Customer account required.");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/");

    } catch (error) {

      console.error("Login error:", error);

      alert(
        "Unable to connect to QueueLess server."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>QueueLess</h1>

        <h2>Customer Login</h2>

        <p>
          Login to access the customer portal
        </p>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter customer username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter customer password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Customer Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default CustomerLogin;